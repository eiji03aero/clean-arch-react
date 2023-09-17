import * as React from 'react';
import {
  Button,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

import { UsersSelect } from '@/ui/modules/standalone/UsersSelect';
import * as datetimeLib from '@/lib/datetime';

export type Form = {
  title: string;
  assigneeIds: number[];
  startDate: Date;
  endDate: Date;
  description: string;
};

export type SubmitParams = {
  title: string;
  assigneeIds: number[];
  description: string;
  startDate: Date;
  endDate: Date;
};

type Props = {
  initialValue?: Form;
  onSubmit: (params: SubmitParams) => void;
  onCancel: () => void;
};

export function ProjectEditor({ initialValue, onSubmit, onCancel }: Props) {
  const [form, setForm] = React.useState<Form>({
    title: '',
    assigneeIds: [],
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  });

  const handleSetFormItem = (key: string, value: string | Date | number[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      title: form.title,
      assigneeIds: form.assigneeIds,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
    });
  };

  React.useEffect(() => {
    if (!initialValue) {
      return;
    }

    setForm(initialValue);
  }, [initialValue]);

  return (
    <Flex flexDir="column" px={4} h="100%">
      <Stack flex={1} minHeight={0} overflow="auto" spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={form.title}
            onChange={(e) => handleSetFormItem('title', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Users</FormLabel>
          <UsersSelect
            selectedIds={form.assigneeIds}
            onChange={(ids) => handleSetFormItem('assigneeIds', ids)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Start date</FormLabel>
          <Input
            type="date"
            value={datetimeLib.Format.YearMonthDate(form.startDate)}
            onChange={(e) => {
              const value = datetimeLib.Parse.YearMonthDate(e.target.value);
              handleSetFormItem('startDate', value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>End date</FormLabel>
          <Input
            type="date"
            value={datetimeLib.Format.YearMonthDate(form.endDate)}
            onChange={(e) => {
              const value = datetimeLib.Parse.YearMonthDate(e.target.value);
              handleSetFormItem('endDate', value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={form.description}
            onChange={(e) => handleSetFormItem('description', e.target.value)}
          />
        </FormControl>
      </Stack>

      <Flex justifyContent="space-between" py={4}>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
        <Button colorScheme="blackAlpha" onClick={onCancel}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
}
