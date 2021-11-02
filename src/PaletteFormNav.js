import React, { Component } from "react"
import PaletteMetaForm from "./PaletteMetaForm"
import { Link } from "react-router-dom"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { withStyles } from "@mui/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"

import { styles, AppBar } from "./styles/PaletteFormNavStyles"

class PaletteFormNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formShowing: false,
    }
    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
  }

  showForm() {
    this.setState({
      formShowing: true,
    })
  }

  hideForm() {
    this.setState({
      formShowing: false,
    })
  }

  render() {
    const { open, palettes, handleDrawerOpen, classes, handleSubmit } =
      this.props
    const { formShowing } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' open={open} color='default'>
          <Toolbar>
            <IconButton
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <AddCircleIcon
                variant='outlined'
                sx={{
                  color: "#cecece",
                  fontSize: "1.8rem",
                  transition: "all 0.2s",
                  "&:hover": {
                    color: "rgb(175, 175, 175)",
                    transform: "scale(1.5)",
                  },
                }}
              />
            </IconButton>
            <Typography
              className={classes.typography}
              variant='h6'
              noWrap
              component='div'
            >
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link className={classes.link} to='/'>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
              >
                Go Back
              </Button>
            </Link>
            <Button
              className={classes.button}
              variant='contained'
              onClick={this.showForm}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {formShowing && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    )
  }
}

export default withStyles(styles)(PaletteFormNav)
