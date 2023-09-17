import * as React from 'react';

import { useCreateTask } from '@/application/usecases/useCreateTask';
import {
  TaskEditor,
  SubmitParams,
} from '@/ui/views/Tasks/standalone/TaskEditor';

type Props = {
  onSubmitSuccess: () => void;
  onClose: () => void;
};

export function CreateTask({ onSubmitSuccess, onClose }: Props) {
  const { createTask } = useCreateTask();

  const handleSubmit = React.useCallback(
    async (params: SubmitParams) => {
      await createTask({
        task: {
          title: params.title,
          projectId: params.projectId,
          status: params.status,
          description: params.description,
        },
        assigneeIds: params.assigneeIds,
      });
      onSubmitSuccess();
    },
    [onSubmitSuccess, createTask],
  );

  return <TaskEditor onSubmit={handleSubmit} onCancel={onClose} />;
}
