import { useState } from "react"
import { makeStyles, SvgIcon, Theme } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import BrokenImageTwoToneIcon from "@material-ui/icons/BrokenImageTwoTone"

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
  loading: boolean
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
      opacity: 0,
    },
    "75%": {
      filter: "saturate(60%) contrast(100%) brightness(100%)",
      opacity: 1,
    },
    "100%": {
      filter: "saturate(100%) contrast(100%) brightness(100%)",
      opacity: 1,
    },
  },
})

const LoadingDisplay = ({ icons }: { icons: string }) => (
  <div className={icons}>
    <CircularProgress size={56} thickness={6} />
  </div>
)

const ErrorDisplay = ({ icons }: { icons: string }) => (
  <div className={icons}>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </div>
)

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
  const { root, image, icons } = useStyles({
    height,
    width,
    fit,
    easing,
    duration,
    loading,
  })
  return (
    <div className={root}>
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
    </div>
  )
}

export default Image
