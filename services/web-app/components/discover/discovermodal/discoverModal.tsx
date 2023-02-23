import { useQuery } from "@apollo/client";
import { Modal } from "../../modal";
import { discoverUser } from "../../../querys/internal";
import { UsersList } from "./usersList";
import { DiscoverModalTop } from "./discoverModalTop";
import { PageButtons } from "./pageButtons";
import type { DiscoverModalProps } from "./types";
import { InnerDiscoverModalWrapper } from "./styles";

export const DiscoverModal = ({ toggleShowModal }: DiscoverModalProps) => {
  return (
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
  );
};

const InnerDiscoverModal = ({}) => {
  const { loading, error, data, refetch } = useQuery(discoverUser, {
    variables: {},
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
  });

  if (data?.discoverUsers.__typename === "QueryDiscoverUsersSuccess") {
    return (
      <InnerDiscoverModalWrapper>
        <DiscoverModalTop />
        <UsersList data={data.discoverUsers} />
        <PageButtons />
      </InnerDiscoverModalWrapper>
    );
  } else if (loading) {
    return <p>Loading....</p>;
  } else {
    return <p>error</p>;
  }
};
