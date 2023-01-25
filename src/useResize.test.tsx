import { describe, it, vi, test, expect, expectTypeOf, afterEach } from "vitest"
import {
  createNorthMoveHandler,
  createSouthMoveHandler,
  createEastMoveHandler,
  createWestMoveHandler,
} from "./useResize"

const initialValues = {
  initialX: 0,
  initialY: 0,
  initialWidth: 100,
  initialHeight: 100,
}

const handleResize = (width: number, height: number) => ({ width, height })

describe("createNorthMoveHandler", () => {
  let handleNorthMove
  const getResize = vi.fn(handleResize)
  afterEach(() => {
    vi.clearAllMocks()
  })

  // eslint-disable-next-line sonarjs/no-duplicate-string
  it("creates a function", () => {
    handleNorthMove = createNorthMoveHandler(initialValues, getResize)
    expectTypeOf(handleNorthMove).toBeFunction()
  })
  test("given a clientY value LESS than initialY, getResize should return a height GREATER than initialHeight", () => {
    handleNorthMove = createNorthMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: 0, clientY: -50 }

    handleNorthMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 100, height: 150 })
  })
  test("given a clientY value GREATER than initialY, getResize should return a height LESS than initialHeight", () => {
    handleNorthMove = createNorthMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: 0, clientY: 50 }

    handleNorthMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 100, height: 50 })
  })
})

describe("createSouthMoveHandler", () => {
  let handleSouthMove
  const getResize = vi.fn(handleResize)
  afterEach(() => {
    vi.clearAllMocks()
  })

  it("creates a function", () => {
    handleSouthMove = createSouthMoveHandler(initialValues, getResize)
    expectTypeOf(handleSouthMove).toBeFunction()
  })
  test("given a clientY value LESS than initialY, getResize should return a height LESS than initialHeight", () => {
    handleSouthMove = createSouthMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: 0, clientY: -50 }

    handleSouthMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 100, height: 50 })
  })
  test("given a clientY value GREATER than initialY, getResize should return a height GREATER than initialHeight", () => {
    handleSouthMove = createSouthMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: 0, clientY: 50 }

    handleSouthMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 100, height: 150 })
  })
})

describe("createEastMoveHandler", () => {
  let handleEastMove
  const getResize = vi.fn(handleResize)
  afterEach(() => {
    vi.clearAllMocks()
  })

  it("creates a function", () => {
    handleEastMove = createEastMoveHandler(initialValues, getResize)
    expectTypeOf(handleEastMove).toBeFunction()
  })
  test("given a clientX value LESS than initialX, getResize should return a height LESS than initialHeight", () => {
    handleEastMove = createEastMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: -50, clientY: 0 }

    handleEastMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 50, height: 100 })
  })
  test("given a clientX value GREATER than initialX, getResize should return a height GREATER than initialHeight", () => {
    handleEastMove = createEastMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: 50, clientY: 0 }

    handleEastMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 150, height: 100 })
  })
})

describe("createWestMoveHandler", () => {
  let handleWestMove
  const getResize = vi.fn(handleResize)
  afterEach(() => {
    vi.clearAllMocks()
  })

  it("creates a function", () => {
    handleWestMove = createWestMoveHandler(initialValues, getResize)
    expectTypeOf(handleWestMove).toBeFunction()
  })
  test("given a clientX value LESS than initialX, getResize should return a height GREATER than initialHeight", () => {
    handleWestMove = createWestMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: -50, clientY: 0 }

    handleWestMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 150, height: 100 })
  })
  test("given a clientX value GREATER than initialX, getResize should return a height LESS than initialHeight", () => {
    handleWestMove = createWestMoveHandler(initialValues, getResize)
    const mockMouseMove: unknown = { clientX: 50, clientY: 0 }

    handleWestMove(mockMouseMove as MouseEvent)
    expect(getResize).toHaveBeenCalledOnce()
    expect(getResize).toHaveReturnedWith({ width: 50, height: 100 })
  })
})
