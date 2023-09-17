import * as React from 'react';

import { UserProjectService } from '@/application/ports';

import * as userProjectApis from '@/services/apis/user-project';

export function useUserProjectService(): UserProjectService {
  const registerUsers = React.useCallback(
    (params: { projectId: number; assigneeIds: number[] }) => {
      return userProjectApis.registerUsers(params);
    },
    [],
  );

  return React.useMemo(
    () => ({
      registerUsers,
    }),
    [registerUsers],
  );
}
