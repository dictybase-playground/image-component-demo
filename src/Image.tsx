import { useRef, useState } from "react"
import { Container } from "@material-ui/core"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import ImageResizer from "./ImageResizer"
import useImageStyles from "./imageStyles"

type ImageProperties = {
  src: string
  alt?: string
  height: string
  width: string
  fit: string
  duration: number
  easing: string
  onResize: (width: string, height: string) => void
}

const Image = ({
  src,
  alt,
  height = "100%",
  width = "100%",
  fit = "contain",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 2000,
  onResize,
}: ImageProperties) => {
  const [currentWidth, setCurrentWidth] = useState(width)
  const [currentHeight, setCurrentHeight] = useState(height)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const imageContainerReference = useRef<HTMLImageElement>(null)
  const { root, image, icons } = useImageStyles({
    currentWidth,
    currentHeight,
    fit,
    easing,
    duration,
    loading,
    error,
  })

  const handleResize = (newWidth: string, newHeight: string) => {
    setCurrentWidth(newWidth)
    setCurrentHeight(newHeight)
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
      <ImageResizer
        handleResize={handleResize}
        imageContainer={imageContainerReference.current}
      />
    </Container>
  )
}

export default Image
