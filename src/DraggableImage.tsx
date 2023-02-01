import { DragEvent, useRef, useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { Container } from "@material-ui/core"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import useImageStyles from "./imageStyles"

export type DraggableImageProperties = {
  src: string
  alt?: string
  onDragStart?: (event: DragEvent<HTMLImageElement>) => void
}

const DraggableImage = ({
  src,
  alt,
  onDragStart,
}: DraggableImageProperties) => {
  const { setNodeRef, listeners } = useDraggable({ id: "draggableImage" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { root, image, icons } = useImageStyles({
    loading,
    error,
  })

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <Container
      title="draggable container"
      draggable
      ref={setNodeRef}
      disableGutters
      onDragStart={onDragStart}
      className={root}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...listeners}>
      <img
        draggable={false}
        src={src}
        alt={alt}
        className={image}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
      {loading ? <LoadingDisplay icons={icons} /> : null}
      {error ? <ErrorDisplay icons={icons} /> : null}
    </Container>
  )
}

export default DraggableImage
