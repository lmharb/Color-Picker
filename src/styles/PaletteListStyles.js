import sizes from "./sizes"
import bg from "./bg.svg"

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out",
    },
  },
  root: {
    /* background by SVGBackgrounds.com */
    backgroundColor: "#E6CDFF",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "scroll",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("lg")]: {
      width: "70%",
    },
    [sizes.down("md")]: {
      width: "80%",
    },
    [sizes.down("sm")]: {
      width: "90%",
    },
    [sizes.down("xxs")]: {
      width: "75%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    height: "64px",
    marginBottom: "1rem",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
      textDecoration: "none",
      padding: "0.6rem",
      borderRadius: "5px",
      transition: "all 0.3s",
    },
    "& a:hover": {
      padding: "0.6rem",
      backgroundColor: "rgba(250, 250, 250, 0.2)",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    justifyContent: "center",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "2rem",
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(2,50%)",
      gridGap: "1.5rem",
    },
    [sizes.down("xxs")]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1rem",
    },
  },
  noPalette: {
    display: "flex",
    color: "white",
    width: "100%",
    fontSize: "1rem",
    marginTop: "20vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}

export default styles
