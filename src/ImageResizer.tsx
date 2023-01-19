import React, { useRef } from "react"
import useResizerStyles from "./resizerStyles"

enum DIRECTION {
  north = 1,
  south = 1 << 1,
  east = 1 << 2,
  west = 1 << 3,
}

type ImageResizerProperties = {
  imageContainer: HTMLDivElement | null
  handleResize: (width: string, height: string) => void
}

const ImageResizer = ({
  handleResize,
  imageContainer,
}: ImageResizerProperties) => {
  const positionReference = useRef({
    initialY: 0,
    initialX: 0,
    direction: 0,
  })
  const { root, north, south, east, west, ne, nw, se, sw } = useResizerStyles()

  const onMouseMove = (event: MouseEvent) => {
    if (!imageContainer) return
    const position = positionReference.current
    const imageDimensions = imageContainer.getBoundingClientRect()
    const { width: imageWidth, height: imageHeight } = imageDimensions
    let dY = 0
    let dX = 0

    const isVertical = position.direction & (DIRECTION.north | DIRECTION.south)
    const isHorizontal = position.direction & (DIRECTION.east | DIRECTION.west)

    if (isVertical) {
      const currentY = event.clientY
      dY = currentY - position.initialY
      dY = position.direction & DIRECTION.south ? dY : -dY
      position.initialY = currentY
    }

    if (isHorizontal) {
      const currentX = event.clientX
      dX = currentX - position.initialX
      dX = position.direction & DIRECTION.east ? dX : -dX
      position.initialX = currentX

      // dY = isVertical ? dX / aspectRatio : dY
    }

    const newHeight = imageHeight + dY
    const newWidth = imageWidth + dX

    handleResize(`${newWidth}px`, `${newHeight}px`)
  }

  const onMouseUp = () => {
    const position = positionReference.current
    // use ts-belt tap?
    Object.keys(position).forEach((property) => {
      position[property as keyof typeof position] = 0
    })

    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }

  const onMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    direction: DIRECTION,
  ) => {
    const position = positionReference.current
    position.initialY = event.clientY
    position.initialX = event.clientX
    position.direction = direction

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  return (
    <>
      <div
        className={`${root} ${north}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.north)}
      />
      <div
        className={`${root} ${south}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.south)}
      />
      <div
        className={`${root} ${east}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.east)}
      />
      <div
        className={`${root} ${west}`}
        onMouseDown={(event) => onMouseDown(event, DIRECTION.west)}
      />
      <div
        className={`${root} ${ne}`}
        onMouseDown={(event) =>
          onMouseDown(event, DIRECTION.north | DIRECTION.east)
        }
      />
      <div
        className={`${root} ${nw}`}
        onMouseDown={(event) =>
          onMouseDown(event, DIRECTION.north | DIRECTION.west)
        }
      />
      <div
        className={`${root} ${se}`}
        onMouseDown={(event) =>
          onMouseDown(event, DIRECTION.south | DIRECTION.east)
        }
      />
      <div
        className={`${root} ${sw}`}
        onMouseDown={(event) =>
          onMouseDown(event, DIRECTION.south | DIRECTION.west)
        }
      />
    </>
  )
}

export default ImageResizer
