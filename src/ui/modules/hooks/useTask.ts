import * as React from 'react';

import * as taskDmn from '@/domain/Task';
import { useTasksService } from '@/services/adapters/useTasksService';

type Params = {
  id: UniqueId;
};

export function useTask({ id }: Params) {
  const [task, setTask] = React.useState<taskDmn.Task | null>(null);
  const tasksService = useTasksService();

  const fetch = React.useCallback(async () => {
    const task = await tasksService.findById(id);
    setTask(task!);
  }, [id, tasksService]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    task,
    refetch: fetch,
  };
}
