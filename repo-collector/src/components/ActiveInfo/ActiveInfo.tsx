import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ActiveInfoProps {
  lastCommit: string,
  published: string,
}

export const ActiveInfo = ({lastCommit, published}: ActiveInfoProps) => {
  // example date format: 2022-10-28T12:31:42Z
  
  const checkToday = (date: string) => {
    const formattedDate = date.slice(0,10);
    const today = new Date().toISOString().slice(0,10);
    if(today === formattedDate){
      return 'today 🔥';
    } else {
      return null;
    }
  }

  const formatDate = (date: string) => {
    const year = date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    //remove possible leading zero
    if(day[0] === '0') day = day[1];

    // return today when date is today
    const isToday = checkToday(date);
    if(isToday){
      return isToday
    }

    switch(month){
      case '01':
        month = 'Jan';
        break;
      case '02':
        month = 'Feb';
        break;
      case '03':
        month = 'Mar';
        break;
      case '04':
        month = 'Apr';
        break;
      case '05':
        month = 'May';
        break;
      case '06':
        month = 'Jun';
        break;
      case '07':
        month = 'Jul';
        break;
      case '08':
        month = 'Aug';
        break;
      case '09':
        month = 'Sep';
        break;
      case '10':
        month = 'Oct';
        break;
      case '11':
        month = 'Nov';
        break;
      case '12':
        month = 'Dec';
        break;
    }
    return [day, month, year].join(' ');
  }

  const publishedFormatted = formatDate(published);
  const lastCommitFormatted = formatDate(lastCommit);

  return(
    <Box sx={{mt: 1, mb: 1}}>

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>Last Commit: </Box>
        {lastCommitFormatted}
      </Typography> 

      <Typography variant='body1' component='p'>
        <Box component='span' sx={{fontWeight: 500}}>First Published: </Box>
        {publishedFormatted}
      </Typography> 

    </Box>
  )
}