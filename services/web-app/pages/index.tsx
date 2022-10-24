import type { NextPage } from 'next'
import { TopBar } from '../components/topbar';
import { SignUpModal } from '../components/signupmodal';


const Home: NextPage = () => {
  return (
    <>
    <TopBar />
    <SignUpModal />
  </>
  )
}

export default Home
