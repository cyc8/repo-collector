export type DOMMessage = {
  type: 'GET_DOM'
}

export type DOMMessageResponse = {
  repos: string[];
}