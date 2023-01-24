import React, { useRef } from "react"

export type Direction = "north" | "south" | "east" | "west"

type MouseMoveHandlerCreator = (
  initialValues: {
    initialX: number
    initialY: number
    initialWidth: number
    initialHeight: number
  },
  handleResize: (width: number, height: number) => void,
) => (event: MouseEvent) => void

export const createNorthMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialY, initialHeight, initialWidth } = initialValues
    const finalY = event.clientY

    handleResize(initialWidth, initialHeight - (finalY - initialY))
  }

export const createSouthMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialY, initialHeight, initialWidth } = initialValues
    const finalY = event.clientY

    handleResize(initialWidth, initialHeight + finalY - initialY)
  }

export const createEastMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialX, initialHeight, initialWidth } = initialValues
    const finalX = event.clientX

    handleResize(initialWidth + finalX - initialX, initialHeight)
  }

export const createWestMoveHandler: MouseMoveHandlerCreator =
  (initialValues, handleResize) => (event) => {
    const { initialX, initialHeight, initialWidth } = initialValues
    const finalX = event.clientX

    handleResize(initialWidth - (finalX - initialX), initialHeight)
  }

/**
 * A React hook that returns a mousedown event handler used to resize elements
 *
 * @category Hooks
 * @param handleResize a callback function used to set the new dimensions of the parent element.
 * @param imageContainer a reference to the parent container
 * @returns an event handler for mousedown events
 */
const useResize = (
  imageContainer: HTMLDivElement,
  handleResize: (width: number, height: number) => void,
) => {
  const moveHandlerReference = useRef<{
    handler: ((event: MouseEvent) => void) | null | undefined
  }>({ handler: null })
  const initialValuesReference = useRef({
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
  })

  const directionToHandler = new Map<Direction, MouseMoveHandlerCreator>([
    ["north", createNorthMoveHandler],
    ["south", createSouthMoveHandler],
    ["east", createEastMoveHandler],
    ["west", createWestMoveHandler],
  ])

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

    const mouseMoveHandlerCreator = directionToHandler.get(direction)
    if (!mouseMoveHandlerCreator) return

    const mouseMoveHandler = mouseMoveHandlerCreator(
      initialValuesReference.current,
      handleResize,
    )
    moveHandlerReference.current.handler = mouseMoveHandler
    document.addEventListener("mousemove", mouseMoveHandler)
    document.addEventListener("mouseup", onMouseUp, { once: true })
  }

  return {
    onMouseDown,
  }
}

export default useResize
