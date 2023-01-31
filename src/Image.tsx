import { useRef, useState } from "react"
import { Container } from "@material-ui/core"
import { onDragStart } from "./dragHandlers"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import useImageStyles from "./imageStyles"

export type ImageProperties = {
  src: string
  alt?: string
  initialWidth: number
  initialHeight: number
  fit?: string
  duration?: number
  easing?: string
}

const Image = ({
  src,
  alt,
  initialHeight = 500,
  initialWidth = 500,
  fit = "contain",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 2000,
}: ImageProperties) => {
  const [dimensions] = useState({
    width: initialHeight,
    height: initialWidth,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const imageContainerReference = useRef<HTMLImageElement>(null)
  const { root, image, icons } = useImageStyles({
    width: dimensions.width,
    height: dimensions.height,
    fit,
    easing,
    duration,
    loading,
    error,
  })

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <Container
      draggable
      ref={imageContainerReference}
      disableGutters
      className={root}>
      <img
        onDragStart={onDragStart}
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

export default Image
