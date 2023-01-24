import React, { useRef } from "react"
// Why use different mouse event types ?

export type Direction = "north" | "south" | "east" | "west"

const useResize = (
  imageContainer: HTMLDivElement,
  handleResize: (width: number, height: number) => void,
) => {
  const moveHandlerReference = useRef<{
    handler: null | ((event: MouseEvent) => void)
  }>({ handler: null })
  const initialValuesReference = useRef({
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
  })

  const handleNorthMove = (event: MouseEvent) => {
    const { initialY, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalY = event.clientY

    handleResize(initialWidth, initialHeight - (finalY - initialY))
  }

  const handleSouthMove = (event: MouseEvent) => {
    const { initialY, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalY = event.clientY

    handleResize(initialWidth, initialHeight + finalY - initialY)
  }

  const handleEastMove = (event: MouseEvent) => {
    const { initialX, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalX = event.clientX

    handleResize(initialWidth + finalX - initialX, initialHeight)
  }

  const handleWestMove = (event: MouseEvent) => {
    const { initialX, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalX = event.clientX

    handleResize(initialWidth - (finalX - initialX), initialHeight)
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
    direction: Direction,
  ) => {
    event.preventDefault()
    const { width: initialWidth, height: initialHeight } =
      imageContainer.getBoundingClientRect()

    initialValuesReference.current.initialY = event.clientY
    initialValuesReference.current.initialX = event.clientX
    initialValuesReference.current.initialWidth = initialWidth
    initialValuesReference.current.initialHeight = initialHeight

    moveHandlerReference.current.handler = directionToHandler[direction]

    document.addEventListener("mousemove", directionToHandler[direction])
    document.addEventListener("mouseup", onMouseUp, { once: true })
  }

  return {
    onMouseDown,
  }
}

export default useResize
