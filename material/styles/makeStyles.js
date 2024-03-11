import _formatMuiErrorMessage from "my-mui/utils/formatMuiErrorMessage";
export default function makeStyles() {
  throw new Error(process.env.NODE_ENV !== "production" ? `MUI: makeStyles is no longer exported from my-mui/material/styles.
You have to import it from my-mui/styles.
See https://mui.com/r/migration-v4/#mui-material-styles for more details.` : _formatMuiErrorMessage(14));
}