import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Videos from "./Videos";
import { callRapidAPI } from "../utils/callRapidAPI";

const Home = () => {
  const [selectVideoCategory, setselectVideoCategory] = useState("New");
  const [videos, setVideos] = useState([]);


  useEffect(() => {
      console.log(selectVideoCategory)
    setVideos([]);

    callRapidAPI(`search?part=snippet&q=${selectVideoCategory}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectVideoCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid gray",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectVideoCategory}
          setSelectedCategory={setselectVideoCategory}
        />

        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color:"white", opacity:0.8 }}>
          Copyright © 2023 Vivek Patel
        </Typography>
      </Box>

      <Box p={1.3} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          mb={2}
          sx={{ color: "white" }}
        >
          {selectVideoCategory} <span style={{ color: "#f31503" }}>Videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Home;
