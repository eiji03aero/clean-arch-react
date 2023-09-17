import * as React from 'react';

import { useTasksService } from '@/services/adapters/useTasksService';

export function useRemoveTask() {
  const tasksService = useTasksService();

  const removeTask = React.useCallback(
    async (id: UniqueId) => {
      await tasksService.remove(id);
    },
    [tasksService],
  );

  return React.useMemo(
    () => ({
      removeTask,
    }),
    [removeTask],
  );
}
