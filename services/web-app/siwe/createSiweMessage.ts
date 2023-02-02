import { SiweMessage } from "siwe";

export const createSiweMessage = async (
  address: string,
  statement: string,
  domain: string,
  origin: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/nonce`, {
    credentials: "include",
  });
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce: await res.text(),
  });
  return message.prepareMessage();
};
