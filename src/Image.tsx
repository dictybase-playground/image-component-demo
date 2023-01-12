import { useState } from "react"
import { makeStyles } from "@material-ui/core"

type ImageProperties = {
  src: string
  alt?: string
  height: string
  width: string
  fit: string
  duration: number
  easing: string
}

type StyleProperties = {
  height: string
  width: string
  fit: string
  duration: number
  easing: string
  loaded: boolean
}

const useStyles = makeStyles<{}, StyleProperties>({
  root: {
    height: (styleProperties) => styleProperties.height,
    width: (styleProperties) => styleProperties.width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    "object-fit": (styleProperties) => styleProperties.fit,
    transitionProperty: "opacity",
    transitionTimingFunction: (styleProperties) => styleProperties.easing,
    transitionDuration: (styleProperties) =>
      styleProperties.duration ? `${styleProperties.duration}ms` : "",
    opacity: (styleProperties) => (styleProperties.loaded ? 1 : 0),
  },
})

const Image = ({
  src,
  alt,
  height = "100%",
  width = "100%",
  fit = "cover",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 3000,
}: ImageProperties) => {
  const [loaded, setLoaded] = useState(false)
  const { root, image } = useStyles({
    height,
    width,
    fit,
    easing,
    duration,
    loaded,
  })

  return (
    <div className={root}>
      <img
        src={src}
        alt={alt}
        className={image}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default Image
