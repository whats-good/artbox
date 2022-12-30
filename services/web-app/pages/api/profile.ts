// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number,
  username: string,
  collections?: string[],
  bio?: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    id: 123,
    username: "0xLogan",
    collections: [
      "0x713ce7dE2296c1d48b61d5662fd381DEDfcB01bD",
      "0x7D70D50A8E9D1B4F04F5a2fA2e46078DA9EBB467",
      "0x49623cAEc21B1fF5D04d7Bf7B71531369a69bCe4",
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    ],
    bio: "Hello, Im logan. I make Art. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  })
}
