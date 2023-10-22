import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Videos from "./Videos";
import { callRapidAPI } from "../utils/callRapidAPI";
import Loader from "./Loader";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  console.log(videoDetail);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    callRapidAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    callRapidAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=1`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box>
      <Stack display={"flex"} direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", marginTop: "8px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              playing={true}
              controls
            />
            <Typography color="white" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "black" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Button variant="outlined" color="warning">
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "orange", ml: "5px" }}
                  />
                </Button>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{color:"white", opacity: 0.8 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ color:"white",  opacity: 0.8 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          overflow={"hidden"}
        >
          <Videos videos={videos} gridTemplateColumns={"repeat(1, 1fr)"} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
