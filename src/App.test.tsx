import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  afterEach(cleanup)

  it("renders a valid drop target", () => {
    render(<App />)
    const container = screen.getByTitle("Drop Area")
    expect(container).toBeDefined()
  })
})
