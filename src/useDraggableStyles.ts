import { makeStyles, Theme } from "@material-ui/core"
import { Transform } from "@dnd-kit/utilities"

export type DraggableStyleProperties = {
  transform: Transform | null
}

const useDraggableStyles = makeStyles<Theme, DraggableStyleProperties>({
  root: {
    transform: ({ transform }) => {
      if (!transform) return ""
      return `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
    },
  },
})

export default useDraggableStyles
