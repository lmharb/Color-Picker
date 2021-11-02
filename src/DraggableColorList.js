import React from "react"
import DraggableColorBox from "./DraggableColorBox"
import { SortableContainer } from "react-sortable-hoc"

const DraggableColorList = SortableContainer((props) => {
  const { colors, deleteColor } = props

  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => {
        return (
          <DraggableColorBox
            index={i}
            background={color.color}
            name={color.name}
            key={color.name}
            deleteColor={() => deleteColor(color.name)}
          />
        )
      })}
    </div>
  )
})

export default DraggableColorList
