import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
} from '@chakra-ui/react';

import * as pjDmn from '@/domain/Project';
import { Format } from '@/lib/datetime';

type Props = {
  project: pjDmn.Project;
  onEdit: (id: UniqueId) => void;
  onDelete: (id: UniqueId) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between">
          <Heading size="md">
            {project.id}: {project.title}
          </Heading>
          <Stack direction="row" spacing={4}>
            <Button colorScheme="blackAlpha" onClick={() => onEdit(project.id)}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => onDelete(project.id)}>
              Delete
            </Button>
          </Stack>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize="sm">
          {Format.YearMonthDate(project.startDate)} -{' '}
          {Format.YearMonthDate(project.endDate)}
        </Text>
      </CardBody>
    </Card>
  );
}
