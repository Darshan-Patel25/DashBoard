import React, { useState } from 'react';
import { Box, Typography, Checkbox, Button, Grid, FormControlLabel, Divider, TextField } from '@mui/material';

const initialPages = [
  
];

const ConnectPage = () => {
  const [pages, setPages] = useState(initialPages);
  const [selectedPages, setSelectedPages] = useState([]);
  const [newPage, setNewPage] = useState('');

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

  const handleAddPage = () => {
    if (newPage.trim() !== '' && !pages.includes(newPage)) {
      setPages([...pages, newPage]);
      setNewPage('');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Connect Facebook Page</Typography>
      
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
        <Button variant="contained" color="primary" onClick={handleAddPage} sx={{ height: '53px', fontSize:"15px" }}>Add </Button>
      </Box>
      
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

      {/* <Box mt={4}>
        <Typography variant="h6">Account Groups</Typography>
        <Box p={2} border={1} borderColor="grey.300" borderRadius={2} textAlign="center">
          <Typography color="text.secondary">Track All Activities</Typography>
        </Box>
      </Box> */}

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" color="secondary">Cancel</Button>
        <Button variant="contained" color="primary">Track All Activities</Button>
      </Box>
    </Box>
  );
};

export default ConnectPage;
