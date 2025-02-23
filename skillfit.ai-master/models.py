from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    resumes = db.relationship('Resume', backref='user', lazy=True)

class Resume(db.Model):
    __tablename__ = 'resumes'
    resume_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    upload_date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    file_type = db.Column(db.String(50))
    file_size = db.Column(db.Integer)
    analyses = db.relationship('ResumeAnalysis', backref='resume', lazy=True)

class JobDescription(db.Model):
    __tablename__ = 'job_descriptions'
    job_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    analyses = db.relationship('ResumeAnalysis', backref='job', lazy=True)

class ResumeAnalysis(db.Model):
    __tablename__ = 'resume_analyses'
    analysis_id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resumes.resume_id'))
    job_id = db.Column(db.Integer, db.ForeignKey('job_descriptions.job_id'))
    analysis_date = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    match_score = db.Column(db.Numeric(5,2))
    analysis_results = db.Column(db.JSON) 