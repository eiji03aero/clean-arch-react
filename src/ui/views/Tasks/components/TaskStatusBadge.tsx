import * as React from 'react';
import { Badge } from '@chakra-ui/react';

import * as taskDmn from '@/domain/Task';

type Props = {
  status: taskDmn.TaskStatus;
};

export function TaskStatusBadge({ status }: Props) {
  const { variant, colorScheme, label } = React.useMemo(() => {
    switch (status) {
      case 'not_started':
        return {
          variant: 'outline',
          colorScheme: 'yellow',
          label: 'Not started',
        };
      case 'wip':
        return { variant: 'solid', colorScheme: 'cyan', label: 'WIP' };
      case 'completed':
        return { variant: 'solid', colorScheme: 'green', label: 'Completed' };
    }
  }, [status]);

  return (
    <Badge variant={variant} colorScheme={colorScheme}>
      {label}
    </Badge>
  );
}
