import React, { Component } from "react"
import ColorBox from "./ColorBox"
import Navbar from "./Navbar"
import PaletteFooter from "./PaletteFooter"
import styles from "./styles/PaletteStyles"
import { withStyles } from "@mui/styles"
import { Link } from "react-router-dom"

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    this.state = {
      format: "hex",
    }
    this.changeFormat = this.changeFormat.bind(this)
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = []
    let allColors = palette.colors
    for (let colors in allColors) {
      shades = shades.concat(
        allColors[colors].filter((color) => color.id === colorToFilterBy)
      )
    }
    return shades.slice(1)
  }

  changeFormat(val) {
    this.setState({
      format: val,
    })
  }

  render() {
    const { format } = this.state
    const { paletteName, emoji, id } = this.props.palette
    const { classes } = this.props
    const colorBoxes = this._shades.map((color) => {
      return (
        <ColorBox
          key={color.name}
          name={color.name}
          background={color[format]}
          showingFullPalette={false}
        ></ColorBox>
      )
    })
    return (
      <div className={classes.palette}>
        <Navbar handleChange={this.changeFormat} showAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} className={classes.backButton}>
              GO BACK
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette)
