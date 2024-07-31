'use client';

import { Button, Group, Modal, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt } from '@tabler/icons-react';
import { authenticate } from '@/lib/actions';

function LogInModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async () => {
    const values = form.getValues();
    await authenticate(values);
    window.location.reload();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Login" centered>
      <form>
        <TextInput
          withAsterisk
          label="Username"
          placeholder="Username"
          leftSection={<IconAt size={16} />}
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={handleSubmit}>Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default LogInModal;
