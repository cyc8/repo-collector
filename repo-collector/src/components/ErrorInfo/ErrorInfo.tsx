import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HelpIcon from '@mui/icons-material/Help';
import {AxiosError} from 'axios';

interface ErrorInfoProps {
  error: AxiosError<{message: string}>
}

export function ErrorInfo ({error}:ErrorInfoProps)  {
  const checkApiLimitExceeded = () => {
    // endpoint for rate limit: https://api.github.com/rate_limit
    const limitExceededMessage = /^API rate limit exceeded/
    const message = error.response?.data.message;
    return message ? limitExceededMessage.test(message) : false;
  }
  
  let infoTooltip = ""
  if(checkApiLimitExceeded()){
    infoTooltip = "Unfortunately, we can't show you more info because you've reached the API request limit of 60/hour."
  } else {
    infoTooltip = "Sorry, an unexpected error occurred and we couldn't request more info about this repo."
  }

  return(
    <Box sx={{display: 'flex', mb: 2, borderRadius: 1}}>
      <Typography>API Limit reached</Typography>
      <Tooltip arrow title={infoTooltip}>
        <HelpIcon fontSize='small' sx={{opacity: 0.8, ml: 1}}/>
      </Tooltip>
    </Box>
  )
}