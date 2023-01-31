export const onDrag = (event: DragEvent) => {
  // 1: Get reference to the image container
  const image = event.target as HTMLImageElement
  // 2: Get the parent container
  const container = image?.parentElement
  // 3: Use the dataTransfer API to store a reference to the DOM element
  console.log(container?.innerHTML)
}

export const onDrop = () => {}
