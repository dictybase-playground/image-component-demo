import React from "react"

export const onDragStart = (event: React.DragEvent<HTMLImageElement>) => {
  const { dataTransfer } = event
  if (!dataTransfer) return
  dataTransfer.dropEffect = "move"

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

export const onDrop = (event: DragEvent) => {
  event.preventDefault()
  console.log("ondrop")
  console.log(window.getSelection())
}

/*
    [x] Define DragStart handler
        [x] Represent relevant data as string 
            [x] Capture  data in event.dataTransfer
    [x] Attach DragStart handler 

    [] Define onDrop handler
        [] Get mouse position relative to DOM hierarchy
            [] ???
        [] Move Image element to new position in DOM  
            [] Remove previous Image 
                [] Get previous Image
                [] removeChild()
            [] Append copy of Image at new position
    [x] Attach onDrop handler

    [] Make App container a valid drop target, so drop event will fire.
        [] Attach dragenter and dragover listeners
    

    

*/
