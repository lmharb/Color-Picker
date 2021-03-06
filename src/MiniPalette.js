import React, { PureComponent } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { withStyles } from "@mui/styles"
import styles from "./styles/MiniPaletteStyles"

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props)
    this.deletePalette = this.deletePalette.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  deletePalette(e) {
    e.stopPropagation()
    this.props.openDialog(this.props.id)
  }

  handleClick() {
    this.props.goToPalette(this.props.id)
  }

  render() {
    const { classes, paletteName, emoji, colors } = this.props
    console.log(paletteName)
    const miniColorBoxes = colors.map((color) => {
      return (
        <div
          className={classes.miniBoxes}
          style={{ backgroundColor: color.color }}
          key={color.name}
        ></div>
      )
    })
    return (
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: " all 0.3s ease-in-out" }}
          onClick={this.deletePalette}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h2 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h2>
      </div>
    )
  }
}

export default withStyles(styles)(MiniPalette)
