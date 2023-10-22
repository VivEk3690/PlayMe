import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import playMeLogo from "../assets/images/playMe.png";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        p={2}
        sx={{
          position: "sticky",
          background: "#343434",
          top: 0,
          justifyContent: "space-between",
          boxShadow: 1,
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={playMeLogo} alt="Logo" width={100} height={"auto"} />
        </Link>
        <SearchBar />
      </Stack>
    </>
  );
};

export default Navbar;
