import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import HelpIcon from '@mui/icons-material/Help';

interface ErrorInfoProps {
  error: Error | null
}

export function ErrorInfo ({error}:ErrorInfoProps)  {
  console.log(error); //null when no error

  const checkApiLimitExceeded = () => {
    // endpoint for rate limit: https://api.github.com/rate_limit
    if(error){
      const limitExceededMessage = /^API rate limit exceeded/
      return limitExceededMessage.test(error.message)
    }
  }

  let infoTooltip = ""
  if(checkApiLimitExceeded()){
    infoTooltip = "Unfortunately, we can't show you more info because you've reached the API request limit of 60/hour."
  } else if(error) {
    infoTooltip = "Sorry, an unexpected error occurred and we couldn't request more info about this repo."
  }

  return(
    <>
      <Typography>API Limit reached</Typography>
      <Tooltip arrow title={infoTooltip}>
        <HelpIcon fontSize='small' sx={{opacity: 0.8}}/>
      </Tooltip>
    </>
  )
}