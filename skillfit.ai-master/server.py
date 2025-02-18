from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import PyPDF2 as pdf
from dotenv import load_dotenv
import json
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

load_dotenv()  # load environment variables
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(input):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(input)
    return response.text

def input_pdf_text(pdf_file):
    try:
        logger.info(f"Processing PDF file: {pdf_file.filename}")
        reader = pdf.PdfReader(pdf_file)
        text = ""
        for page in range(len(reader.pages)):
            page = reader.pages[page]
            text += str(page.extract_text())
        logger.info(f"Successfully extracted {len(text)} characters from PDF")
        return text
    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}")
        raise

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    try:
        # Log incoming request
        logger.info("Received analysis request")
        
        if 'file' not in request.files:
            logger.error("No file in request")
            return jsonify({'error': 'No file uploaded'}), 400
        
        if 'jobDescription' not in request.form:
            logger.error("No job description in request")
            return jsonify({'error': 'No job description provided'}), 400
        
        file = request.files['file']
        job_description = request.form['jobDescription']
        
        if file.filename == '':
            logger.error("Empty filename")
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.lower().endswith('.pdf'):
            logger.error("Invalid file type")
            return jsonify({'error': 'Please upload a PDF file'}), 400

        # Extract text from PDF
        try:
            resume_text = input_pdf_text(file)
            if not resume_text.strip():
                logger.error("Empty text extracted from PDF")
                return jsonify({'error': 'Could not extract text from PDF'}), 400
            
            logger.info("Successfully extracted text from PDF")
        except Exception as e:
            logger.error(f"PDF processing error: {str(e)}")
            return jsonify({'error': 'Error processing PDF file'}), 400

        # Construct prompt
        input_prompt = f"""
        Act as an experienced ATS (Applicant Tracking System) with expertise in tech fields including software engineering, data science, data analysis, and big data engineering. 
        Analyze the provided resume against the job description and provide a detailed evaluation.

        Resume: {resume_text}
        Job Description: {job_description}

        Provide your analysis in the following JSON format exactly:
        {{
            "JD Match": "percentage as string with % symbol",
            "MissingKeywords": ["list of missing important keywords"],
            "Profile Summary": "brief professional summary",
            "STRENGTHS": ["list of candidate's key strengths"],
            "RECOMMENDATIONS": "detailed suggestions for improvement",
            "formating issues": ["list of formatting problems"],
            "soft skills": ["list of soft skills identified"],
            "hard skills": ["list of technical skills identified"],
            "keywords": ["list of important keywords found"],
            "recruiter tips": ["list of specific tips for improving chances"]
        }}
        """
        
        # Get response from Gemini
        try:
            response = get_gemini_response(input_prompt)
            logger.info("Received response from Gemini")
        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}")
            return jsonify({'error': 'Error getting AI analysis'}), 500

        # Parse response
        try:
            json_response = json.loads(response)
            logger.info("Successfully parsed JSON response")
            return jsonify({'analysis': json_response})
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {str(e)}")
            return jsonify({'analysis': response})

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)