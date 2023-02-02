import { useState } from "react"
import { Container, Grid } from "@material-ui/core"
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import DropContainer from "./DropContainer"
import Draggable from "./Draggable"
import Image from "./Image"
import useAppContainerStyles from "./useAppContainerStyles"
import useGridContainerStyles from "./useGridContainerStyles"

const dropIds = ["1", "2"]

const App = () => {
  const [parentId, setParentId] = useState<UniqueIdentifier>("1")
  const appClasses = useAppContainerStyles()
  const gridClasses = useGridContainerStyles()

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event
    setParentId((previousId) => (over ? over.id : previousId))
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Container className={appClasses.root}>
        <Grid
          className={gridClasses.root}
          container
          spacing={2}
          justifyContent="center"
          direction="row">
          {dropIds.map((dropId) => (
            <Grid key={dropId} item>
              <DropContainer dropId={dropId}>
                {dropId === parentId ? (
                  <Draggable id="draggable-id">
                    <Image src="src/assets/2.jpg" />
                  </Draggable>
                ) : (
                  []
                )}
              </DropContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
    </DndContext>
  )
}

export default App
