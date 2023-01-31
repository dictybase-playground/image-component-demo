import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import Image from "./Image"
import { onDragStart } from "./dragHandlers"

describe("Image", () => {
  it("renders an img element", () => {
    render(
      <Image src="/src/assets/3.jpg" initialWidth={250} initialHeight={250} />,
    )
    const imageElement = screen.findByRole("img")
    expect(imageElement).toBeDefined()
  })

  it("invokes onDragStart when the image is dragged", async () => {
    const spiedDragStartHandler = vi.fn(onDragStart)
    render(
      <Image src="/src/assets/3.jpg" initialWidth={250} initialHeight={250} />,
    )
    const imageElement = await screen.findByRole("img")
    fireEvent.dragStart(imageElement)

    expect(spiedDragStartHandler).toHaveBeenCalled()
  })
})
