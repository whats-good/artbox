import { useState } from "react";
import { useMutation } from "@apollo/client";
import { StyledForm, StyledLabel } from "../../../signUp/signUpModal/styles";
import { DescriptionTextArea, ButtonMessageWrapper, Message } from "./styles";
import { editUser } from "../../../../querys/internal";
import { ButtonInner, ButtonOuter } from "../../../button";
import type { EditDescriptionProps } from "./types";

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
