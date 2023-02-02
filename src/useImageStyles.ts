import { makeStyles, Theme } from "@material-ui/core"
import { Transform } from "@dnd-kit/utilities"

export type StyleProperties = {
  loading: boolean
  error: boolean
  transform: Transform | null
}

const useImageStyles = makeStyles<Theme, StyleProperties>({
  root: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    transform: ({ transform }) => {
      if (!transform) return ""
      return `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
    },
  },
  image: {
    aspectRatio: "1",
    width: "100%",
    height: "100%",
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

export default useImageStyles
