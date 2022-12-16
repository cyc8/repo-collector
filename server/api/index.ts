import { NowRequest, NowResponse } from '@now/node';

export default function (request: NowRequest, response: NowResponse) {
  response.writeHead(302, {
    Location: 'https://github.com/cyc8/repo-collector',
  });
  response.end();
}
