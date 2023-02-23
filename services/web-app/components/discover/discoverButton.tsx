import { ButtonInner, ButtonOuter } from "../button";
import { DiscoverButtonProps } from "./types";

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
