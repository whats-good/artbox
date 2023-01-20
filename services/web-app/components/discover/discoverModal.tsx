import { Modal } from "../../components/modal";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@apollo/client";
import { discoverUser } from "../../querys/internal";

type DiscoverModalProps = {
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}

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
    <>{data?.discoverUsers.__typename === "QueryDiscoverUsersSuccess" ?
      data.discoverUsers.data.map((contract) => contract.username)
    :<></>}</>
  )
}