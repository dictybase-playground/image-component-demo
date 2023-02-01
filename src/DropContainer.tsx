import { useRef, useEffect, DragEvent } from "react"
import { Container } from "@material-ui/core"
import { onDragStart, onDrop } from "./dragHandlers"
import Image from "./Image"

const handleDrag = (event: DragEvent) => {
  event.preventDefault()
}

const DropContainer = () => {
  const containerReference = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const containerElement = containerReference.current
    if (!containerElement) return
    containerElement.addEventListener("dragenter", handleDrag)
    containerElement.addEventListener("dragover", handleDrag)
    containerElement.addEventListener("drop", onDrop)

    // eslint-disable-next-line consistent-return
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("dragenter", handleDrag)
        containerElement.removeEventListener("dragover", handleDrag)
        containerElement.removeEventListener("drop", onDrop)
      }
    }
  }, [])
  return (
    <Container onDrop={onDrop} title="Drop Area" ref={containerReference}>
      test
    </Container>
  )
}

export default DropContainer
