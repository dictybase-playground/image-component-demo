import { useState } from "react"
import Image from "./Image"

type ImageComponentProperties = {
  src: string
  alt?: string
  initialHeight: number
  initialWidth: number
  fit: string
  duration: number
  easing: string
}

const ImageComponent = ({
  src,
  alt,
  initialHeight,
  initialWidth,
  fit,
  easing,
  duration,
}: ImageComponentProperties) => {
  const [height, setHeight] = useState(initialHeight)
  const [width, setWidth] = useState(initialWidth)

  const onResize = (dWidth: number = 0, dHeight: number = 0) => {
    setWidth(width + dWidth)
    setHeight(height + dHeight)
  }

  return (
    <Image
      src={src}
      alt={alt}
      height={`${height}px`}
      width={`${width}px`}
      fit={fit}
      duration={duration}
      easing={easing}
      onResize={onResize}
    />
  )
}
// Positioning Resizer elements
// --Approach 1: Render Resizer element directly from Image as a child of the
//               container so it can be positioned relative to that.
// Controling when the Resizer elements appear on the Image
// Controling Lexical Image Node properties

export default ImageComponent
