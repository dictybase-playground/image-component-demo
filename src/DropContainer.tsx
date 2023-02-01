import { DragEvent, ReactElement } from "react"
import { Container } from "@material-ui/core"
import { onDragStart } from "./dragHandlers"
import Image from "./Image"

const handleDropTarget = (event: DragEvent) => {
  event.preventDefault()
}

type DropContainerProperties = {
  children: ReactElement | ReactElement[]
}

const DropContainer = ({ children }: DropContainerProperties) => {
  const onDrop = (event: DragEvent) => {}

  return (
    <Container
      title="Drop Area"
      onDrop={onDrop}
      onDragEnter={handleDropTarget}
      onDragOver={handleDropTarget}>
      {children}
    </Container>
  )
}

export default DropContainer
