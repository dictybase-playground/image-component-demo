import { ChangeEvent, useState } from "react"
import {
  TextField,
  Container,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  Toolbar,
} from "@material-ui/core"
import Image from "./Image"

const DEFAULT_IMAGE = 1
const HEIGHT = "100%"
const WIDTH = "100%"
const DURATION = 2000
const EASING = "cubic-bezier(0.7, 0, 0.6, 1)"
const FIT = "contain"

const Demo = () => {
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
      ? currentPhoto + 1
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
      <Toolbar style={{ gap: "8px" }}>
        <InputLabel htmlFor="use-local-select">Use local image</InputLabel>
        <FormControl>
          <Checkbox
            id="use-local-select"
            checked={useLocal}
            size="small"
            onChange={handleChange}
          />
        </FormControl>
        <TextField
          size="small"
          label="height"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
        <TextField
          size="small"
          label="width"
          value={width}
          onChange={(event) => setWidth(event.target.value)}
        />
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
      </Toolbar>
      {showPhoto ? (
        <Image
          src={imageUrl}
          width={width}
          height={height}
          duration={duration}
          easing={easing}
          fit={fit}
        />
      ) : null}
    </Container>
  )
}

export default Demo
