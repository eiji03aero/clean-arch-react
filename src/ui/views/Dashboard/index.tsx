import { Box, Heading } from '@chakra-ui/react';

import { useSessionStorage } from '@/services/adapters/useSessionStorage';

import { CurrentUserCard } from '@/ui/views/Dashboard/components/CurrentUserCard';

export function DashboardView() {
  const { currentUser } = useSessionStorage();

  return (
    <Box p={4}>
      <Heading as="h1">Dashboard</Heading>

      {currentUser && <CurrentUserCard user={currentUser} />}
    </Box>
  );
}
