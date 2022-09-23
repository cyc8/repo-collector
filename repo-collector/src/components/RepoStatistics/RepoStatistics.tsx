import Box from "@mui/material/Box";
import { ActiveInfo } from "../ActiveInfo/ActiveInfo";
import { MetricBox } from "../MetricBox/MetricBox";

interface RepoStatisticsProps {
  forks: number,
  watchers: number,
  stars: number,
  lastCommit: string,
  published: string,
}

export function RepoStatistics ({forks, watchers, stars, lastCommit, published}: RepoStatisticsProps) {
  return(
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <MetricBox count={stars} type='stars'/>
        <MetricBox count={forks} type='forks'/>
        <MetricBox count={watchers} type='watchers'/>
      </Box>

      <ActiveInfo lastCommit={lastCommit} published={published} />
    </>
  )
}