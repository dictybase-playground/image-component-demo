import { ReactElement } from "react"
import { Container } from "@material-ui/core"
import { useDroppable } from "@dnd-kit/core"
import useDropContainerStyles from "./useDropContainerStyles"

type DropContainerProperties = {
  children: ReactElement | ReactElement[]
  dropId: string
}

const DropContainer = ({ children, dropId }: DropContainerProperties) => {
  const { setNodeRef } = useDroppable({
    id: dropId,
  })
  const { root } = useDropContainerStyles()

  return (
    <Container title="Drop Area" ref={setNodeRef} className={root}>
      {children}
    </Container>
  )
}

export default DropContainer
