import { styled } from "@mui/material/styles"
import MuiAppBar from "@mui/material/AppBar"
import { DRAWER_WIDTH } from "./constants"

import sizes from "./sizes"

const drawerWidth = DRAWER_WIDTH

const styles = {
  root: {
    display: "flex",
  },
  navBtns: {
    display: "flex",
    marginRight: "1rem",
    alignItems: "center",
  },
  button: {
    margin: "0 0 0 0.5rem !important",
  },
  link: {
    textDecoration: "none",
  },
  typography: {
    [sizes.down("xxs")]: {
      display: "none",
    },
  },
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  height: "64px",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export { styles, AppBar }
