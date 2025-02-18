import * as React from 'react';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  CssBaseline,
  TextField,
  CircularProgress,
  Chip,
} from '@mui/material';
import { CloudUpload, Work, Assessment } from '@mui/icons-material';
import AppTheme from './theme/AppTheme';
import UserHero from './components/Userhero';
import UserAppBar from './components/UserAppBar';

const ResumeUploader = (props) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [jobDescription, setJobDescription] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const steps = [
    { label: 'Upload Resume', icon: <CloudUpload /> },
    { label: 'Add Job', icon: <Work /> },
    { label: 'View Results', icon: <Assessment /> },
  ];

  const predefinedJobs = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer',
    'Business Analyst',
    'Marketing Specialist',
    'Machine Learning Engineer',
    'Web Developer',
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log('File uploaded:', file.name);
      setCurrentStep(1); // Automatically move to Add Job step
    }
  };

  const handleJobSelection = (job) => {
    setJobDescription(job);
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Simulate a loading process and redirect
      setIsAnalyzing(false);
      window.location.href = '/analysis'; // Replace with your actual results page URL
    }, 3000); // Simulate 3 seconds for loading
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <UserAppBar/> {/* Add the app bar */}
      <UserHero/>
      <Box
        id="resume-section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
          p: 2,
          pt: 8, // Add padding to avoid overlap with app bar
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 4,
            textAlign: 'center',
            mt: 10,
          }}
        >
          Scan the Resume
        </Typography>
        {/* Stepper */}
        <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: 4, width: '100%' }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() =>
                  React.cloneElement(step.icon, { fontSize: 'large', color: 'primary' })
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        {currentStep === 0 && (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              border: '1px dashed',
              borderColor: 'primary.light',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Your Resume
            </Typography>
            <Typography variant="body2" gutterBottom>
              Upload your resume to get started
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              component="label"
              sx={{ my: 2 }}
            >
              Upload Your Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
            {uploadedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Uploaded File: {uploadedFile.name}
              </Typography>
            )}
            <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
              as .pdf or .docx file
            </Typography>
          </Paper>
        )}

        {currentStep === 1 && (
          <Box
            sx={{
              p: 4,
              maxWidth: '800px',
              width: '100%',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'primary.main',
              display: 'flex',
              gap: 6,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Add Job Description
              </Typography>
              <TextField
                multiline
                rows={6}
                variant="filled"
                fullWidth
                placeholder="Type the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                sx={{ mt: 5, mb: 5 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setCurrentStep(2)} // Move to View Results step
              >
                Proceed
              </Button>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Select a Predefined Job
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                {predefinedJobs.map((job, index) => (
                  <Chip
                    key={index}
                    label={job}
                    onClick={() => handleJobSelection(job)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': { bgcolor: 'primary.main' },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {currentStep === 2 && (
          <Box
            sx={{
              p: 4,
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'primary.main',
            }}
          >
            {isAnalyzing ? (
              <>
                <CircularProgress size={50} sx={{ mb: 2 }} />
                <Typography variant="h6">Analyzing your resume...</Typography>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAnalysis}
              >
                Start Analysis
              </Button>
            )}
          </Box>
        )}
      </Box>
    </AppTheme>
  );
};

export default ResumeUploader;
