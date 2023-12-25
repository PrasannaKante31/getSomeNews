import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./logo.png";
import { useState, useEffect } from "react";
import NewsGrid from "./NewsGrid";
import NewsBox from "./NewsBox";
let Grid = [];
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
    // vertical padding + font size from searchIcon
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

export default function NavBar() {
  const [text, setText] = useState("any");
  const [preview, setPreview] = useState("");
  const [url, setUrl] = useState(
    `https://newsapi.org/v2/everything?q=${text}&from=2023-11-25&sortBy=publishedAt&apiKey=1881fe38d63e4bf0be6062fe535d398b`
  );

  const [grid, setGrid] = useState(Grid);

  console.log("preview is ", preview);
  useEffect(() => {
    fetchNews();
  }, [grid]);

  const fetchNews = async () => {
    setUrl(
      (oldUrl) =>
        `https://newsapi.org/v2/everything?q=${text}&from=2023-11-25&language=en&sortBy=publishedAt&apiKey=1881fe38d63e4bf0be6062fe535d398b`
    );
    console.log(url);
    var req = new Request(url);
    let awaited = await fetch(req);
    let newslet = await awaited.json(); //object is given
    const size = newslet.totalResults;
    const articles = newslet.articles;
    // object received done
    let newGrid = [];
    for (let i = 0; i < 30; i++) {
      let NewsRow = [];
      for (let cnt = 0; cnt < 3; cnt++) {
        NewsRow.push(<NewsBox news={articles[i]} />);
        i++;
      }
      newGrid.push(NewsRow);
    }

    setGrid((grid) => newGrid);
  };

  function changePreview(evt) {
    setPreview((oldPreview) => evt.target.value);
  }

  function changeText(evt) {
    if (evt.key === "Enter") {
      setText((oldValue) => evt.target.value);
    }
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} style={{ height: 55 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={preview}
                onKeyDown={changeText}
                onChange={changePreview}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <div>{grid}</div>
    </div>
  );
}
//newsGrid text check
