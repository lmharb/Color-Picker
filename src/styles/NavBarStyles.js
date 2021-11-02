import sizes from "./sizes"

const styles = {
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "1.5rem",
    backgroundColor: "rgb(223, 223, 223)",
    fontFamily: "Satisfy",
    height: "100%",
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
    animation: "$colorAnimation infinite 10s",
    "& a": {
      textDecoration: "none",
      color: "rgb(235, 235, 235)",
    },
    [sizes.down("md")]: {
      fontSize: "1rem",
    },
    [sizes.down("xs")]: {
      display: "none",
    },
  },
  "@keyframes colorAnimation": {
    "0%": {
      backgroundColor: "#775959",
    },
    "25%": {
      backgroundColor: "#737759",
    },
    "50%": {
      backgroundColor: "#597767",
    },
    "75%": {
      backgroundColor: "#596077",
    },
    "100%": {
      backgroundColor: "#755977",
    },
  },

  slider: {
    width: "240px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:active, .rc-slider-handle:focus":
      {
        backgroundColor: "lightseagreen",
        outline: "none",
        border: "none",
        boxShadow: "none",
        width: 13,
        height: 13,
        marginTop: "-3px",
      },
    [sizes.down("xs")]: {
      width: "150px",
    },
  },
  selectContainer: {
    marginLeft: "auto",
  },
}

export default styles
