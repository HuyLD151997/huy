import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./../../../components/Menu/SideBar";
import Header from "./../../../components/Menu/Header";
import img from "../../../img/32x32.png";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AdminLayoutRouter = (props) => {
  const { classes, component: YourComponent, ...remainsprops } = props;

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Route
      {...remainsprops}
      render={(routeProps) => {
        // if (!localStorage.getItem("token")) {
        //   return (
        //     <Redirect
        //       to={{ pathname: "/", state: { from: routeProps.location } }}
        //     />
        //   );
        // }
        return (
          <div>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar
                position="fixed"
                open={open}
                sx={{ backgroundColor: "#fdcb08" }}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      mr: 2,
                      ...(open && { display: "none" }),
                      width: "50px",
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <div style={{ marginLeft: "1050px" }}>
                    <Header />
                  </div>
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#fdcb08",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader sx={{ backgroundColor: "#fdcb08" }}>
                  <div
                    className="logo text-secondary font-weight-bold "
                    style={{
                      background: "#fdcb08",
                      paddingBottom: "13px",
                      paddingTop: "15px",
                      paddingLeft: "60px",
                      marginRight: "60px",
                    }}
                  >
                    <img src={img} />
                  </div>
                  <IconButton
                    onClick={handleDrawerClose}
                    sx={{ width: "30px" }}
                  >
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                </DrawerHeader>
                {/* <Divider /> */}
                <List sx={{ backgroundColor: "#fdcb08" }}>
                  <Sidebar />
                </List>
              </Drawer>
              <Main open={open}>
                <DrawerHeader />
                <YourComponent {...routeProps} />
              </Main>
            </Box>
            {/* <div className="row">
              
              <div className="col-2 pr-0" style={{ background: "#fdcb08" }}>
                <Sidebar />
              </div>

              <div
                className="col-10 justify-content-end pl-0 pr-0"
                id="headers"
              >
                <Header />

                <YourComponent {...routeProps} />
              </div>
            </div> */}
          </div>
        );
      }}
    />
  );
};

export default AdminLayoutRouter;
