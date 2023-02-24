import styled from "styled-components";
import { ButtonOuter } from "../button";

//Use this for ModalSignMessageWrapper
export const ConnectWalletMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const PleaseSignMessageButton = styled(ButtonOuter)`
  width: 90%;
`;
export const InnerModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
export const ModalSignMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const FormWrapper = styled.div`
  width: 85%;
`;
