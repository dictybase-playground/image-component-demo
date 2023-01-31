import { describe, test, expect, vi, afterEach } from "vitest"
import { fireEvent, render, screen, cleanup } from "@testing-library/react"
import Image from "./Image"
import { onDragStart } from "./dragHandlers"

describe("Image", () => {
  afterEach(cleanup)

  test("renders an img element", () => {
    render(
      <Image src="/src/assets/3.jpg" initialWidth={250} initialHeight={250} />,
    )
    const imageElement = screen.findByRole("img")
    expect(imageElement).toBeDefined()
  })

  test("invokes onDragStart when the image is dragged", async () => {
    const spiedDragStartHandler = vi.fn(onDragStart)
    render(
      <Image
        src="/src/assets/3.jpg"
        onDragStart={spiedDragStartHandler}
        initialWidth={250}
        initialHeight={250}
      />,
    )

    const imageElement = await screen.findByRole("img")

    fireEvent.dragStart(imageElement)

    expect(spiedDragStartHandler).toHaveBeenCalled()
  })
})
