import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {callRapidAPI} from "../utils/callRapidAPI";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await callRapidAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await callRapidAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);
console.log(channelDetail?.snippet?.thumbnails?.high?.url);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            height: "300px",
              backgroundImage: `url(${channelDetail?.snippet?.thumbnails?.high?.url})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            backgroundRepeat:"repeat",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-95px" />
      </Box>
      <Box p={5} display="flex">
        <Box sx={{ mr: { sm: "10px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
