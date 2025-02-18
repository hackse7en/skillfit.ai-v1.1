import React, { useState } from 'react';
import { analyzeResume } from '../services/api';
import { 
    Button, 
    TextField, 
    Box, 
    Typography, 
    CircularProgress,
    Paper
} from '@mui/material';
import AnalysisLeftPanel from './AnalysisLeftPanel';
import AnalysisCenterPanel from './AnalysisCenterPanel';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please upload a PDF file');
            setFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !jobDescription) {
            setError('Please provide both a resume and job description');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await analyzeResume(file, jobDescription);
            setAnalysis(result.analysis);
        } catch (err) {
            setError('Error analyzing resume. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Resume Analyzer
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                    >
                        Upload Resume (PDF)
                        <input
                            type="file"
                            hidden
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {file && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Selected file: {file.name}
                        </Typography>
                    )}
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    sx={{ mb: 3 }}
                />

                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
                </Button>
            </form>

            {analysis && (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 3, mt: 3 }}>
                    <AnalysisLeftPanel analysisData={analysis} />
                    <AnalysisCenterPanel analysisData={analysis} />
                </Box>
            )}
        </Box>
    );
};

export default ResumeAnalyzer; 