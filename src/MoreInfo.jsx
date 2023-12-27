import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "./MoreInfo";
import "./index.css";
import MiniBrowser from "./MiniBrowser";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MoreInfo({ news }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const url = news.url;
  const img = news.urlToImage;
  const content = news.content;
  const title = news.title;
  const description = news.description;
  const publishedAt = news.publishedAt;
  const author = news.author;
  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          marginLeft: "auto",
          marginRight: "10px",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        Read More
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="Window"
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              I gotSomeNews FOR YOU!
            </Typography>
          </Toolbar>
        </AppBar>

        <div>
          <MiniBrowser url={url} style={{ marginTop: "100px" }} />
        </div>
      </Dialog>
    </React.Fragment>
  );
}
