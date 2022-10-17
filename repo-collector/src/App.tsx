import {useEffect, useState} from 'react';
import { DOMMessage, ReposMessageResponse } from "./types";
import { ThemeProvider } from '@mui/system';
import theme from './theme';
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
        (response: ReposMessageResponse) => {setRepoUrls(response);});
    });

    // call handler if url changes
    chrome.tabs.onUpdated.addListener(handlePageChange);

    // call handler if new tab was activated
    // chrome.tabs.onActivated.addListener(({ tabId }) => {
    //   chrome.tabs.get(tabId, handlePageChange);
    // });
  }, [])

  const handlePageChange = async (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    // prevent accessing chrome specific urls
    if (tab.url && (tab.url.includes('chrome://') || tab.url.includes('chrome-extension://'))) {
      return;
    }

    console.log(tab.status);


    chrome.tabs.sendMessage(
      // Current tab ID
      tabId || 0,
      // Message type
      { type: 'GET_DOM' } as DOMMessage,
      // Callback executed when the content script sends a response
      (response: ReposMessageResponse) => {setRepoUrls(response);}
    );


      // ---------- Local Storage - How to ----------
      // chrome.storage.local.set({processingTabId: tab.id});
      // ----------
      // const result = await chrome.storage.local.get(tab.id.toString())
      //   .then((result) => {return result})
      //   .catch((rejectReason) => {
      //     return null;
      //   });


      // if (tab.id.toString() === processingTabId) {
      //   return;
      // }

      updateBadge(removeTab, tabId);
  }

  const updateBadge = (deleteProcessingTabId: Function, tabId: number) => {
    deleteProcessingTabId(tabId);
    // chrome.scripting.executeScript({
    //   target: { tabId: tabId },
    //   func: () => {
    //     console.log('executed scripting function');
    //     console.log(Array.from(document.querySelectorAll('a')));
    //     chrome.action.setBadgeText({ text: 'red' });
    //   },
    // });
  }

  const removeTab = () => {
    // TODO
    // delete tab id property at the end when all done
    // setProcessingTabId(0);
  }

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
          { repoUrls && <> Repos on page: <b>{repoUrls.length}</b> </> }
        </Typography>
        <QueryClientProvider client={queryClient}>
          <Repositories repoUrls={repoUrls}/>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Box>
    </ThemeProvider>
  );
}