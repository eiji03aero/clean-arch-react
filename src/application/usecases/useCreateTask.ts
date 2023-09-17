import * as React from 'react';

import * as taskDmn from '@/domain/Task';
import { useTasksService } from '@/services/adapters/useTasksService';
import { useUserTaskService } from '@/services/adapters/useUserTaskService';

export function useCreateTask() {
  const tasksService = useTasksService();
  const userTaskService = useUserTaskService();

  const createTask = React.useCallback(
    async (params: {
      task: taskDmn.CreateTaskParams;
      assigneeIds: number[];
    }) => {
      const task = taskDmn.createTask(params.task);
      const id = await tasksService.create(task);

      await userTaskService.registerUsers({
        taskId: id,
        assigneeIds: params.assigneeIds,
      });
    },
    [tasksService, userTaskService],
  );

  return React.useMemo(
    () => ({
      createTask,
    }),
    [createTask],
  );
}
