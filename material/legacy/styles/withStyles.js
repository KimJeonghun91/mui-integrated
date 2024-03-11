import _formatMuiErrorMessage from "my-mui/utils/formatMuiErrorMessage";
export default function withStyles() {
  throw new Error(process.env.NODE_ENV !== "production" ? "MUI: withStyles is no longer exported from my-mui/material/styles.\nYou have to import it from my-mui/styles.\nSee https://mui.com/r/migration-v4/#mui-material-styles for more details." : _formatMuiErrorMessage(15));
}