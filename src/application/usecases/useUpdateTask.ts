import * as React from 'react';

import * as taskDmn from '@/domain/Task';
import { useTasksService } from '@/services/adapters/useTasksService';
import { useUserTaskService } from '@/services/adapters/useUserTaskService';

export function useUpdateTask() {
  const tasksService = useTasksService();
  const userTaskService = useUserTaskService();

  const updateTask = React.useCallback(
    async (params: {
      id: UniqueId;
      task: taskDmn.CreateTaskParams;
      assigneeIds: number[];
    }) => {
      const task = await tasksService.findById(params.id);
      const updatedTask = taskDmn.updateTask(task!, params.task);
      await tasksService.update(updatedTask);

      await userTaskService.registerUsers({
        taskId: updatedTask.id,
        assigneeIds: params.assigneeIds,
      });
    },
    [tasksService, userTaskService],
  );

  return React.useMemo(
    () => ({
      updateTask,
    }),
    [updateTask],
  );
}
