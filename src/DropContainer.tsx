import { DragEvent, ReactElement, SetStateAction, Dispatch } from "react"
import { Container } from "@material-ui/core"
import { onDragStart } from "./dragHandlers"
import { ContainerState } from "./AppVersion1"
import useDropContainerStyles from "./useDropContainerStyles"
import Image from "./Image"

const handleDropTarget = (event: DragEvent) => {
  event.preventDefault()
}

type DropContainerProperties = {
  children: ReactElement | ReactElement[]
  setContainerState: Dispatch<SetStateAction<ContainerState>>
}

const DropContainer = ({
  children,
  setContainerState,
}: DropContainerProperties) => {
  const { root } = useDropContainerStyles()

  const onDrop = (event: DragEvent) => {}

  return (
    <Container
      title="Drop Area"
      className={root}
      onDrop={onDrop}
      onDragEnter={handleDropTarget}
      onDragOver={handleDropTarget}>
      {children}
    </Container>
  )
}

export default DropContainer
