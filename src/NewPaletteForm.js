import React, { Component } from "react"
import PaletteFormNav from "./PaletteFormNav"
import ColorPickerForm from "./ColorPickerForm"
import { withStyles } from "@mui/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import Button from "@mui/material/Button"
import DraggableColorList from "./DraggableColorList"
import { arrayMove } from "react-sortable-hoc"

import seedColors from "./seedColors"
import { DRAWER_WIDTH } from "./styles/constants"
import { styles, Main, DrawerHeader } from "./styles/NewPaletteFormStyles"
import { random } from "chroma-js"

const drawerWidth = DRAWER_WIDTH

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      colors: seedColors[0].colors,
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
    this.deleteColor = this.deleteColor.bind(this)
    this.clearColors = this.clearColors.bind(this)
    this.addRandomColor = this.addRandomColor.bind(this)
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleDrawerClose = () => {
    this.setState({
      open: false,
    })
  }

  handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
    newPalette.colors = this.state.colors
    this.props.savePalette(newPalette)
    this.props.history.push("/")
  }

  addNewColor(newColor) {
    this.setState((st) => ({
      colors: [...st.colors, newColor],
      newColorName: "",
    }))
  }

  deleteColor(colorName) {
    this.setState((st) => ({
      colors: [...st.colors].filter((color) => color.name !== colorName),
    }))
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  }

  clearColors() {
    this.setState({ colors: [] })
  }

  addRandomColor() {
    const allColors = this.props.palettes.map((p) => p.colors).flat()
    let rand
    let randomColor
    let isDuplicateColor = true
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length)
      randomColor = allColors[rand]
      isDuplicateColor = this.state.colors.some(
        (color) => color.name === randomColor.name
      )
    }
    this.setState((st) => ({
      colors: [...st.colors, randomColor],
    }))
  }

  render() {
    const { open, colors } = this.state
    const { maxColors, palettes, classes } = this.props
    const paletteIsFull = colors.length >= maxColors

    return (
      <Box sx={{ display: "flex" }}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant='contained'
                color='error'
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
                className={classes.button}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              colors={colors}
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
            />
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <DraggableColorList
            colors={colors}
            deleteColor={this.deleteColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
            distance={10}
          />
        </Main>
      </Box>
    )
  }
}

export default withStyles(styles)(NewPaletteForm)
