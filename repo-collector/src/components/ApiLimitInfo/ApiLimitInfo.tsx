import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import HelpIcon from '@mui/icons-material/Help';

export function ApiLimitInfo ()  {
  return(
    <>
      <Typography>API Limit reached</Typography>
      <Tooltip arrow title="Unfortunately, we can't show you more info because you've reached the API request limit of 60/hour.">
        <HelpIcon fontSize='small' sx={{opacity: 0.8}}/>
      </Tooltip>
    </>
  )
}