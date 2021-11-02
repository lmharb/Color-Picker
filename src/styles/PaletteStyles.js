import sizes from "./sizes"

const styles = {
  palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  colors: {
    height: "90%",
  },
  goBack: {
    backgroundColor: "black",
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    opacity: "1",
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "10%",
    },
  },
  backButton: {
    width: "100px",
    height: "30px",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      opacity: "0.9",
      transition: "0.3s",
    },
  },
}

export default styles
