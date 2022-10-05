import {useEffect, useState} from 'react';
import { DOMMessage, DOMMessageResponse } from "./types";
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import Repositories from  './components/Repositories/Repositories';
import Loading from './components/Loading/Loading';

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
  }, [])
  console.log('render');

  // set badge to number of repos found on page
  useEffect(() => {
    // only add badge when in production otherwise it will fail in dev
    if (process.env.NODE_ENV === 'production') {
      if(repoUrls){
        chrome.action.setBadgeText({text: repoUrls.length.toString()});
        chrome.action.setBadgeBackgroundColor({color: '#ff3737'});
      }
    }
  }, [repoUrls])


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{p: 3, display: 'inline-flex', flexDirection: 'column'}}>
        <Typography component='h1' variant='h4' sx={{mb: 3, fontWeight: 700, fontSize: '1.75rem', textAlign: 'center', color: 'primary.main'}}>
          Repo Collector
        </Typography>
        <Typography component='p' sx={{marginLeft: 1.5, color: 'rgba(255,255,255,0.5)'}}>
          Repos on page: <b>{repoUrls.length}</b>
        </Typography>
        <QueryClientProvider client={queryClient}>
          <Repositories repoUrls={repoUrls}/>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Box>
    </ThemeProvider>
  );
}
