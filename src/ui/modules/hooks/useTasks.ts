import * as React from 'react';

import * as taskDmn from '@/domain/Task';
import { useTasksService } from '@/services/adapters/useTasksService';

export function useTasks() {
  const [tasks, setTasks] = React.useState<taskDmn.Task[]>([]);
  const tasksService = useTasksService();

  const fetch = React.useCallback(async () => {
    const tasks = await tasksService.findAll();
    setTasks(tasks);
  }, [tasksService]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    tasks,
    refetch: fetch,
  };
}
