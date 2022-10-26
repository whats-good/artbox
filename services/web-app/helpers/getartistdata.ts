
interface ArtistData {
  name: String,
  desc: String,
  wallet: String,
  contracts?: String[],
}

// Temporary to mimic backend response
export async function getArtistData(artist: string | string[] | undefined) : Promise<ArtistData> {
  return {
    name: 'Logan Larkin',
    desc: 'This is my cool art collection, check it out!',
    wallet: '0x5D0f971BCDd15A222A7776d0171225ccfE5EEadE',
    contracts: ['0x49623cAEc21B1fF5D04d7Bf7B71531369a69bCe4', '0x7D70D50A8E9D1B4F04F5a2fA2e46078DA9EBB467']
  }
}