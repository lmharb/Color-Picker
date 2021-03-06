import React, { Component } from "react"
import CopyToCLipboard from "react-copy-to-clipboard"
import { Link } from "react-router-dom"
import styles from "./styles/ColorBoxStyles"
import { withStyles } from "@mui/styles"

class ColorBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      copied: false,
    }
    this.changeCopyState = this.changeCopyState.bind(this)
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500)
    })
  }

  render() {
    const { name, background, paletteId, id, showingFullPalette, classes } =
      this.props
    const { copied } = this.state

    return (
      <CopyToCLipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.ColorBox} style={{ background }}>
          <div
            className={`${classes.copyOverlay} ${
              copied && classes.showOverlay
            }`}
            style={{ background }}
          />
          <div
            className={`${classes.copyMessage} ${
              copied && classes.showMessage
            }`}
          >
            <h1>Copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToCLipboard>
    )
  }
}

export default withStyles(styles)(ColorBox)
