from backend.app import db

class Document(db.Model):
    id = db.Column(db.String, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    summary = db.Column(db.Text, nullable=True)
    risks = db.Column(db.Text, nullable=True)
