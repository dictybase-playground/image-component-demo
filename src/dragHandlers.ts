import { DragEvent } from "react"

export const onDragStart = (event: DragEvent<HTMLImageElement>) => {
  const { dataTransfer } = event
  if (!dataTransfer) return

  // 1: Get reference to the image container
  const { currentTarget: image } = event
  // 2: Get the parent container
  const { parentElement: container } = image
  // 3: Get outerHTML string
  if (!container) return
  const { outerHTML } = container
  // 4: Use the dataTransfer API to store outer HTML data
  dataTransfer.setData("text/html", outerHTML)
  console.log(outerHTML)
}

console.log(onDragStart)

export const onDrop = (event: DragEvent) => {}
