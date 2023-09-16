import { Button, Card, CardBody, Text, Flex, Spacer } from '@chakra-ui/react';

import * as userDmn from '@/domain/User';

type Props = {
  user: userDmn.User;
  onLogin: (id: UniqueId) => void;
};

export function UserCard({ user, onLogin }: Props) {
  return (
    <Card>
      <CardBody>
        <Flex>
          <Text>{user.name}</Text>
          <Spacer />
          <Button colorScheme="blue" onClick={() => onLogin(user.id)}>
            Login
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
