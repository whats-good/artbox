import type { NextPage } from "next";
import { TopBar } from "../components/connectwallet/topbar";
import { SignUpModal } from "../components/signupmodal/signupmodal";

const Home: NextPage = () => {
  return (
    <>
      <TopBar />
      <SignUpModal />
    </>
  );
};

export default Home;
