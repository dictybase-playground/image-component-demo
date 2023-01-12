import { useState } from "react"
import { makeStyles, Theme } from "@material-ui/core"

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

const useStyles = makeStyles<Theme, StyleProperties>({
  root: {
    height: ({ height }) => height,
    width: ({ width }) => width,
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
  },
  "@keyframes materialize": {
    "0%": {
      filter: "saturate(20%) contrast(50%) brightness(160%)",
    },
    "75%": {
      filter: "saturate(60%) contrast(100%) brightness(100%)",
    },
    "100%": {
      filter: "saturate(100%) contrast(100%) brightness(100%)",
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
