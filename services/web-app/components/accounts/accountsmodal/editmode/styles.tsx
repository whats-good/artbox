import styled from "styled-components";
import { StyledInput } from "../../../signUp/signUpModal/commonStyles";
import { ButtonOuter } from "../../../button";

export const AddButton = styled(ButtonOuter)`
  align-self: flex-end;
  width: 25%;
`;
export const AddCollectionInput = styled(StyledInput)`
  width: 98.5%;
`;
export const ButtonMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;
export const Message = styled.p`
  margin: 0px 5px 0px 0px;
  padding: 0px;
`;
export const DescriptionTextArea = styled.textarea`
  resize: none;
  width: 98.5%;
  border: 1px solid black;
  background-color: #ebebeb;
  height: 150px;
  margin-bottom: 8px;
`;
export const EditAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;
export const UsernameText = styled.p`
  align-self: flex-start;
`;
export const ShowCollectionsWrapper = styled.div`
  width: 100%;
  background-color: #ebebeb;
  height: 85px;
  overflow-y: scroll;
  border: 1px solid black;
  margin-top: 10px;
`;
export const CollectionDisplayWrapper = styled.div`
  justify-content: space-between;
  padding: 4px 4px;
  display: flex;
  border-bottom: 1px solid black;
`;
