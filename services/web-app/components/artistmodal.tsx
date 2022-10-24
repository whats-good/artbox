import { useState } from 'react';
import { Modal, List, Button } from '@react95/core';

export const ArtistModal = () => {
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
          width="1200"
          height="800"
          title="Browse"
          defaultPosition={{
            x: 0,
            y: 20,
          }}
          closeModal={handleCloseModal}
          buttons={[
            { value: 'Ok', onClick: handleButtonClick },
            { value: 'Cancel', onClick: handleButtonClick },
          ]}
          menu={[
            {
              name: 'File',
              list: (
                <List>
                  <List.Item onClick={handleCloseModal}>Exit</List.Item>
                </List>
              ),
            },
            {
              name: 'Edit',
              list: (
                <List>
                  <List.Item>Copy</List.Item>
                </List>
              ),
            },
          ]}
        />
      )}
    </>
  );
};