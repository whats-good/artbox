import axios from 'axios';
import { ethers, Contract } from 'ethers';

async function getUrl(con: any, count: any) {
  try {
    const result = await con.tokenURI([count]);
    const res = await axios.get(`https://factorytest.infura-ipfs.io/ipfs/${result.slice(7)}`);
    return {
      url: `https://factorytest.infura-ipfs.io/${res.data.image.slice(16)}`,
      attributes: res.data.attributes,
      name: res.data.name,
      description: res.data.description,
    }
  } catch(err) {
    console.log(err);
  }
}

export async function getImageUrls(address : string, abi : any, provider: ethers.providers.JsonRpcProvider | undefined, count: number = 1) : Promise<any> {
  let output: any = [];
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  try {
    const contract = new Contract(address, abi, provider);
    for (let i = 0; i < arr.length; i++) {
      let url = await getUrl(contract, count);
      output.push(url);
      count++;
    }
    return {
      results: output,
      count: count,
    };

  } catch(err) {
    console.log(err);
  }
}