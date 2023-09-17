import * as React from 'react';

import * as pjDmn from '@/domain/Project';
import { ProjectsService } from '@/application/ports';
import * as projectsApis from '@/services/apis/projects';

export function useProjectsService(): ProjectsService {
  const findAll = React.useCallback(() => {
    return projectsApis.findAll();
  }, []);

  const findById = React.useCallback((id: UniqueId) => {
    return projectsApis.findById(id);
  }, []);

  const create = React.useCallback((project: pjDmn.Project) => {
    return projectsApis.create(project);
  }, []);

  const update = React.useCallback((project: pjDmn.Project) => {
    return projectsApis.update(project);
  }, []);

  const remove = React.useCallback((id: UniqueId) => {
    return projectsApis.remove(id);
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
