import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import AppTheme from './theme/AppTheme';
import UserAppBar from './components/UserAppBar'; // Import UserAppBar
import AnalysisLeftPanel from './components/AnalysisLeftPanel';
import CenterPanel from './components/AnalysisCenterPanel';

const AnalysisPage = (props) => {
  // Mock data for resume analysis
  const [resumeData, setResumeData] = React.useState({
    matchRate: 'Good',
    matchPercentage: 75,
    issues: {
      searchability: 2,
      hardSkills: 3,
      softSkills: 4,
      recruiterTips: 2,
      formatting: 5,
      keywords: 1,
    },
  });

  // Mock analysis data
  const analysisData = [
    { label: 'Match Rate', value: `${resumeData.matchRate} (${resumeData.matchPercentage}%)` },
    { label: 'Searchability Issues', value: `${resumeData.issues.searchability}` },
    { label: 'Hard Skills Issues', value: `${resumeData.issues.hardSkills}` },
    { label: 'Soft Skills Issues', value: `${resumeData.issues.softSkills}` },
    { label: 'Recruiter Tips Issues', value: `${resumeData.issues.recruiterTips}` },
    { label: 'Formatting Issues', value: `${resumeData.issues.formatting}` },
    { label: 'Keywords Issues', value: `${resumeData.issues.keywords}` },
  ];

  // Mock course recommendations
  const courses = [
    { title: 'Python for Data Science', link: 'https://example.com/python' },
    { title: 'SQL Mastery', link: 'https://example.com/sql' },
    { title: 'PowerBI Masterclass', link: 'https://example.com/soft-skills' },
    { title: 'Soft Skills Training', link: 'https://example.com/soft-skills' }
  ];

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      {/* Using the custom UserAppBar instead of ColorModeSelect */}
      <UserAppBar />  {/* Custom AppBar with User Info and Theme Toggle */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          bgcolor: 'background.default',
          mt: '64px', // Space for the app bar (adjust as needed)
          overflow: 'hidden', // Prevent internal scrolling
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: '20%', // Fixed width for the left panel
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AnalysisLeftPanel resumeData={resumeData} />
        </Box>

        {/* Center Panel */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 64px)', // Full height minus app bar
          }}
        >
          <CenterPanel
            analysisData={analysisData}
            courses={courses}
            gridConfig={{
              rows: 3, // Keep the first row as 1 column, rest as 2 columns
              columns: 2,
              firstRowColumns: 1, // Use 1 column for the first row
            }} 
          />
        </Box>
      </Box>
    </AppTheme>
  );
};

export default AnalysisPage;
