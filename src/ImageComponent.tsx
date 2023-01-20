import Image from "./Image"

type ImageComponentProperties = {
  src: string
  alt?: string
  initialHeight: string
  initialWidth: string
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
  const onResize = (width: string, height: string) => {
    //  Change Lexical Image Node Properties Here"
  }

  return (
    <Image
      src={src}
      alt={alt}
      height={initialHeight}
      width={initialWidth}
      fit={fit}
      duration={duration}
      easing={easing}
      onResize={onResize}
    />
  )
}
// Positioning Resizer elements
// Controling when the Resizer elements appear on the Image
// Controling Lexical Image Node properties

export default ImageComponent
