import React, { useState } from "react";
import { Box, Button,  useTheme ,useMediaQuery} from "@mui/material";
import St from "components/St";
import StatBox from "components/StatBox";
import { Facebook, Twitter, FileCopy, Image, Mood, LocationOn, } from "@mui/icons-material";
import Header from "../../components/Header"
export default function Schedule() {
  const [post, setPost] = useState("");
  const theme = useTheme();
 const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    
    <Box m="1rem 2rem">
      <Header title="Create post"  />
      

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
         
         <StatBox
          title="Create post"
          
        />
         

        

        {/* Tabs */}
        <Box display="flex" borderBottom={1} borderColor="divider">
          <Button variant="text">Original</Button>
          <Button variant="text" startIcon={<Facebook sx={{ color: "#1877F2" }} />}>Facebook</Button>
          <Button variant="text" startIcon={<Twitter sx={{ color: "#1DA1F2" }} />}>Twitter</Button>
        </Box>

        {/* Textarea */}
        <Box mt={2}>
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="11"
            placeholder="What do you want to share?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </Box>

        {/* Icons */}
        <Box display="flex" justifyContent="center" gap={2} mt={2} color="gray" >
  <St icon={<FileCopy sx={{ fontSize: 20 }} />} title="File" />
  <St icon={<Image sx={{ fontSize: 20 }} />} title="Image" />
  <St icon={<Mood sx={{ fontSize: 20 }} />} title="Emoji" />
  <St icon={<LocationOn sx={{ fontSize: 20 }} />} title="Location" />

  
</Box>


<Box display="flex" justifyContent="space-between" alignItems="center" mt={0} gap={2}>
  <StatBox title="Total Posts" value="234" increase="+5%" />
  <StatBox title="Scheduled Posts" value="45" increase="+10%" />
</Box>
        {/* Buttons */}
        <Box display="flex" justifyContent="space-between" mt={0}>
      
          <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
             AI-Powered Post Optimization
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
            Direct Post
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
          Schedule Post
          </Button>
        </Box>
    
   



        </Box>
       


        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          
        >
          <StatBox
          title="Top 10  Trending Hastag"
         
        />
    
        
    <ul style={{ 
  padding: "0", 
  margin: "0", 
  listStyle: "none", /* Adds numbers */
  fontSize: "18px", /* Increases font size */
  textAlign: "center", /* Centers text */
  fontWeight: "bold" /* Makes text bold */
}}>
  {[
    "#LataMangeshkar", "#ViratKohli", "#Budget2025", "#IPL2025", "#Modi", 
    "#Crypto", "#TechNews", "#StockMarket", "#Oscars2025", "#AI"
  ].map((hashtag, index) => (
    <li key={index} style={{ padding: "5px 0" }}>{hashtag}</li>
  ))}
</ul>


      

       </Box>
      </Box>
    </Box>
            
  
   
  );
}



