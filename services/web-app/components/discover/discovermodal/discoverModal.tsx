import styled from "styled-components";
import { Modal } from "../../modal";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@apollo/client";
import { discoverUser } from "../../../querys/internal";
import { UsersList } from "./usersList"
import { DiscoverModalTop } from './discoverModalTop';
import { PageButtons } from "./pageButtons";

//Types
type DiscoverModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
}

//Styles
const InnerDiscoverModalWrapper = styled.div`
  display: grid;
  grid-template-rows: 8% auto 8%;
`

export const DiscoverModal = ({ toggleShowModal } : DiscoverModalProps) => {

  return (
    <>
      <Modal
        toggleShowModal={toggleShowModal}
        title="Discover"
        height="620px"
        width="555px"
        defaultPosition={{
          x: 40,
          y: 40,
        }}
      >
        <InnerDiscoverModal />
      </Modal>
    </>
  )
}

const InnerDiscoverModal = ({}) => {

  const { loading, error, data, refetch } = useQuery(
    discoverUser,
    {
      variables: {},
      notifyOnNetworkStatusChange: true,

    }
  );

  if (loading) return (
    <p>Loading....</p>
  );
  if (error) {
    console.log(error);
    return (
      <>
      <p>Error</p>
      </>
    );
  }

  return (
    <InnerDiscoverModalWrapper>
        <DiscoverModalTop />
        <UsersList data={data}/>
        <PageButtons />
    </InnerDiscoverModalWrapper>
  )
}