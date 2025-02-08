import { useState, useCallback } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { HiPlus, HiMinus } from 'react-icons/hi';

const Dynamic = () => {
  const [percentage, setPercentage] = useState(70);

  const onIncrease = useCallback(() => {
    setPercentage((prev) => Math.min(prev + 10, 100));
  }, []);

  const onDecrease = useCallback(() => {
    setPercentage((prev) => Math.max(prev - 10, 0));
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 0 }}>
     

      <Box sx={{ mt: 0 }}>
        <Typography variant="h5">Current Percentage: {percentage}%</Typography>

        {/* Visual bar representation */}
        <Box
          sx={{
            height: 20,
            width: '100%',
            maxWidth: 300,
            backgroundColor: '#e0e0e0',
            borderRadius: 8,
            overflow: 'hidden',
        
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: "70%",
              backgroundColor: percentage > 50 ? 'green' : 'orange',
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dynamic;