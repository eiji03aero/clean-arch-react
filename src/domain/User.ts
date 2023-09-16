import { datetimeNow } from '@/lib/datetime';

type UserName = string;

export type User = {
  id: UniqueId;
  name: UserName;
  createdAt: Date;
  updatedAt: Date;
};

export function createUser(params: { name: UserName }): User {
  const now = datetimeNow();
  const user = {
    ...params,
    createdAt: now,
    updatedAt: now,
  };

  return user as User;
}
