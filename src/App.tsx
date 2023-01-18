import { ChangeEvent, useState } from "react"
import {
  TextField,
  Container,
  Button,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  Drawer,
} from "@material-ui/core"
import ImageComponent from "./ImageComponent"

const DEFAULT_IMAGE = 1
const HEIGHT = "100%"
const WIDTH = "100%"
const DURATION = 2000
const EASING = "cubic-bezier(0.7, 0, 0.6, 1)"
const FIT = "cover"

const Demo = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [useLocal, setUseLocal] = useState(true)
  const [currentPhoto, setCurrentPhoto] = useState(DEFAULT_IMAGE)
  const [showPhoto, setShowPhoto] = useState(true)
  const [height, setHeight] = useState(HEIGHT)
  const [width, setWidth] = useState(WIDTH)
  const [duration, setDuration] = useState(DURATION)
  const [easing, setEasing] = useState(EASING)
  const [fit, setFit] = useState(FIT)
  const [mobileOpen, setMobileOpen] = useState(false)
  const imageUrl = useLocal
    ? `src/assets/${currentPhoto}.jpg`
    : `https://picsum.photos/id/${currentPhoto}/2000`

  const getNewPhoto = () => {
    if (mobileOpen) setMobileOpen(false)
    const newPhoto = useLocal
      ? (currentPhoto + 1) % 4
      : Math.floor(Math.random() * 1051)
    setShowPhoto(false)
    setCurrentPhoto(newPhoto)
    setTimeout(() => {
      setShowPhoto(true)
    }, 100)
  }

  const refreshPhoto = () => {
    if (mobileOpen) setMobileOpen(false)
    setShowPhoto(false)
    setTimeout(() => {
      setShowPhoto(true)
    }, 100)
  }

  const resetDefaults = () => {
    setHeight(HEIGHT)
    setWidth(WIDTH)
    setDuration(DURATION)
    setEasing(EASING)
    setFit(FIT)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUseLocal(event.target.checked)
    setCurrentPhoto(1)
    refreshPhoto()
  }

  return (
    <Container style={{ width: "90vw", height: "80vh" }}>
      <Button onClick={() => setIsDrawerOpen(true)}> Props </Button>
      <Drawer
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        ModalProps={{ BackdropProps: { invisible: true } }}>
        <TextField
          size="small"
          label="duration (ms)"
          value={duration}
          onChange={(event) =>
            setDuration(Number.parseInt(event.target.value, 10) || 0)
          }
        />
        <FormControl>
          <InputLabel htmlFor="fit-select">fit</InputLabel>
          <Select
            id="fit-select"
            value={fit}
            onChange={(event) => setFit(event.target.value as string)}>
            <MenuItem value="fill">fill</MenuItem>
            <MenuItem value="contain">contain</MenuItem>
            <MenuItem value="cover">cover</MenuItem>
            <MenuItem value="none">none</MenuItem>
            <MenuItem value="scale-down">scale-down</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="easing-select">easing</InputLabel>
          <Select
            id="easing-select"
            value={easing}
            onChange={(event) => setEasing(event.target.value as string)}>
            <MenuItem value="cubic-bezier(0.7, 0, 0.6, 1)">
              cubic-bezier
            </MenuItem>
            <MenuItem value="ease">ease</MenuItem>
            <MenuItem value="ease-in">ease-in</MenuItem>
            <MenuItem value="ease-out">ease-out</MenuItem>
            <MenuItem value="ease-in-out">ease-in-out</MenuItem>
            <MenuItem value="linear">linear</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={getNewPhoto}> New </Button>
        <Button onClick={refreshPhoto}> Refresh </Button>
        <Button onClick={resetDefaults}> Reset </Button>
        <FormControl>
          <FormControlLabel
            value="Local?"
            label="Local?"
            labelPlacement="top"
            control={
              <Checkbox
                id="use-local-select"
                checked={useLocal}
                size="small"
                onChange={handleChange}
              />
            }
          />
        </FormControl>
      </Drawer>
      {showPhoto ? (
        <ImageComponent
          src={imageUrl}
          initialWidth={width}
          initialHeight={height}
          duration={duration}
          easing={easing}
          fit={fit}
        />
      ) : null}
    </Container>
  )
}

export default Demo
