import { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueries } from "@tanstack/react-query";
import RepositoryTile from '../RepositoryTile/RepositoryTile';
import { DOMMessageResponse } from '../../types';
import Typography from '@mui/material/Typography';

interface RepositoriesProps {
  repoUrls: DOMMessageResponse
}

export default function Repositories ({repoUrls}: RepositoriesProps) {
  const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
    axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data)
  );

  const githubUrls = [
    'https://github.com/charlax/professional-programming',
    'https://github.com/30-seconds/30-seconds-of-code',
    'https://github.com/practical-tutorials/project-based-learning',
    'https://github.com/donnemartin/system-design-primer',
    'https://github.com/jwasham/coding-interview-university',
    'https://github.com/mtdvio/every-programmer-should-know',
    'https://github.com/kamranahmedse/developer-roadmap',
    'https://github.com/codecrafters-io/build-your-own-x'
  ]
  
  const createApiEndpoint = (url: string) => {
    // remove the "https://github.com" part
    let APIEndpoint = url.slice(18);
    APIEndpoint = 'https://api.github.com/repos' + APIEndpoint;
    return APIEndpoint
  }
  const githubApiUrls = githubUrls.map((githubUrl) => {
    return createApiEndpoint(githubUrl);
  })

  // queryKey: must be unique to query data and serializable
  // queryFn: function the query uses to request data
  // staleTime: tells you how fresh you data is, staleTime: Infinity --> marks that the data never get stale/old
  const reposData = useQueries({
    queries: githubApiUrls.map((repoUrl, index) => {
      return {
        queryKey: ['repositoryData', index],
        queryFn: () => axios.get(repoUrl)
            .then((res) => res.data),
        staleTime: Infinity
      }
    })
  })

  // watchers - subscribers_count
  // forks
  if(isLoading){
    return <Typography>Is loading...</Typography> ;
  }

  if(error){
    console.log(error);
    return <Typography>Sorry, an error occured</Typography>;
  }

  console.log(data);
  return (
    <>
       {/* {data.map((repo:any) => { return <RepositoryTile repoData={repo} />}) } */}
       {console.log(reposData)}
    </>
  );
}