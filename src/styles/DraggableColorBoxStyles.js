import chroma from "chroma-js"
import sizes from "./sizes"

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-7px",
    "&:hover svg": {
      color: (props) =>
        chroma(props.background).luminance() <= 0.3
          ? "white"
          : "rgba(0,0,0, 0.9)",
      transform: "scale(1.25)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    position: "absolute",
    padding: "10px",
    width: "100%",
    left: "0px",
    bottom: "0px",
    color: (props) =>
      chroma(props.background).luminance() <= 0.3
        ? "white"
        : "rgba(0,0,0, 0.7)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteIcon: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.3
        ? "rgba(250,250,250, 0.5)"
        : "rgba(0,0,0, 0.5)",
    transition: "0.3s all !important",
  },
  name: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}

export default styles
