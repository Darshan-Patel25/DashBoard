import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import Header from 'components/Header';

const ConnectPage = () => {
  const [competitors, setCompetitors] = useState([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState([]);
  const [newPage, setNewPage] = useState('');

  useEffect(() => {
    fetchCompetitors();
  }, []);

  // Fetch competitor companies from the backend
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

  // Handle posting a competitor directly to the DB
  const handleAddCompetitor = async () => {
    if (!newPage.trim()) {
      alert('Please enter a valid competitor name.');
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
        body: JSON.stringify({ competitorAnalysis: newPage.trim() }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Competitor added successfully!');
        setCompetitors((prev) => [...prev, newPage.trim()]);
        setNewPage(''); // Clear input field after successful addition
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding competitor:', error);
      alert('Failed to add competitor.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Competitor Analytics
      </Typography>

      {/* Add New Competitor Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Add New Page"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ mr: 2 }}
          value={newPage}
          onChange={(e) => setNewPage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCompetitor}
          sx={{ height: '53px', fontSize: '15px' }}
        >
          Add
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Header
        title="Track All Activities of your Competitors"
        subtitle="Select the option and see all the activities"
      />

      {/* Dynamic Competitor Selection Dropdown */}
      <Box mt={3}>
        <FormControl fullWidth>
          <InputLabel id="competitor-select-label">Choose your Competitors</InputLabel>
          <Select
            labelId="competitor-select-label"
            label="Choose your Competitors"
            multiple
            value={selectedCompetitors}
            onChange={(e) => setSelectedCompetitors(e.target.value)}
          >
            {competitors.map((competitor, index) => (
              <MenuItem key={index} value={competitor}>
                {competitor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Action Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Submit Selected Competitors
        </Button>
      </Box>
    </Box>
  );
};

export default ConnectPage;
