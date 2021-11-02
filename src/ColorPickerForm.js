import React, { Component } from "react"
import Button from "@mui/material/Button"
import { ChromePicker } from "react-color"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { withStyles } from "@mui/styles"
import chroma from "chroma-js"

import styles from "./styles/ColorPickerFormStyles"

class ColorPickerForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentColor: "teal",
      newColorName: "",
    }
    this.updateCurrentColor = this.updateCurrentColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    )
    ValidatorForm.addValidationRule("isColorUnique", () =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    )
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    }
    this.props.addNewColor(newColor)
    this.setState({
      newColorName: "",
    })
  }

  render() {
    const { currentColor, newColorName } = this.state
    const { paletteIsFull, classes } = this.props
    const isLightColor =
      chroma(currentColor).luminance() <= 0.18 ? "white" : "rgba(0,0,0, 0.7)"
    return (
      <div className={classes.root}>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.colorPicker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            name='newColorName'
            className={classes.newColorName}
            variant='filled'
            margin='normal'
            value={newColorName}
            onChange={this.handleChange}
            placeholder='Color Name'
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a Color Name",
              "Color name must be unique!",
              "Color already used!",
            ]}
          />
          <Button
            className={classes.addColor}
            variant='contained'
            type='submit'
            color='success'
            style={{
              backgroundColor: paletteIsFull ? "lightgrey" : currentColor,
              color: paletteIsFull ? "darkgrey" : isLightColor,
              transition: "all 0.2s",
            }}
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette is Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm)
