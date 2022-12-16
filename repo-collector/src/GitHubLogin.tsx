import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import axios, {AxiosError} from 'axios';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { GitHubToken } from './utils/githubUtils';

export default function GitHubLogin(){
  const [githubToken, setGithubToken] = useState('');

  const clientId = 'Iv1.9eda46a664f46182';
  const redirect_uri = 'chrome-extension://hkkaekdbljlnbedcammdgckgckcnkcol/index.html';
  const state = (Math.random() + 1).toString(36).substring(2);


  // const handleButtonClick = () => {
  //   refetch();
  // }

  // const {data, refetch} = useQuery({
  //   queryKey: ['githubCode'],
  //   queryFn: () => {
  //     axios.get(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&state=${state}`)
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled: false // disable this query from automatically running
  // })

  // `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&state=${state}`
  

  return(
    <Button href={GitHubToken.getOAuthLink()} target="_blank" rel="noreferrer" size='small' variant='outlined' startIcon={<GitHubIcon />}>
      Login
    </Button>
  )
}
