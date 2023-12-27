import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "./logo.png";
import { useState, useEffect } from "react";
import NewsBox from "./NewsBox";
import DrawerR from "./Drawer";
import ShowMenu from "./ShowMenu";
import "./NavBar.css";

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
function giveDate(flag) {
  let now = new Date();
  if (!flag) now.setDate(now.getDate() - 1);
  return "".concat(
    now.getFullYear(),
    "-",
    now.getMonth() + 1,
    "-",
    now.getDate()
  );
}
export default function NavBar() {
  const [text, setText] = useState("any");
  const [sort, setSort] = useState("relevancy");
  const [preview, setPreview] = useState("");
  const [from, setFrom] = useState(() => giveDate(false));
  const [to, setTo] = useState(() => giveDate(true));
  const [url, setUrl] = useState(
    `https://newsapi.org/v2/everything?q=${text}&from=${from}&sortBy=${sort}&apiKey=1fd25a51b7dc4d74abc89689ecc8ea2d`
  );

  const [grid, setGrid] = useState(Grid);

  useEffect(() => {
    fetchNews();
  }, [grid, text, url, sort, from, to]);

  const fetchNews = async () => {
    setUrl(
      (oldUrl) =>
        `https://newsapi.org/v2/everything?q=${text}&from=${from}&to=${to}&language=en&sortBy=${sort}&apiKey=1fd25a51b7dc4d74abc89689ecc8ea2d`
    );

    var req = new Request(url);
    let awaited = await fetch(req);
    let newslet = await awaited.json(); //object is given

    const size = newslet.totalResults;
    const articles = newslet.articles;

    // object received done
    let newGrid = [];
    //setting up the grid
    for (let i = 0; i < 30; i++) {
      let NewsRow = [];
      for (let cnt = 0; cnt < 3; cnt++) {
        NewsRow.push(<NewsBox news={articles[i]} />);
        i++;
      }
      newGrid.push(<div className="NewsRow">{NewsRow}</div>);
    }

    setGrid((grid) => newGrid);
  };

  function changePreview(evt) {
    setPreview((oldPreview) => evt.target.value);
  }

  function changeSort(sort) {
    setSort(sort); //the variable is printed before the state is set, thus we see the last state if we console.log into it
  }

  function changeText(evt) {
    if (evt.key === "Enter") {
      setText((oldValue) => evt.target.value);
    }
  }

  function changeText2(newText) {
    setText((oldValue) => newText);
  }

  function changeTo(newDate) {
    setTo((oldDate) => newDate);
  }

  function changeFrom(newDate) {
    setFrom((oldDate) => newDate);
  }
  return (
    <div className="container">
      <Box className="Box">
        <AppBar className="AppBar" position="static">
          <Toolbar>
            <ShowMenu changeText2={changeText2} />
            <b style={{ color: "black" }}>Let's GetSomeNews! </b>
            <img
              src={logo}
              style={{ height: 39, width: 30, marginLeft: 120 }}
            />
            <Search style={{ width: 300, marginLeft: 0, borderRadius: 0 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={preview}
                onKeyDown={changeText}
                onChange={changePreview}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                className="input"
              />
            </Search>

            <DrawerR
              changeSort={changeSort}
              changeFrom={changeFrom}
              changeTo={changeTo}
            />
          </Toolbar>
        </AppBar>
      </Box>

      <div>{grid}</div>
    </div>
  );
}
//newsGrid text check
