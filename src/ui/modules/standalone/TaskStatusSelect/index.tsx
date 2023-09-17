import * as React from 'react';
import Select from 'react-select';

import * as taskDmn from '@/domain/Task';

type Option = { label: string; value: taskDmn.TaskStatus };

type Props = {
  value: taskDmn.TaskStatus | null;
  onChange: (status: taskDmn.TaskStatus | null) => void;
};

export function TaskStatusSelect({ value, onChange }: Props) {
  const options = React.useMemo<Option[]>(() => {
    return [
      {
        label: 'Not started',
        value: 'not_started',
      },
      {
        label: 'WIP',
        value: 'wip',
      },
      {
        label: 'Completed',
        value: 'completed',
      },
    ];
  }, []);

  const internalValue = React.useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [value, options]);

  const handleChange = React.useCallback(
    (option: Option | null) => {
      onChange(option ? option.value : null);
    },
    [onChange],
  );

  return (
    <Select<Option, false>
      value={internalValue}
      options={options}
      onChange={handleChange}
    />
  );
}
