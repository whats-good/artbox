import { Dispatch, SetStateAction } from "react";
import { ButtonInner, ButtonOuter } from "../button";

type DiscoverButtonProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};

export const DiscoverButton = ({
  toggleShowModal,
  showModal,
}: DiscoverButtonProps) => {
  return (
    <ButtonOuter>
      <ButtonInner onClick={() => toggleShowModal(!showModal)}>
        Discover
      </ButtonInner>
    </ButtonOuter>
  );
};
