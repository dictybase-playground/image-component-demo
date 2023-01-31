import { useRef, useEffect } from "react"
import { Container, Typography } from "@material-ui/core"
import Image from "./Image"

const handleDrag = (event: DragEvent) => {
  event.preventDefault()
}

const App = () => {
  const containerReference = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const containerElement = containerReference.current
    if (!containerElement) return
    containerElement.addEventListener("dragenter", handleDrag)
    containerElement.addEventListener("dragover", handleDrag)

    // eslint-disable-next-line consistent-return
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("dragenter", handleDrag)
        containerElement.removeEventListener("dragover", handleDrag)
      }
    }
  }, [])
  return (
    <Container ref={containerReference}>
      <Typography variant="h1"> Heading </Typography>
      <p>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus
          nisl nec tempor efficitur. In mattis nisi sed odio congue, id placerat
          metus sollicitudin. Nullam non lacus at risus cursus tincidunt ut
          ultricies lectus. Praesent convallis eros in libero euismod hendrerit.
          Morbi at dui in diam pretium convallis. Cras fermentum pharetra lorem,
          in ornare diam pretium id. Vestibulum sodales, libero sit amet
          molestie pretium, sapien libero vestibulum sem, eu iaculis nisl lectus
          quis mauris. Aliquam erat volutpat. Mauris eleifend, urna nec mollis
          imperdiet, mi magna mollis magna, nec finibus dui velit quis nisl.
          Phasellus at pellentesque augue, sit amet venenatis est.
        </Typography>
      </p>
      <p>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus
          nisl nec tempor efficitur. In mattis nisi sed odio congue, id placerat
          metus sollicitudin. Nullam non lacus at risus cursus tincidunt ut
          ultricies lectus. Praesent convallis eros in libero euismod hendrerit.
          Morbi at dui in diam pretium convallis. Cras fermentum pharetra lorem,
          in ornare diam pretium id. Vestibulum sodales, libero sit amet
          molestie pretium, sapien libero vestibulum sem, eu iaculis nisl lectus
          quis mauris. Aliquam erat volutpat. Mauris eleifend, urna nec mollis
          imperdiet, mi magna mollis magna, nec finibus dui velit quis nisl.
          Phasellus at pellentesque augue, sit amet venenatis est.
        </Typography>
      </p>
      <Image src="/src/assets/3.jpg" initialWidth={250} initialHeight={250} />
      <p>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus
          nisl nec tempor efficitur. In mattis nisi sed odio congue, id placerat
          metus sollicitudin. Nullam non lacus at risus cursus tincidunt ut
          ultricies lectus. Praesent convallis eros in libero euismod hendrerit.
          Morbi at dui in diam pretium convallis. Cras fermentum pharetra lorem,
          in ornare diam pretium id. Vestibulum sodales, libero sit amet
          molestie pretium, sapien libero vestibulum sem, eu iaculis nisl lectus
          quis mauris. Aliquam erat volutpat. Mauris eleifend, urna nec mollis
          imperdiet, mi magna mollis magna, nec finibus dui velit quis nisl.
          Phasellus at pellentesque augue, sit amet venenatis est.
        </Typography>
      </p>
    </Container>
  )
}

export default App
