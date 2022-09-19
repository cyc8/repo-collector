import {useEffect, useState} from 'react';
import { DOMMessage, DOMMessageResponse } from "./types";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import { RepositoryTile } from './components/RepositoryTile/RepositoryTile';

function App() {
  const [repos, setRepos] = useState<string[]>([]);
  
  useEffect(() => {   
    chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(
        // Current tab ID
        tab.id || 0,
  
        // Message type
        { type: 'GET_DOM' } as DOMMessage,
  
        // Callback executed when the content script sends a response
        (response: DOMMessageResponse) => {
          setRepos(response);
      });
    });

    console.log(repos)
  },[])

  return (
    <Box sx={{p: 3}}>
      <Typography component='h1' variant='h4' sx={{mb: 3, fontWeight: 700, fontSize: '1.75rem', textAlign: 'center'}}>
        Repo Collector
      </Typography>
      <RepositoryTile repos={repos}/>
      {repos &&
      <Typography> {repos} </Typography>}
    </Box>
  );
}

export default App;
