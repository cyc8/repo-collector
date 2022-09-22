import {useEffect, useState} from 'react';
import { DOMMessage, DOMMessageResponse } from "./types";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import Repositories from  './components/Repositories/Repositories';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  const [repoUrls, setRepoUrls] = useState<string[]>([]);

  useEffect(() => {   
    chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(
        // Current tab ID
        tab.id || 0,

        // Message type
        { type: 'GET_DOM' } as DOMMessage,

        // Callback executed when the content script sends a response
        (response: DOMMessageResponse) => {
          setRepoUrls(response);
      });
    });

    console.log(repoUrls)
  },[])
  
  if(!repoUrls){
    return <Typography>Is Loading...</Typography>
  }

  return (
      <Box sx={{p: 3, display: 'inline-flex', flexDirection: 'column'}}>
        <Typography component='h1' variant='h4' sx={{mb: 3, fontWeight: 700, fontSize: '1.75rem', textAlign: 'center'}}>
          Repo Collector
        </Typography>
        <Typography component='p' sx={{marginLeft: 1.5, color: 'rgba(255,255,255,0.5)'}}>
          Repos on page: <b>{repoUrls.length}</b>
        </Typography>
        <QueryClientProvider client={queryClient}>
          <Repositories repoUrls={repoUrls}/>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        {repoUrls && <Typography> {repoUrls} </Typography>}
      </Box>
  );
}
