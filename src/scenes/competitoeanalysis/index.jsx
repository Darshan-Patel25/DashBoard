import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import BarLabel from '../../components/ThreeBarchart';
import {
  Box,
  Typography,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Header from 'components/Header';

const ConnectPage = () => {
  const [newPage, setNewPage] = useState('');
  const [competitors, setCompetitors] = useState([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState('');
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    fetchCompetitors();
  }, []);

  // Fetch competitors from the server
  const fetchCompetitors = async () => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      alert('Authentication required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/comments/getcompanies', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setCompetitors(result.competitorAnalysis || []);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error fetching competitors:', error);
      alert('Failed to fetch competitors.');
    }
  };

  // Handle adding a new competitor
  const handleAddPage = async () => {
    if (!newPage.trim()) {
      alert('Please enter a valid page.');
      return;
    }

    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      alert('Authentication required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/comments/competitor-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ competitorAnalysis: newPage }),
      });

      if (response.ok) {
        alert(`New competitor "${newPage}" added successfully!`);
        setNewPage('');
        fetchCompetitors(); // Refresh competitors list
      } else {
        const result = await response.json();
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding new page:', error);
      alert('Failed to add new page.');
    }
  };

  // Handle fetching competitor statistics
  const handleSubmitCompetitors = async () => {
    if (!selectedCompetitor) {
      alert('Please select a competitor.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/comments/stas?username=${selectedCompetitor}`);
      const result = await response.json();

      if (response.ok) {
        const data = result.Graph.map((item) => ({
          date: item.date,
          followers: parseInt(item.followers) || 0,
          followings: parseInt(item.followings) || 0,
          tweets: parseInt(item.tweets) || 0,
        }));
        setGraphData(data);
      } else {
        alert(`Error: ${result.error || 'Failed to fetch stats.'}`);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Failed to fetch stats.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        <Header title={'Competitor Analytics'} />
      </Typography>

      {/* New Page Input and Add Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Add New Page"
          value={newPage}
          style={{width:"70rem"}}
          onChange={(e) => setNewPage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ height: '53px', fontSize: '15px' }}
          onClick={handleAddPage}
        >
          Add
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Select Competitor Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Competitor</InputLabel>
        <Select
          value={selectedCompetitor}
          onChange={(e) => setSelectedCompetitor(e.target.value)}
          label="Select Competitor"
        >
          {competitors.map((comp, index) => (
            <MenuItem key={index} value={comp}>
              {comp}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit Competitor Button */}
      <Button variant="contained" color="primary" onClick={handleSubmitCompetitors}>
        Submit Selected Competitor
      </Button>

      {/* Graph Section */}
      <Typography variant="h5" mt={4} mb={2}>
        Engagement Trends
      </Typography>

      {graphData.length > 0 ? (
        <BarLabel graphData={graphData} />
      ) : (
        <Typography>No data available for engagement trends.</Typography>
      )}
    </Box>
  );
};

export default ConnectPage;
