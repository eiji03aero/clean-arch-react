import {
  Box,
  Stack,
  StackDivider,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Text,
} from '@chakra-ui/react';

import * as userDmn from '@/domain/User';

type Props = {
  user: userDmn.User;
};

export function CurrentUserCard({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Current User</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              ID
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.id}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Name
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.name}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
