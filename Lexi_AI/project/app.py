from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import uuid

# ---------------------------
# Flask App Init
# ---------------------------
app = Flask(__name__)
CORS(app)

# Database config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../db.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Upload folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------------------
# Google Cloud Clients
# ---------------------------
DOCUMENT_AI_KEY_PATH = os.path.join(os.path.dirname(__file__), "keys/document_ai_key.json")
VERTEX_AI_KEY_PATH = os.path.join(os.path.dirname(__file__), "keys/vertex_ai_key.json")

from google.cloud import documentai_v1 as documentai
from vertexai import aiplatform
from vertexai.language_models import TextGenerationModel

# Document AI client
document_ai_client = documentai.DocumentProcessorServiceClient.from_service_account_file(DOCUMENT_AI_KEY_PATH)

# Vertex AI init
aiplatform.init(
    project="extreme-tide-472719-r1",  # Replace with your project ID
    location="us-central1",
    credentials=VERTEX_AI_KEY_PATH
)

# ---------------------------
# Constants for Document AI
# ---------------------------
PROJECT_ID = "extreme-tide-472719-r1"  # Replace with your project ID
LOCATION = "us-central1"
PROCESSOR_ID = "b4d27fbc4c3d76f5"  # Replace with your Document AI processor ID

# ---------------------------
# Database Model
# ---------------------------
class Document(db.Model):
    id = db.Column(db.String, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    summary = db.Column(db.Text, nullable=True)
    risks = db.Column(db.Text, nullable=True)

db.create_all()

# ---------------------------
# Helper Functions
# ---------------------------
def process_document_with_ai(filepath):
    """Process PDF/DOCX using Document AI"""
    with open(filepath, "rb") as f:
        doc_content = f.read()

    name = f"projects/{PROJECT_ID}/locations/{LOCATION}/processors/{PROCESSOR_ID}"
    document = {"content": doc_content, "mime_type": "application/pdf"}  # change to docx if needed
    request = {"name": name, "raw_document": document}

    result = document_ai_client.process_document(request=request)
    text = result.document.text  # full extracted text

    # Simple summary & risk extraction (can enhance later)
    summary = text[:500] + "..."  # first 500 chars as summary
    risks = "Potential risks detected from the document."

    return summary, risks

def vertex_ai_text_summary(text):
    """Use Vertex AI to summarize pasted text"""
    model = TextGenerationModel.from_pretrained("text-bison@001")
    response = model.predict(f"Summarize this text in short: {text}", max_output_tokens=200)
    return response.text

def vertex_ai_chat_answer(text, question):
    """Vertex AI Q&A placeholder"""
    model = TextGenerationModel.from_pretrained("text-bison@001")
    prompt = f"Document Text:\n{text}\n\nQuestion: {question}\nAnswer:"
    response = model.predict(prompt, max_output_tokens=200)
    return response.text

# ---------------------------
# Routes
# ---------------------------

# 1. Upload Document
@app.route("/upload", methods=["POST"])
def upload_document():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    file_id = str(uuid.uuid4())
    filename = f"{file_id}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    doc = Document(id=file_id, filename=filename)
    db.session.add(doc)
    db.session.commit()

    return jsonify({"message": "File uploaded successfully", "fileId": file_id, "filename": filename})

# 2. Analyze Document
@app.route("/analyze", methods=["POST"])
def analyze_document():
    data = request.get_json()
    file_id = data.get("fileId")

    doc = Document.query.get(file_id)
    if not doc:
        return jsonify({"error": "File not found"}), 404

    filepath = os.path.join(UPLOAD_FOLDER, doc.filename)

    try:
        summary, risks = process_document_with_ai(filepath)
    except Exception as e:
        return jsonify({"error": f"Document AI processing failed: {str(e)}"}), 500

    doc.summary = summary
    doc.risks = risks
    db.session.commit()

    return jsonify({"summary": summary, "risks": risks})

# 3. Paste Text
@app.route("/paste-text", methods=["POST"])
def paste_text():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        summary = vertex_ai_text_summary(text)
        risks = "Potential risks extracted via AI"
    except Exception as e:
        return jsonify({"error": f"Vertex AI summarization failed: {str(e)}"}), 500

    return jsonify({"summary": summary, "risks": risks})

# 4. Chatbot
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question", "").lower()
    file_id = data.get("fileId")

    if not question:
        return jsonify({"answerText": "Please ask a question.", "confidence": "Low"}), 400

    if not file_id:
        return jsonify({"answerText": "Please provide a file ID.", "confidence": "Low"}), 400

    doc = Document.query.get(file_id)
    if not doc or not doc.summary:
        return jsonify({"answerText": "Please analyze a document first.", "confidence": "Low"}), 400

    try:
        answer = vertex_ai_chat_answer(doc.summary, question)
        confidence = "High"
    except Exception:
        answer = "I don’t know the exact answer."
        confidence = "Low"

    return jsonify({"answerText": answer, "confidence": confidence})

# 5. List Documents
@app.route("/documents", methods=["GET"])
def list_documents():
    docs = Document.query.all()
    return jsonify({
        "documents": [
            {"id": d.id, "filename": d.filename, "summary": d.summary, "risks": d.risks}
            for d in docs
        ]
    })

# ---------------------------
# Run Flask
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
