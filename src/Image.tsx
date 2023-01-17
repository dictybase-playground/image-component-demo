import { useState } from "react"
import { Container } from "@material-ui/core"
import ErrorDisplay from "./ErrorDisplay"
import LoadingDisplay from "./LoadingDisplay"
import imageStyles from "./ImageStyles"

type ImageProperties = {
  src: string
  alt?: string
  height: string
  width: string
  fit: string
  duration: number
  easing: string
}

const Image = ({
  src,
  alt,
  height = "100%",
  width = "100%",
  fit = "contain",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 3000,
}: ImageProperties) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { root, image, icons } = imageStyles({
    height,
    width,
    fit,
    easing,
    duration,
    loading,
  })
  return (
    <Container disableGutters className={root}>
      <img
        src={src}
        alt={alt}
        className={image}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
      />
      {loading ? <LoadingDisplay icons={icons} /> : null}
      {error ? <ErrorDisplay icons={icons} /> : null}
    </Container>
  )
}

export default Image
