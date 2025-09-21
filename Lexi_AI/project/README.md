# LexiAI – Generative AI for Legal Document Simplification

**AI-powered web application that simplifies complex legal documents, highlights potential risks, and provides interactive Q&A to help users make informed decisions.**

---

## 🚀 Overview
Legal documents like rental agreements, loan contracts, and terms of service are often filled with complex legal jargon. LexiAI bridges the gap between legal complexity and human understanding by providing:

- **Document Summaries**: Converts complex legal clauses into clear, plain English summaries.
- **Risk Assessment**: Highlights potential risks and provides confidence levels.
- **Interactive Chat**: Ask questions about loaded documents and get context-aware AI responses.
- **Document History**: View previously uploaded or analyzed documents.
- **Report Generation**: Download comprehensive analysis reports.

This full-stack application combines a **React + TypeScript frontend** with a **Flask backend**, integrating **Google Document AI** for text extraction and **Vertex AI** for summarization & Q&A.

---

## 🎯 Features

### Frontend
- **Document Analysis**: Upload and analyze legal documents (PDF, DOCX, TXT).
- **Smart Summarization**: Plain English summaries in bullet points.
- **Risk Highlighting**: Key clauses flagged with potential risks.
- **Interactive Chatbot**: Ask questions regarding your document.
- **Comparison View**: Side-by-side original vs simplified text.
- **Downloadable Reports**: Export summaries and risk assessments.
- **Responsive & Modern UI**: Tailwind CSS with glassmorphism and smooth animations.

### Backend
- **Flask REST API**:
  - `/upload` → Upload documents
  - `/analyze` → Extract, summarize, and detect risks
  - `/paste-text` → Summarize pasted text
  - `/chat` → Ask questions about the document
  - `/documents` → List uploaded documents
- **Database**: SQLite for storing document metadata, summaries, and risks.
- **AI Integration**:
  - **Document AI** → Extract text from uploaded legal documents.
  - **Vertex AI** → Summarization & Q&A using LLM.
- **Security**: Backend keys (Document AI & Vertex AI) stored securely; frontend never exposes API keys.

---

## 🛠️ Technology Stack

| Layer       | Tech                                  |
|------------|---------------------------------------|
| Frontend    | React 18 + TypeScript, Tailwind CSS, Framer Motion, Lucide Icons |
| Backend     | Python 3.10, Flask, Flask-CORS, Flask-SQLAlchemy |
| Database    | SQLite (MVP), can migrate to MySQL/PostgreSQL |
| AI Services | Google Cloud Document AI, Vertex AI (LLM) |
| Deployment  | Frontend → Vercel, Backend → Google Cloud Run |

---

## 📁 Project Structure

lexiai/
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── data/ # Hardcoded/legal test documents
│ │ ├── utils/ # Simulated AI or API integration helpers
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── styles.css
│ └── package.json
├── backend/
│ ├── app.py # Flask app
│ ├── keys/ # Document AI & Vertex AI JSON keys
│ ├── uploads/ # Uploaded files
│ ├── requirements.txt
│ └── Dockerfile # For deployment on Cloud Run
├── README.md
└── .gitignore


---

## 🏃‍♂️ Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev      # Local development
npm run build    # Production build
npm run preview  # Preview production
cd backend
pip install -r requirements.txt
python app.py    # Local testing
Cloud Deployment

Frontend → Vercel

Backend → Google Cloud Run with Docker

Update frontend API URLs to point to deployed backend

🤖 AI Functionality
Document Processing

Upload: PDF/DOCX/TXT

Extract: Document AI

Summarize & Risks: Vertex AI LLM

Chatbot

Ask questions about clauses

Context-aware AI responses based on loaded document

Confidence level attached to each answer

🎨 Design Features

Glassmorphism cards & gradient backgrounds

Smooth hover and transition animations (Framer Motion)

Mobile-first, responsive design

Keyboard navigation & accessibility support

🔒 Security & Limitations

API keys never exposed to frontend

Only authenticated backend accesses Google Cloud AI

Local SQLite database (can be upgraded to production DB)

Currently supports English legal documents only

🔮 Future Enhancements

Multi-language support

Fine-tuned legal LLM integration

Full OCR support for scanned PDFs

User authentication & document management

Persistent database storage for history & reports

📞 Support

For any questions about code or deployment, check inline documentation in frontend/src and backend/.

This project is for educational/demo purposes; not legal advice.

Made with ❤️ by TechNauts using React, TypeScript, Flask, and Google Cloud AI Services
