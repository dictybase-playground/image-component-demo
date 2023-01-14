import BrokenImageTwoToneIcon from "@material-ui/icons/BrokenImageTwoTone"
import { SvgIcon } from "@material-ui/core"

const ErrorDisplay = ({ icons }: { icons: string }) => (
  <div className={icons}>
    <SvgIcon fontSize="large" color="error">
      <BrokenImageTwoToneIcon />
    </SvgIcon>
  </div>
)

export default ErrorDisplay
