import * as React from 'react';

import { UserTaskService } from '@/application/ports';

import * as userTaskApis from '@/services/apis/user-task';

export function useUserTaskService(): UserTaskService {
  const registerUsers = React.useCallback(
    (params: { taskId: number; assigneeIds: number[] }) => {
      return userTaskApis.registerUsers(params);
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
