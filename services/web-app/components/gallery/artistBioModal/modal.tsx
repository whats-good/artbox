import styled from "styled-components";
import { Dispatch, SetStateAction } from 'react';
import Draggable from 'react-draggable';
import { ButtonOuter, ButtonInner } from "../../button";

type ModalProps = {
  children?: JSX.Element;
  title: string;
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}
type ModalTopBarProps = {
  title: string;
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}

const ModalWrapper = styled.div`
  height: 600px;
  width: 450px;
  background-color: #BFBFBF;
  display: grid;
  grid-template-rows: 20px 575px;
  outline: 1px solid #7B7B7B;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  border-top: 1px solid white;
  border-left: 1px solid white;
`
const ModalTopBarWrapper = styled.div`
  display: flex;
  background-color: #008080;
  padding: 3px;
  justify-content: space-between;
`
const ModalTitle = styled.p`
  align-self: center;
  color: white;
`
const ModelExitButtonWrapper = styled(ButtonOuter)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14px;
  width: 18px;
`
const ModelExitButton = styled(ButtonInner)`
  padding: 0px;
  height: 14px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalTopBar = ({ title, toggleShowModal } : ModalTopBarProps) => {
  return (
    <ModalTopBarWrapper className="draggable">
      <ModalTitle>{title}</ModalTitle>
      <ModelExitButtonWrapper>
        <ModelExitButton onClick={() => {toggleShowModal(false)}}>x</ModelExitButton>
      </ModelExitButtonWrapper>
    </ModalTopBarWrapper>
  )
}

export const Modal = ({ children, title, toggleShowModal } : ModalProps) => {
  return (
    <Draggable handle=".draggable">
      <ModalWrapper>
        <ModalTopBar
          title={title}
          toggleShowModal={toggleShowModal}
        />
        {children}
      </ModalWrapper>
    </Draggable>
  )
}