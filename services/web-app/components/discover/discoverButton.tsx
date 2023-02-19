import { Dispatch, SetStateAction } from "react";
import { ButtonInner, ButtonOuter } from "../button";

type DiscoverButton = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};

export const DiscoverButton = ({
  toggleShowModal,
  showModal,
}: DiscoverButton) => {
  return (
    <ButtonOuter>
      <ButtonInner onClick={() => toggleShowModal(!showModal)}>
        Discover
      </ButtonInner>
    </ButtonOuter>
  );
};
