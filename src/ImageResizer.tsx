import React, { useRef } from "react"
import useResizerStyles from "./resizerStyles"

type ImageResizerProperties = {
  imageContainer: HTMLDivElement | null
  handleResize: (width: string, height: string) => void
}

const ImageResizer = ({
  handleResize,
  imageContainer,
}: ImageResizerProperties) => {
  const initialValuesReference = useRef({
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
  })
  const { root, se } = useResizerStyles()

  const onMouseMove = (event: MouseEvent) => {
    const { initialY, initialX, initialHeight, initialWidth } =
      initialValuesReference.current
    const finalX = event.clientX
    const finalY = event.clientY
    handleResize(
      `${initialWidth + finalX - initialX}px`,
      `${initialHeight + finalY - initialY}px`,
    )
  }

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove)
  }

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainer) return
    const initialValues = initialValuesReference.current
    const { width: initialWidth, height: initialHeight } =
      imageContainer.getBoundingClientRect()

    // Set initial values
    initialValues.initialY = event.clientY
    initialValues.initialX = event.clientX
    initialValues.initialWidth = initialWidth
    initialValues.initialHeight = initialHeight

    // set Active mousemove handler
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp, { once: true })
  }

  return <div className={`${root} ${se}`} onMouseDown={onMouseDown} />
}

export default ImageResizer
