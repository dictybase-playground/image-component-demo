import React, { useRef } from "react"
import { makeStyles } from "@material-ui/core"

// enum DIRECTION {
//   east = 1,
//   north = 1 << 3,
//   south = 1 << 1,
//   west = 1 << 2,
// }
enum DIRECTION {
  north = 1,
  south = 1 << 1,
  east = 1 << 2,
  west = 1 << 3,
}

const useStyles = makeStyles({
  root: {
    height: "6px",
    width: "6px",
    position: "absolute",
    backgroundColor: "rgb(60, 132, 244)",
    border: "1px solid #fff",
    zIndex: 3,
  },
  north: {
    marginLeft: "auto",
    marginRight: "auto",
    top: "-4px",
    cursor: "n-resize",
  },
  south: {
    marginLeft: "auto",
    marginRight: "auto",
    bottom: "-4px",
    cursor: "s-resize",
  },
  east: {
    marginTop: "auto",
    marginBottom: "auto",
    right: "-4px",
    cursor: "w-resize",
  },
  west: {
    marginTop: "auto",
    marginBottom: "auto",
    left: "-4px",
    cursor: "e-resize",
  },
  ne: {
    top: "-4px",
    right: "-4px",
    cursor: "ne-resize",
  },
  nw: {
    top: "-4px",
    left: "-4px",
    cursor: "nw-resize",
  },
  se: {
    bottom: "-4px",
    right: "-4px",
    cursor: "se-resize",
  },
  sw: {
    bottom: "-4px",
    left: "-4px",
    cursor: "sw-resize",
  },
})

type ImageResizerProperties = {
  // verbum's image resizer accepts an editor prop, but couldn't we just do useLexicalComposerContext?
  // actually maybe just have this component be editor agnostic for now? I
  // think the only reason verbum's uses the editor is to limit the size of the
  // image to the size of the editor. I'll ignore that for now
  onResize: (dWidth: number, dHeight: number) => void
}

const ImageResizer = ({ onResize }: ImageResizerProperties) => {
  const positionReference = useRef({
    initialY: 0,
    initialX: 0,
    direction: 0,
  })
  const { root, north, south, east, west, ne, nw, se, sw } = useStyles()

  const onMouseMove = (event: MouseEvent) => {
    const position = positionReference.current
    let dY = 0
    let dX = 0

    const isVertical = position.direction & (DIRECTION.north | DIRECTION.south)
    const isHorizontal = position.direction & (DIRECTION.east | DIRECTION.west)

    if (isVertical) {
      const currentY = event.clientY
      dY = currentY - position.initialY
      dY = position.direction & DIRECTION.south ? dY : -dY
    }

    if (isHorizontal) {
      const currentX = event.clientX
      dX = currentX - position.initialX
      dX = position.direction & DIRECTION.east ? dX : -dX
    }

    onResize(dX, dY)
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
