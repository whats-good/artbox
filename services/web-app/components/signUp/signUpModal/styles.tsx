import styled from "styled-components";
import { ButtonOuter } from "../../button";

export const InsideSignUpModalWrapper = styled.div`
  height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const SubmitButton = styled(ButtonOuter)`
  align-self: flex-end;
  width: 25%;
`;
export const CreateProfileWrapper = styled.div`
  width: 85%;
`;
export const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid black;
  background-color: #ebebeb;
  height: 150px;
`;
export const StyledInput = styled.input`
  height: 20px;
  margin-bottom: 8px;
  border: 1px solid black;
  background-color: #ebebeb;
  width: 100%;
`;
export const StyledLabel = styled.label`
  width: 100%;
`;
export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;
export const ShowCollectionsWrapper = styled.div`
  width: 388px;
  background-color: #ebebeb;
  height: 80px;
  overflow-y: scroll;
  border: 1px solid black;
  margin: 10px 0px 0px 5px;
`;
export const CollectionDisplayWrapper = styled.div`
  justify-content: space-between;
  padding: 4px 4px;
  display: flex;
  border-bottom: 1px solid black;
`;
export const AddButton = styled(ButtonOuter)`
  align-self: flex-end;
  width: 25%;
  margin-right: -6px;
`;
export const AddCollectionInput = styled(StyledInput)`
  width: 100%;
`;
