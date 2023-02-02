import { useState } from "react"
import { Container } from "@material-ui/core"
import LoadingDisplay from "./LoadingDisplay"
import ErrorDisplay from "./ErrorDisplay"
import useImageStyles from "./useImageStyles"

export type ImageProperties = {
  src: string
  alt?: string
}

const Image = ({ src, alt }: ImageProperties) => {
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
    <Container disableGutters className={root}>
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

export default Image
