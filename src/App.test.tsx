import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  afterEach(cleanup)

  it("renders a div as container element", () => {
    render(<App />)
    const container = screen.getByRole("generic")
    expect(container).toBeDefined()
  })
})
