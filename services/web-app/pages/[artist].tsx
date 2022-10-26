import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArtistPageWrapper } from '../components/styled/artistpage';
import { BlueBar } from '../components/styled/artistpage';
import { ArtistGallery } from '../components/artistgallery';
import { getArtistData } from '../helpers/getartistdata';
import { PageWrapper } from '../components/styled/pagewrapper';
import { TopBar } from '../components/topbar';
import '@react95/icons/icons.css';
import { ShortenedAddress } from '../components/shortenedaddress';

const Artist: NextPage = () => {
  const [description, setDescription] = useState<String>('');
  const [name, setName] = useState<String>('');
  const [contracts, setContracts] = useState<String[] | undefined>();

  const router = useRouter();
  const { artist } = router.query;

  async function fetchUserData() {
    try {
      const userData = await getArtistData(artist);
      setDescription(userData.desc);
      setName(userData.name);
      setContracts(userData.contracts);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserData();
    }, [artist]);

  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        {contracts ? <ArtistGallery contracts={contracts} description={description} name={name}/> : <p>Sorry nothing here...</p> }
      </ArtistPageWrapper>
    </PageWrapper>
  )
};

export default Artist;