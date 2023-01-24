import useResizerStyles from "./resizerStyles"
import useResize, { Direction } from "./useResize"

const directions: Direction[] = ["north", "south", "east", "west"]

type ImageResizerProperties = {
  imageContainer: HTMLDivElement
  handleResize: (width: string, height: string) => void
}

const ImageResizer = ({
  handleResize,
  imageContainer,
}: ImageResizerProperties) => {
  const classes = useResizerStyles()
  const { onMouseDown } = useResize(imageContainer, handleResize)
  return (
    <>
      {directions.map((direction) => (
        <div
          key={direction}
          className={`${classes.root} ${classes[direction]}`}
          onMouseDown={(event) => onMouseDown(event, direction)}
        />
      ))}
    </>
  )
}

export default ImageResizer
