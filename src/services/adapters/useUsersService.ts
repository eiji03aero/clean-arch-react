import * as React from 'react';

import { UsersService } from '@/application/ports';

import * as usersApis from '@/services/apis/users';

export function useUsersService(): UsersService {
  const findAll = React.useCallback(() => {
    return usersApis.findAll();
  }, []);

  const findById = React.useCallback((id: UniqueId) => {
    return usersApis.findById(id);
  }, []);

  return React.useMemo(
    () => ({
      findAll,
      findById,
    }),
    [findAll, findById],
  );
}
