import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    backgroundColor: "blue",
  },
})

type CircleProperties = {
  source: string
}

const Circle = ({ source }) => {
  const { root } = useStyles()

  const drawCircle = () => {}

  return (
    <>
      <clipPath id="circle">
        <circle cx="100" cy="100" r="50" />
      </clipPath>
      <img
        alt="circular image"
        src={source}
        width="500px"
        height="500px"
        clipPath="url(#circle)"
      />
    </>
  )
}

export default Circle
