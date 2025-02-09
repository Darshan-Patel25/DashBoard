import React, { useState } from 'react';
import { Box, Typography, Checkbox, Button, Grid, FormControlLabel, Divider } from '@mui/material';

const pages = [
  'Ahmedabad Digital Club', 'Android Blog', 'Audience Visible', 'Click it Connect',
  'Digital Deeksha', 'Homes for Sale Atlanta GA', 'India143', 'Matzen Solutions',
  'Mauli Bhel Panipuri Center', 'Mrunal Recipes', 'Orcas Digital', 'Pointcrunch.com',
  'Puneties', 'Punjabi Dress Online Shop', 'Rooftop Investment', 'Vikas Disale',
  'Vikas Tech'
];

const ConnectPage = () => {
  const [selectedPages, setSelectedPages] = useState([]);

  const handleToggle = (page) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  const handleSelectAll = () => {
    if (selectedPages.length === pages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(pages);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Connect Facebook Page</Typography>

      <Box className="statBox" p={2} border={1} borderColor="grey.300" borderRadius={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Page List</Typography>
          <FormControlLabel
            control={<Checkbox checked={selectedPages.length === pages.length} onChange={handleSelectAll} />}
            label="Select All"
          />
        </Box>

        <Grid container spacing={2}>
          {pages.map((page) => (
            <Grid item xs={12} sm={6} md={4} key={page}>
              <Box className="st" p={1} border={1} borderColor="grey.300" borderRadius={1} display="flex" alignItems="center">
                <Checkbox
                  checked={selectedPages.includes(page)}
                  onChange={() => handleToggle(page)}
                />
                <Typography>{page}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Account Groups</Typography>
        <Box p={2} border={1} borderColor="grey.300" borderRadius={2} textAlign="center">
          <Typography color="text.secondary">You don’t have any groups yet.</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" color="secondary">Cancel</Button>
        <Button variant="contained" color="primary"  onClick={<setupschedule/>}>Save and Setup Schedules</Button>
      </Box>
    </Box>
  );
};

export default ConnectPage;
