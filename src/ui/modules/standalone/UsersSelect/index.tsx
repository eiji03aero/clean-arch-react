import * as React from 'react';
import AsyncSelect from 'react-select/async';

import { useUsersService } from '@/services/adapters/useUsersService';

import { useUsers } from '@/ui/modules/hooks/useUsers';

type Option = { label: string; value: number };

type Props = {
  selectedIds: UniqueId[];
  onChange: (ids: UniqueId[]) => void;
};

export function UsersSelect({ selectedIds, onChange }: Props) {
  const usersService = useUsersService();
  const { users } = useUsers();

  const loadOptions = React.useCallback(async () => {
    const users = await usersService.findAll();
    const options = users.map((user) => ({ label: user.name, value: user.id }));
    return options;
  }, [usersService]);

  const handleChange = React.useCallback(
    (options: readonly Option[]) => {
      const newIds = options.map((option) => option.value);
      onChange(newIds);
    },
    [onChange],
  );

  const value = React.useMemo(() => {
    if (selectedIds.length === 0) {
      return undefined;
    }

    if (!users) {
      return undefined;
    }

    return users
      .filter((user) => selectedIds.includes(user.id))
      .map((user) => ({ label: user.name, value: user.id }));
  }, [selectedIds, users]);

  return (
    <AsyncSelect<Option, true>
      isMulti
      defaultOptions
      value={value}
      loadOptions={loadOptions}
      onChange={handleChange}
    />
  );
}
