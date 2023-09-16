import * as React from 'react';
import { Box, Stack, Text, Heading } from '@chakra-ui/react';

import { useLogin } from '@/application/usecases/useLogin';
import { useUsers } from '@/services/queries/useUsers';
import { UserCard } from '@/ui/views/Login/components/UserCard';

export function LoginView() {
  const { users } = useUsers();
  const { login } = useLogin();

  const handleLogin = React.useCallback(
    async (id: UniqueId) => {
      await login(id);
    },
    [login],
  );

  return (
    <Box p={4}>
      <Heading as="h1">Login</Heading>
      <Text>Choose the account to login with</Text>

      <Stack spacing={4}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onLogin={handleLogin} />
        ))}
      </Stack>
    </Box>
  );
}
