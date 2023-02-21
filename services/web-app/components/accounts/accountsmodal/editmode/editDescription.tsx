import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@apollo/client";
import {
  StyledForm,
  StyledLabel,
} from "../../../signUp/signUpModal/commonStyles";
import { editUser } from "../../../../querys/internal";
import { ButtonInner, ButtonOuter } from "../../../button";

const DescriptionTextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid black;
  background-color: #ebebeb;
  height: 150px;
`;
type EditDescriptionProps = {
  description: string;
  username: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

export const EditDescription = ({
  username,
  description,
  setDescription,
}: EditDescriptionProps) => {
  const [mutateFunction, { data, loading, error }] = useMutation(editUser);

  return (
    <StyledForm
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await mutateFunction({
            variables: {
              username: username,
              description: description,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <StyledLabel>Description</StyledLabel>
      <DescriptionTextArea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <ButtonOuter>
        <ButtonInner type="submit">Submit</ButtonInner>
      </ButtonOuter>
    </StyledForm>
  );
};
