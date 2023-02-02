import { ReactChild } from "react"
import { Container } from "@material-ui/core"
import { useDraggable, UniqueIdentifier } from "@dnd-kit/core"
import useDraggableStyles from "./useDraggableStyles"

type DraggableProperties = {
  id: UniqueIdentifier
  children: ReactChild[] | ReactChild
}

const Draggable = ({ id, children }: DraggableProperties) => {
  const { setNodeRef, listeners, transform } = useDraggable({
    id,
  })
  const { root } = useDraggableStyles({ transform })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container ref={setNodeRef} {...listeners} className={root} disableGutters>
      {children}
    </Container>
  )
}

export default Draggable
