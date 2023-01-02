export const parseIpfs = (url : string) => {
  return "https://ipfs.io" + url.slice(6);
}