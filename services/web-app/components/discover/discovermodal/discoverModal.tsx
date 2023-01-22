import styled from "styled-components";
import { Modal } from "../../modal";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@apollo/client";
import { discoverUser } from "../../../querys/internal";
import { UsersList } from "./usersList"
import { DiscoverModalTop } from './discoverModalTop';

//Types
type DiscoverModalProps = {
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}

//Styles
const InnerDiscoverModalWrapper = styled.div`
  display: grid;
  grid-template-rows: 20% auto;
`

export const DiscoverModal = ({ toggleShowModal } : DiscoverModalProps) => {

  return (
    <>
      <Modal
        toggleShowModal={toggleShowModal}
        title="Discover"
        height="300px"
        width="400px"
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

  const { loading, error, data, refetch, networkStatus } = useQuery(
    discoverUser,
    {
      variables: {},
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading) return (
    <p>Loading....</p>
  );
  if (error) return (
    <p>Error</p>
  );

  return (
    <InnerDiscoverModalWrapper>
        <DiscoverModalTop />
        <UsersList data={data}/>
    </InnerDiscoverModalWrapper>
  )
}