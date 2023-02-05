import { createSiweMessage } from "./createSiweMessage";

export const signInWithEthereum = async (
  address: string,
  signer: any,
  domain: string,
  origin: string
) => {
  const message = await createSiweMessage(
    address,
    "Sign in with Ethereum to the app.",
    domain,
    origin
  );

  const signature = await signer.signMessage(message);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, signature }),
    credentials: "include",
  });
  return res;
};
