import * as React from 'react';

import * as userDmn from '@/domain/User';
import { useUsersService } from '@/services/adapters/useUsersService';

export function useUsers() {
  const [users, setUsers] = React.useState<userDmn.User[]>([]);
  const usersService = useUsersService();

  React.useEffect(() => {
    const handler = async () => {
      const users = await usersService.findAll();
      setUsers(users);
    };

    handler();
  }, [usersService]);

  return {
    users,
  };
}
