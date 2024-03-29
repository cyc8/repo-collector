import './App.css';
import {useEffect, useState} from 'react';
import { DOMMessage, ReposMessageResponse } from "./types";
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import Box from '@mui/material/Box';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Result from './Result';
import Header from './Header';
import Loading from './components/Loading/Loading';



const queryClient = new QueryClient();

export default function App() {
  const [gitUrls, setGitUrls] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false); 
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
          setGitUrls(response.gitUrls);
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
      <Box sx={{py: 1.5, display: 'inline-flex', flexDirection: 'column' }}>
        <Header reposCount={gitUrls.length}/>
        <QueryClientProvider client={queryClient}>
          {/* Show tiles when loading finished, otherwise the nothing found screen */}
        <Box sx={{px: 2}}>
          { loading ?  
          <Box sx={{height: '346px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loading />
          </Box>
          :
          <Result gitUrls={gitUrls} disabled={disabled}/> }
        </Box>

        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Box>
    </ThemeProvider>
  );
}