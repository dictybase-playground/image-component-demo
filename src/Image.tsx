import { useRef, useState } from "react"
import { Container } from "@material-ui/core"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import ImageResizer from "./ImageResizer"
import useImageStyles from "./imageStyles"

type ImageProperties = {
  src: string
  alt?: string
  initialWidth: string
  initialHeight: string
  fit: string
  duration: number
  easing: string
  onResize: (width: string, height: string) => void
}

const Image = ({
  src,
  alt,
  initialHeight = "100%",
  initialWidth = "100%",
  fit = "contain",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 2000,
  onResize,
}: ImageProperties) => {
  const [dimensions, setDimensions] = useState({
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

  const handleResize = (newWidth: string, newHeight: string) => {
    setDimensions({ width: newWidth, height: newHeight })
    onResize(newWidth, newHeight)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <Container ref={imageContainerReference} disableGutters className={root}>
      <img
        src={src}
        alt={alt}
        className={image}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
      {loading ? <LoadingDisplay icons={icons} /> : null}
      {error ? <ErrorDisplay icons={icons} /> : null}
      {imageContainerReference.current ? (
        <ImageResizer
          handleResize={handleResize}
          imageContainer={imageContainerReference.current}
        />
      ) : null}
    </Container>
  )
}

export default Image
