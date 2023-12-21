import * as React from "react";
import { Box, Button, InputBase, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getNewsTitle } from "../API";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({ setUpdatedNews }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    const searchedNews = await getNewsTitle(searchTerm);
    console.log("searchedNews:", searchedNews);
    setUpdatedNews(searchedNews);
  };

  return (
    <Box sx={{ display: 'flex', gap: '16px', flexGrow: 1, width: 300, }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Buscar título"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Search>
      <Button sx={{ bgcolor: "purple", color: "white" }} onClick={handleSearch}>
        Buscar
      </Button>
    </Box>
  );
}
