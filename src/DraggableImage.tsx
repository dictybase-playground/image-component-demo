import { DragEvent, useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { Container } from "@material-ui/core"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import useImageStyles from "./useImageStyles"

export type DraggableImageProperties = {
  src: string
  id: string
  alt?: string
  onDragStart?: (event: DragEvent<HTMLImageElement>) => void
}

const DraggableImage = ({ src, alt, id }: DraggableImageProperties) => {
  const { setNodeRef, listeners, transform } = useDraggable({
    id,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { root, image, icons } = useImageStyles({
    loading,
    error,
    transform,
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
