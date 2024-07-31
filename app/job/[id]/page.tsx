'use client';

import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GlobalStateContext } from '@/context/GlobalStateContext';

export default function JobPage({ params }: { params: { id: string } }) {
  const {
    state: { jobs },
    dispatch,
  } = useContext(GlobalStateContext);
  const [modalOpened, { toggle: toggleModal, close: closeModal }] = useDisclosure();
  const { status } = useSession();
  const isUserLoggedIn = status === 'authenticated';

  const job = jobs?.find((j: IJob) => j.id === params.id);
  const applied = job?.applied;

  const handleClickApply = () => {
    if (isUserLoggedIn) {
      dispatch({ type: 'APPLY_FOR_JOB', data: { id: params.id } });
      toggleModal();
    } else {
      toggleModal();
    }
  };

  return (
    <>
      <Text size="xl" fw={700} mb="md">
        Job Details
      </Text>

      <Text fw={500} mb="xs">
        Job ID: <Text span>{job?.id}</Text>
      </Text>

      <Text fw={500} mb="xs">
        Company: <Text span>{job?.company}</Text>
      </Text>

      <Text fw={500} mb="xs">
        Title: <Text span>{job?.title}</Text>
      </Text>

      <Text fw={500} mb="xs">
        Description: <Text span>{job?.description}</Text>
      </Text>

      <Text fw={500} mb="xs">
        Address:{' '}
        {job?.address && (
          <Text span>
            {isUserLoggedIn && `${job?.address.street}, `} {job?.address.city},{' '}
            {job?.address.province}
            {isUserLoggedIn && `, ${job?.address.postalCode}`}
          </Text>
        )}
      </Text>
      <Button mt="md" onClick={handleClickApply} disabled={applied}>
        {applied ? 'Already Applied' : 'Apply Now'}
      </Button>
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={
          <Text size="xl" fw={700}>
            {isUserLoggedIn ? 'Application Successful' : 'Log In Required'}
          </Text>
        }
        centered
      >
        {isUserLoggedIn && applied ? (
          <Text>
            You’ve applied to {job?.company} to work as a {job?.title}.
          </Text>
        ) : (
          <Text>Please log in to apply for this job.</Text>
        )}
      </Modal>
    </>
  );
}
