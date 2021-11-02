import React, { Component } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { Picker } from "emoji-mart"

import "emoji-mart/css/emoji-mart.css"

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: "form",
      newPaletteName: "",
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showEmojiPicker = this.showEmojiPicker.bind(this)
    this.savePalette = this.savePalette.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClickOpen() {
    this.setState({
      open: true,
    })
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  showEmojiPicker() {
    this.setState({
      stage: "emoji",
    })
  }

  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    }
    this.props.handleSubmit(newPalette)
  }

  render() {
    const { newPaletteName, stage } = this.state
    const { hideForm } = this.props

    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
          <Picker onSelect={this.savePalette} title='Pick a Palette Emoji' />
        </Dialog>
        <Dialog open={stage === "form"} onClose={hideForm} fullWidth>
          <DialogTitle style={{ fontWeight: "600", fontSize: "1.5rem" }}>
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a valid Name for your new Palette
              </DialogContentText>
              <TextValidator
                label='Palette Name'
                name='newPaletteName'
                value={newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter a Palette Name", "Name already used!"]}
                margin='normal'
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm}>Cancel</Button>
              <Button variant='contained' type='submit' color='primary'>
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    )
  }
}

export default PaletteMetaForm
