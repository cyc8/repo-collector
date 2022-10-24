export type DOMMessage = {
  type: 'GET_DOM';
};

export type ReposMessageResponse = {
  disabled: boolean;
  repoUrls: string[];
};
