import { describe, test, expect, vi, afterEach } from "vitest"
import { fireEvent, render, screen, cleanup } from "@testing-library/react"
import DraggableImage from "./Image"
import { onDragStart } from "./dragHandlers"

describe("Draggable Image", () => {
  afterEach(cleanup)

  test("renders a draggable element", async () => {
    render(<DraggableImage src="/src/assets/3.jpg" />)
    const draggableElement = await screen.findByTitle("draggable container")
    expect(draggableElement).toBeDefined()
    expect(draggableElement).toHaveProperty("draggable")
  })

  test("invokes onDragStart when the component is dragged", async () => {
    const spiedDragStartHandler = vi.fn(onDragStart)
    render(
      <DraggableImage
        src="/src/assets/3.jpg"
        onDragStart={spiedDragStartHandler}
      />,
    )

    const draggableElement = await screen.findByTitle("draggable container")

    fireEvent.dragStart(draggableElement)

    expect(spiedDragStartHandler).toHaveBeenCalled()
  })

  test.todo(
    "Even when the image is dragged, the drag target is the container, not the image itself",
    () => {},
  )
})
