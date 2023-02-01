import { useRef, useEffect } from "react"
import { Container, Typography } from "@material-ui/core"
import DropContainer from "./DropContainer"
import { onDragStart, onDrop } from "./dragHandlers"
import DraggableImage from "./DraggableImage"

const App = () => (
  <DropContainer>
    <Typography variant="h1"> Heading </Typography>
    <Typography variant="body1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus nisl
      nec tempor efficitur. In mattis nisi sed odio congue, id placerat metus
      sollicitudin. Nullam non lacus at risus cursus tincidunt ut ultricies
      lectus. Praesent convallis eros in libero euismod hendrerit. Morbi at dui
      in diam pretium convallis. Cras fermentum pharetra lorem, in ornare diam
      pretium id. Vestibulum sodales, libero sit amet molestie pretium, sapien
      libero vestibulum sem, eu iaculis nisl lectus quis mauris. Aliquam erat
      volutpat. Mauris eleifend, urna nec mollis imperdiet, mi magna mollis
      magna, nec finibus dui velit quis nisl. Phasellus at pellentesque augue,
      sit amet venenatis est.
    </Typography>
    <br />
    <DraggableImage
      src="/src/assets/3.jpg"
      initialWidth={250}
      initialHeight={250}
      onDragStart={onDragStart}
    />
    <br />
    <Typography variant="body1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus nisl
      nec tempor efficitur. In mattis nisi sed odio congue, id placerat metus
      sollicitudin. Nullam non lacus at risus cursus tincidunt ut ultricies
      lectus. Praesent convallis eros in libero euismod hendrerit. Morbi at dui
      in diam pretium convallis. Cras fermentum pharetra lorem, in ornare diam
      pretium id. Vestibulum sodales, libero sit amet molestie pretium, sapien
      libero vestibulum sem, eu iaculis nisl lectus quis mauris. Aliquam erat
      volutpat. Mauris eleifend, urna nec mollis imperdiet, mi magna mollis
      magna, nec finibus dui velit quis nisl. Phasellus at pellentesque augue,
      sit amet venenatis est.
    </Typography>
    <br />
    <Typography variant="body1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus nisl
      nec tempor efficitur. In mattis nisi sed odio congue, id placerat metus
      sollicitudin. Nullam non lacus at risus cursus tincidunt ut ultricies
      lectus. Praesent convallis eros in libero euismod hendrerit. Morbi at dui
      in diam pretium convallis. Cras fermentum pharetra lorem, in ornare diam
      pretium id. Vestibulum sodales, libero sit amet molestie pretium, sapien
      libero vestibulum sem, eu iaculis nisl lectus quis mauris. Aliquam erat
      volutpat. Mauris eleifend, urna nec mollis imperdiet, mi magna mollis
      magna, nec finibus dui velit quis nisl. Phasellus at pellentesque augue,
      sit amet venenatis est.
    </Typography>
  </DropContainer>
)

export default App
