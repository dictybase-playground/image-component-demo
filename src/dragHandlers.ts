import { DragEvent } from "react"

export const onDragStart = (event: DragEvent) => {
  const { dataTransfer } = event
  if (!dataTransfer) return
  dataTransfer.effectAllowed = "move"

  // 1: Get reference to the image container
  const { currentTarget } = event

  // 2: Get outerHTML string
  if (!currentTarget) return
  const { outerHTML } = currentTarget
  // 3: Use the dataTransfer API to store outer HTML data
  dataTransfer.setData("text/html", outerHTML)
}

export const onDrop = (event: DragEvent) => {}

/*
    [x] Define DragStart handler
        [x] Represent relevant data as string 
            [x] Capture data in event.dataTransfer
    [x] Attach DragStart handler to draggable element

    [] Define DragEnd handler
        [] 
    [] Attach DragEnd handler to draggable element

    [] Define onDrop handler

    [x] Attach onDrop handler to drop target

    [] Make App container a valid drop target, so drop event will fire.
        [] Attach dragenter and dragover listeners
    

    

*/
