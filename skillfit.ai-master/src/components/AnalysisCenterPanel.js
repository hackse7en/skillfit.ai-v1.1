import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const AnalysisCenterPanel = ({ analysisData }) => {
  // Parse the analysis data if it's a string
  const parsedData = typeof analysisData === 'string' ? JSON.parse(analysisData) : analysisData;

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          Profile Summary
        </Typography>
        <Typography variant="body1">
          {parsedData?.["Profile Summary"] || "No profile summary available"}
        </Typography>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Strengths
        </Typography>
        <List dense>
          {parsedData?.STRENGTHS?.map((strength, index) => (
            <ListItem key={index}>
              <ListItemText primary={strength} />
            </ListItem>
          )) || <ListItem><ListItemText primary="No strengths listed" /></ListItem>}
        </List>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Skills Analysis
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          Hard Skills
        </Typography>
        <List dense>
          {parsedData?.["hard skills"]?.map((skill, index) => (
            <ListItem key={index}>
              <ListItemText primary={skill} />
            </ListItem>
          )) || <ListItem><ListItemText primary="No hard skills listed" /></ListItem>}
        </List>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Soft Skills
        </Typography>
        <List dense>
          {parsedData?.["soft skills"]?.map((skill, index) => (
            <ListItem key={index}>
              <ListItemText primary={skill} />
            </ListItem>
          )) || <ListItem><ListItemText primary="No soft skills listed" /></ListItem>}
        </List>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Recommendations
        </Typography>
        <Typography variant="body1">
          {parsedData?.RECOMMENDATIONS || "No recommendations available"}
        </Typography>
      </Box>
    </Box>
  );
};

export default AnalysisCenterPanel;
