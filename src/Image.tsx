import { useRef, useState } from "react"
import { Container, makeStyles, SvgIcon, Theme } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import BrokenImageTwoToneIcon from "@material-ui/icons/BrokenImageTwoTone"
import ImageResizer from "./ImageResizer"

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

type StyleProperties = {
  currentHeight: string
  currentWidth: string
  fit: string
  duration: number
  easing: string
  loading: boolean
  error: boolean
}

const useStyles = makeStyles<Theme, StyleProperties>({
  root: {
    position: "relative",
    height: ({ currentHeight }) => currentHeight,
    width: ({ currentWidth }) => currentWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    "object-fit": ({ fit }) => fit,
    animationName: `$materialize`,
    animationDuration: ({ duration }) => `${duration}ms`,
    animationTimingFunction: ({ easing }) => easing,
    zIndex: ({ error }) => (error ? -1 : 1),
  },
  icons: {
    width: "100%",
    marginLeft: "-100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "@keyframes materialize": {
    "0%": {
      filter: "saturate(20%) contrast(50%) brightness(160%)",
      opacity: "0",
    },
    "75%": {
      filter: "saturate(60%) contrast(100%) brightness(100%)",
      opacity: "1",
    },
    "100%": {
      filter: "saturate(100%) contrast(100%) brightness(100%)",
      opacity: "1",
    },
  },
})

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
  const { root, image, icons } = useStyles({
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
      <Container disableGutters className={icons}>
        {loading ? <CircularProgress size={56} thickness={6} /> : null}
        {error ? (
          <SvgIcon fontSize="large" color="error">
            <BrokenImageTwoToneIcon />
          </SvgIcon>
        ) : null}
      </Container>
      <ImageResizer
        handleResize={handleResize}
        imageContainer={imageContainerReference.current}
      />
    </Container>
  )
}

export default Image
