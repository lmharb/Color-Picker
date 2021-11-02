import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@mui/styles"
import styles from "./styles/PaletteListStyles"
import MiniPalette from "./MiniPalette"
import Dialog from "@mui/material/Dialog"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import { red } from "@mui/material/colors"
import { blue } from "@mui/material/colors"
import DialogTitle from "@mui/material/DialogTitle"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import Slide from "@material-ui/core/Slide"

import { CSSTransition, TransitionGroup } from "react-transition-group"

class PaletteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDeleteDialog: false,
      deletingId: "",
      transition: Slide,
    }
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.goToPalette = this.goToPalette.bind(this)
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id })
  }

  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" })
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId)
    this.closeDialog()
  }

  render() {
    const { palettes, classes, openSnack, lastPaletteAdded } = this.props
    const { openDeleteDialog, transition } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Palettes-List</h1>
            <Link to='/palette/new'>New Palette</Link>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={openSnack}
              autoHideDuration={3000}
              message={
                <span id='message-id'>
                  <span style={{ fontWeight: "bold" }}>
                    {lastPaletteAdded}{" "}
                  </span>
                  has been added to yout list!
                </span>
              }
              TransitionComponent={transition}
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
          {palettes.length === 0 ? (
            <div className={classes.noPalette}>
              <h1>No Palette registered... </h1>
              <h3>Create your own palettes!</h3>
            </div>
          ) : (
            <TransitionGroup className={classes.palettes}>
              {palettes.map((palette) => {
                return (
                  <CSSTransition
                    key={palette.id}
                    classNames='fade'
                    timeout={500}
                  >
                    <MiniPalette
                      {...palette}
                      key={palette.id}
                      id={palette.id}
                      goToPalette={this.goToPalette}
                      openDialog={this.openDialog}
                    />
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          )}
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialog}
        >
          <DialogTitle id='delete-dialog-title'>
            Delete this Palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)
