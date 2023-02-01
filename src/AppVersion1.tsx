import { useState } from "react"
import { Container, Grid } from "@material-ui/core"
import DropContainer from "./DropContainer"
import useAppContainerStyles from "./useAppContainerStyles"
import useGridContainerStyles from "./useGridContainerStyles"
import { onDragStart, onDrop } from "./dragHandlers"
import Image from "./Image"

export type ContainerState = {
  dropContainerOne: JSX.Element[]
  dropContainerTwo: JSX.Element[]
}

const initialState: ContainerState = {
  dropContainerOne: [
    <Image
      src="/src/assets/3.jpg"
      initialWidth={250}
      initialHeight={250}
      onDragStart={onDragStart}
    />,
  ],
  dropContainerTwo: [],
}

const App = () => {
  const [containerState, setContainerState] = useState(initialState)
  const appClasses = useAppContainerStyles()
  const gridClasses = useGridContainerStyles()
  return (
    <Container className={appClasses.root}>
      <Grid
        className={gridClasses.root}
        container
        spacing={2}
        justifyContent="center"
        direction="row">
        <Grid item>
          <DropContainer>{containerState.dropContainerOne}</DropContainer>
        </Grid>
        <Grid item>
          <DropContainer>{containerState.dropContainerTwo}</DropContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
