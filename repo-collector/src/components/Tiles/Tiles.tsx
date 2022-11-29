import TileContainer from './TileContainer';
import { getGitHoster } from '../../utils/generalUtils'
import GitHubTiles from './GitHubTiles';

interface TilesProps {
  gitUrls: string[]
}

export default function Tiles ({gitUrls}: TilesProps) {
  // identify git hosters
  const gitHosterObjects = gitUrls.map((gitUrl) => {
    return {gitUrl: gitUrl, gitHoster: getGitHoster(gitUrl)}
  })

  const githubObjects = gitHosterObjects.filter((gitHosterObject) => {return gitHosterObject.gitHoster === 'GitHub'})
  const gitlabObjects = gitHosterObjects.filter((gitHosterObject) => {return gitHosterObject.gitHoster === 'GitLab'})
  const bitbucketObjects = gitHosterObjects.filter((gitHosterObject) => {return gitHosterObject.gitHoster === 'Bitbucket'})
  
  // create GitLab and Bitbucket tiles
  let gitlabTiles = null;
  let bitbucketTiles = null;
  if(gitlabObjects.length > 0){
    gitlabTiles = gitlabObjects.map((gitlabObject) => { 
      return <TileContainer url={gitlabObject.gitUrl} gitHoster={gitlabObject.gitHoster}/>
     })
  }
  if(bitbucketObjects.length > 0){
    bitbucketTiles = bitbucketObjects.map((bitbucketObject) => { 
      return <TileContainer url={bitbucketObject.gitUrl} gitHoster={bitbucketObject.gitHoster}/>
     })
  }

  return (
    <>
      {/* all gitlab links  */}
      { gitlabTiles }

      {/* all bitbucket links  */}
      { bitbucketTiles }

      {/* all github repositories  */}
      <GitHubTiles githubObjects={githubObjects}/>
    </>
  )
}