import * as React from 'react';

import * as taskDmn from '@/domain/Task';
import { TasksService } from '@/application/ports';
import * as tasksApis from '@/services/apis/tasks';

export function useTasksService(): TasksService {
  const findAll = React.useCallback(() => {
    return tasksApis.findAll();
  }, []);

  const findById = React.useCallback((id: UniqueId) => {
    return tasksApis.findById(id);
  }, []);

  const create = React.useCallback((task: taskDmn.Task) => {
    return tasksApis.create(task);
  }, []);

  const update = React.useCallback((task: taskDmn.Task) => {
    return tasksApis.update(task);
  }, []);

  const remove = React.useCallback((id: UniqueId) => {
    return tasksApis.remove(id);
  }, []);

  return React.useMemo(
    () => ({
      findAll,
      findById,
      create,
      update,
      remove,
    }),
    [findAll, findById, create, update, remove],
  );
}
