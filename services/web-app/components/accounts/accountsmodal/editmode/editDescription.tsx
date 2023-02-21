import styled from "styled-components";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  StyledForm,
  StyledLabel,
} from "../../../signUp/signUpModal/commonStyles";
import { editUser } from "../../../../querys/internal";
import { ButtonInner, ButtonOuter } from "../../../button";

const DescriptionTextArea = styled.textarea`
  resize: none;
  width: 98.5%;
  border: 1px solid black;
  background-color: #ebebeb;
  height: 150px;
  margin-bottom: 8px;
`;
const ButtonMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;
const Message = styled.p`
  margin: 0px 5px 0px 0px;
  padding: 0px;
`;

type EditDescriptionProps = {
  description: string;
  username: string;
  descriptionEditMode: boolean;
  setDescription: Dispatch<SetStateAction<string>>;
  setDescriptionEditMode: Dispatch<SetStateAction<boolean>>;
};

export const EditDescription = ({
  username,
  description,
  setDescription,
  descriptionEditMode,
  setDescriptionEditMode,
}: EditDescriptionProps) => {
  const [mutateFunction, { data, loading, error }] = useMutation(editUser);
  const [message, setMessage] = useState<string>("");
  return (
    <StyledForm
      onSubmit={async (e) => {
        e.preventDefault();
        if (!descriptionEditMode) {
          setDescriptionEditMode(true);
        } else {
          try {
            await mutateFunction({
              variables: {
                username: username,
                description: description,
              },
            });
            setMessage("Successfully changed description");
            setDescriptionEditMode(false);
          } catch (e) {
            setMessage("Unsuccessful");
            console.log(e);
          }
        }
      }}
    >
      <StyledLabel htmlFor="description">Description:</StyledLabel>
      <DescriptionTextArea
        id="description"
        readOnly={!descriptionEditMode}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <ButtonMessageWrapper>
        <Message>{message}</Message>
        <ButtonOuter>
          <ButtonInner type="submit">
            {descriptionEditMode ? "Submit" : "Edit"}
          </ButtonInner>
        </ButtonOuter>
      </ButtonMessageWrapper>
    </StyledForm>
  );
};
