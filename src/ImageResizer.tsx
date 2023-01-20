import React, { useRef } from "react"
import useResizerStyles from "./resizerStyles"

enum DIRECTION {
  NORTH = "north",
  SOUTH = "south",
  EAST = "east",
  WEST = "west",
}

type ImageResizerProperties = {
  imageContainer: HTMLDivElement | null
  handleResize: (width: string, height: string) => void
}

const ImageResizer = ({
  handleResize,
  imageContainer,
}: ImageResizerProperties) => {
  const moveHandlerReference = useRef<{
    handler: null | ((event: MouseEvent) => void)
  }>({ handler: null })
  const initialValuesReference = useRef({
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
  })
  const { root, north, south, east, west } = useResizerStyles()

  const handleNorthMove = (event: MouseEvent) => {
    const { initialY, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalY = event.clientY

    handleResize(
      `${initialWidth}px`,
      `${initialHeight - (finalY - initialY)}px`,
    )
  }

  const handleSouthMove = (event: MouseEvent) => {
    const { initialY, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalY = event.clientY

    handleResize(`${initialWidth}px`, `${initialHeight + finalY - initialY}px`)
  }

  const handleEastMove = (event: MouseEvent) => {
    const { initialX, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalX = event.clientX

    handleResize(`${initialWidth + finalX - initialX}px`, `${initialHeight}px`)
  }

  const handleWestMove = (event: MouseEvent) => {
    const { initialX, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalX = event.clientX

    handleResize(
      `${initialWidth - (finalX - initialX)}px`,
      `${initialHeight}px`,
    )
  }

  const directionToHandler = {
    north: handleNorthMove,
    south: handleSouthMove,
    east: handleEastMove,
    west: handleWestMove,
  }

  const onMouseUp = () => {
    if (!moveHandlerReference.current.handler) return
    document.removeEventListener(
      "mousemove",
      moveHandlerReference.current.handler,
    )
  }

  const onMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    direction: DIRECTION,
  ) => {
    if (!imageContainer) return
    const initialValues = initialValuesReference.current
    const { width: initialWidth, height: initialHeight } =
      imageContainer.getBoundingClientRect()

    initialValues.initialY = event.clientY
    initialValues.initialX = event.clientX
    initialValues.initialWidth = initialWidth
    initialValues.initialHeight = initialHeight

    moveHandlerReference.current.handler = directionToHandler[direction]

    document.addEventListener("mousemove", directionToHandler[direction])
    document.addEventListener("mouseup", onMouseUp, { once: true })
  }

  return (
    <>
      <div
        className={`${root} ${north}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.NORTH)}
      />
      <div
        className={`${root} ${south}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.SOUTH)}
      />
      <div
        className={`${root} ${east}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.EAST)}
      />
      <div
        className={`${root} ${west}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.WEST)}
      />
    </>
  )
}

export default ImageResizer
