import React, { useState, useEffect } from 'react';
import Header from "components/Header";
import { Box, TextField, Button, CircularProgress, Grid } from "@mui/material";
import AreaCard from "components/Areacard";

const NearByComp = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompetitors();
  }, []);

  const fetchCompetitors = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/comments/shownearcomp"); // Ensure this URL is correct
      const data = await response.json();
      if (data.success) {
        setCompetitors(data.competitors);
      } else {
        console.error("API returned an error.");
      }
    } catch (error) {
      console.error("Error fetching competitors:", error);
    }
    setLoading(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Nearby Competitor" />
      <Box mt={2} p={3} border="1px solid #ccc" borderRadius="8px" textAlign="center">
        <Box display="flex" gap={2} justifyContent="center">
          <TextField
            label="Enter Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Enter Category"
            variant="outlined"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Box>

        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={fetchCompetitors}>
          Show All Location
        </Button>
      </Box>

      <Header subtitle="Competitor Insights in Your Area" sx={{ mt: 2 }} />

      {loading ? (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} mt={2}>
          {competitors.map((comp, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AreaCard name={comp.name} address={comp.address} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default NearByComp;
