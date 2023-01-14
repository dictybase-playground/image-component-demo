import CircularProgress from "@material-ui/core/CircularProgress"

const LoadingDisplay = ({ icons }: { icons: string }) => (
  <div className={icons}>
    <CircularProgress size={56} thickness={6} />
  </div>
)

export default LoadingDisplay
