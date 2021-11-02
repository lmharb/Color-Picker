import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@mui/styles"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Snackbar from "@mui/material/Snackbar"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import Slide from "@material-ui/core/Slide"
import Slider from "rc-slider"

import styles from "./styles/NavBarStyles"
import "rc-slider/assets/index.css"

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      format: "hex",
      open: false,
      transition: Slide,
    }
    this.handleFormatChange = this.handleFormatChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  SlideTransition(props) {
    return <Slide {...props} direction='up' />
  }

  handleFormatChange(e) {
    const transition = this.SlideTransition
    this.setState(
      {
        format: e.target.value,
        open: true,
        transition: transition,
      },
      () => {
        this.props.handleChange(this.state.format)
        setTimeout(() => this.setState({ open: false }), 3000)
      }
    )
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    const { level, changeLevel, showAllColors, classes } = this.props
    const { format, open } = this.state

    return (
      <nav className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>Color-Picker</Link>
        </div>
        {showAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}

        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0 )</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id='message-id'>
              Format Changed To <span>{format.toUpperCase()}</span>
            </span>
          }
          TransitionComponent={this.state.transition}
          ContentProps={{ "aria-describedby": "message-id" }}
          onClose={this.handleClose}
          action={[
            <IconButton
              onClick={this.handleClose}
              aria-label='close'
              key='close'
              color='inherit'
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </nav>
    )
  }
}

export default withStyles(styles)(Navbar)
