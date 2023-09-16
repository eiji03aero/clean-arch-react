import * as userDmn from '@/domain/User';
import { Database } from '@/services/apis/db';

export async function tryInsertSeeds() {
  const db = new Database();

  const usersCount = await db.users.count();
  const isInitialized = usersCount > 0;
  if (isInitialized) {
    return;
  }

  const users = [
    userDmn.createUser({ name: 'Project leader' }),
    userDmn.createUser({ name: 'Buka 1' }),
    userDmn.createUser({ name: 'Buka 2' }),
    userDmn.createUser({ name: 'designer' }),
  ];
  await db.users.bulkAdd(users);
}
