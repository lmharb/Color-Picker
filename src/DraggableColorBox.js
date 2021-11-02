import React from "react"
import { SortableElement } from "react-sortable-hoc"
import { withStyles } from "@mui/styles"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "./styles/DraggableColorBoxStyles"

const DraggableColorBox = SortableElement((props) => {
  const { classes, background, name, deleteColor } = props
  return (
    <div className={classes.root} style={{ backgroundColor: background }}>
      <div className={classes.boxContent}>
        <span className={classes.name}>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={deleteColor} />
      </div>
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox)
