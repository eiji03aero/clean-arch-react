import * as React from 'react';

import { useCreateProject } from '@/application/usecases/useCreateProject';
import {
  ProjectEditor,
  SubmitParams,
} from '@/ui/views/Projects/standalone/ProjectEditor';

type Props = {
  onSubmitSuccess: () => void;
  onClose: () => void;
};

export function CreateProject({ onSubmitSuccess, onClose }: Props) {
  const { createProject } = useCreateProject();

  const handleSubmit = React.useCallback(
    async (params: SubmitParams) => {
      await createProject({
        project: {
          title: params.title,
          description: params.description,
          startDate: params.startDate,
          endDate: params.endDate,
        },
        assigneeIds: params.assigneeIds,
      });
      onSubmitSuccess();
    },
    [createProject, onSubmitSuccess],
  );

  return <ProjectEditor onSubmit={handleSubmit} onCancel={onClose} />;
}
