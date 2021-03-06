const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    transition: "ease-in-out 0.2s",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.2)",
      transform: "translateY(-2px)",
    },
    "&:hover svg": {
      opacity: "1",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    width: "100%",
    height: "100px",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "-2px",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    marginTop: "0.5rem",
    marginBottom: "0.2rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: { marginLeft: "0.5rem", fontSize: "1.5rem" },
  miniBoxes: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },
  delete: {},
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    zIndex: "10",
    padding: "5px",
    borderRadius: "0px 5px 0px 5px",
    opacity: "0",
  },
}

export default styles
