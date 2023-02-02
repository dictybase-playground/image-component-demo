import { ReactChild } from "react"
import { Container } from "@material-ui/core"
import { useDroppable, UniqueIdentifier } from "@dnd-kit/core"
import useDropContainerStyles from "./useDropContainerStyles"

type DropContainerProperties = {
  children: ReactChild[] | ReactChild
  dropId: UniqueIdentifier
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
