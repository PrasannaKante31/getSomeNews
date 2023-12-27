import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import DatePickerValue from "./DatePickerValue";
import "./Drawer.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),

    position: "relative",
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function DrawerR({ changeSort, changeFrom, changeTo }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(() => !open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Button
        variant="outlined"
        onClick={handleDrawerOpen}
        className="SortBy"
        style={{
          color: "black",
          borderColor: "black",
          marginTop: 36,
          marginLeft: "0px",
          borderRadius: 0,
        }}
      >
        Sort
      </Button>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Relevancy", "Popularity", "Published at"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() =>
                  (changeSort(
                    text === "Relevancy"
                      ? "relevancy"
                      : text === "Popularity"
                      ? "popularity"
                      : "publishedAt"
                  ) ||
                    true) &&
                  handleDrawerClose()
                }
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <p>Choose Dates:</p>
          <ListItem>
            <DatePickerValue label="from" changeDate={changeFrom} />
          </ListItem>
          <ListItem>
            <DatePickerValue label="to" changeDate={changeTo} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
