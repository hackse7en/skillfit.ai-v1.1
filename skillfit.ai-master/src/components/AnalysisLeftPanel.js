import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const AnalysisLeftPanel = ({ analysisData }) => {
  // Parse the analysis data if it's a string
  const parsedData = typeof analysisData === 'string' ? JSON.parse(analysisData) : analysisData;

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Match Analysis
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          JD Match
        </Typography>
        <Typography variant="h4" color="primary">
          {parsedData?.["JD Match"] || "N/A"}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Missing Keywords
        </Typography>
        <List dense>
          {parsedData?.MissingKeywords?.map((keyword, index) => (
            <ListItem key={index}>
              <ListItemText primary={keyword} />
            </ListItem>
          )) || <ListItem><ListItemText primary="No missing keywords" /></ListItem>}
        </List>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Formatting Issues
        </Typography>
        <List dense>
          {parsedData?.["formating issues"]?.map((issue, index) => (
            <ListItem key={index}>
              <ListItemText primary={issue} />
            </ListItem>
          )) || <ListItem><ListItemText primary="No formatting issues found" /></ListItem>}
        </List>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Recruiter Tips
        </Typography>
        <List dense>
          {parsedData?.["recruiter tips"]?.map((tip, index) => (
            <ListItem key={index}>
              <ListItemText primary={tip} />
            </ListItem>
          )) || <ListItem><ListItemText primary="No recruiter tips available" /></ListItem>}
        </List>
      </Box>
    </Box>
  );
};

export default AnalysisLeftPanel;
