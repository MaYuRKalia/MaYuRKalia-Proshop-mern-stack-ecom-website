import React, { useState } from "react";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  // gh repo clone MaYuRKalia/monsters-rolodex
  return (
    <Paper
      onSubmit={submitHandler}
      component="form"
      sx={{
        p: "1px 3px",
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 40,
      }}
    >
      <InputBase
        variant="outlined"
        color="success"
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products..."
      />

      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
