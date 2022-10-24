import {useEffect, useState} from 'react';
import { DOMMessage, ReposMessageResponse } from "./types";
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import Tiles from  './components/Tiles/Tiles';
import Loading from './components/Loading/Loading';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  const [repoUrls, setRepoUrls] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(
        // Current tab ID
        tab.id || 0,

        // Message type
        { type: 'GET_DOM' } as DOMMessage,

        // Callback executed when the content script sends a response
        (response: ReposMessageResponse) => {
           setRepoUrls(response.repoUrls);
           setDisabled(response.disabled);
           setLoading(false);
      });
      if (chrome.runtime.lastError) {
        console.log('getActiveTab', chrome.runtime.lastError.message);
      }
    });
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{p: 3, display: 'inline-flex', flexDirection: 'column'}}>
        <Typography component='h1' variant='h4' sx={{mb: 3, fontWeight: 700, fontSize: '1.75rem', textAlign: 'center', color: 'primary.main'}}>
          Repo Collector
        </Typography>
        <Typography component='p' sx={{color: 'rgba(255,255,255,0.5)', mb: 1}}>
          { repoUrls.length !== 0 && <> Found on page: <b>{repoUrls.length}</b> </> }
        </Typography>
        <QueryClientProvider client={queryClient}>
          { loading && 
          <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
            <Loading />
          </Box> }
          {/* Show tiles when loading finished, otherwise the nothing found screen */}
          { (!loading && repoUrls.length !== 0)  ? 
            <Tiles githubUrls={repoUrls}/>
            :
            // show relevant text depending if website is github or no repos found
            <> { disabled ? 
             <Typography sx={{color: 'white', mt: 2}}>Disabled on GitHub</Typography>
             :
             <Typography sx={{color: 'white', mt: 2}}>No GitHub links found</Typography>
            }
            </>
          }
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Box>
    </ThemeProvider>
  );
}