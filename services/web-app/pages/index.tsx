import type { NextPage } from "next";
import { useRef } from 'react';
import Draggable from "react-draggable";
import { TopBar } from "../components/connectwallet/topbar";
// import { SignUpModal } from "../components/signupmodal/signupmodal";


const Home: NextPage = () => {
  const nodeRef = useRef(null);
  return (
    <>
      <Draggable>
        <div className="draggable">
          <TopBar />
        </div>
      </Draggable>
    </>
  );
};

export default Home;
