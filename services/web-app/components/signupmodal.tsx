import { useState } from 'react';
import { Modal, Button, Input } from '@react95/core';
import { SignupForm, SignupWrapper, InputDescription } from './styled/signupmodalstyled';
import { ShortenedAddress } from './shortenedaddress';

export const SignUpModal = () => {
const [showModal, toggleShowModal] = useState<Boolean>(true);

const handleOpenModal = () => toggleShowModal(true);
const handleCloseModal = () => toggleShowModal(false);
const handleButtonClick = (e: React.MouseEvent<HTMLLIElement>) => {
  alert(e.currentTarget.value);
}

return (
    <>
      <Button onClick={handleOpenModal}>Trigger Modal</Button>
      {showModal && (
        <Modal
          width="450"
          height="600"
          title="Create Profile"
          defaultPosition={{
            x: 40,
            y: 20,
          }}
          closeModal={handleCloseModal}>
        <InsideModal />
        </Modal>

      )}
    </>
  );
};

const InsideModal = () => {

  return (
    <SignupWrapper>
      <ShortenedAddress />
      <p>Create Profile: </p>
      <SignupForm>
        <label htmlFor="name">Set Name</label>
        <Input id="name" />
        <InputDescription>Input Your Artist Name</InputDescription>
        <label htmlFor="desc">Set Description</label>
        <Input id="desc" />
        <label htmlFor="collections">Add Collections</label>
        <Input id="collections" />
      </SignupForm>
    </SignupWrapper>
  )
}