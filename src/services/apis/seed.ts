import * as userDmn from '@/domain/User';
import * as pjDmn from '@/domain/Project';
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

  const projects = [
    pjDmn.createProject({
      title: 'Develop mobile app',
      description: 'no time for sleep!',
      startDate: new Date(2023, 8, 10),
      endDate: new Date(2023, 8, 20),
    }),
    pjDmn.createProject({
      title: 'Negotiate salary',
      description: 'For the baby!',
      startDate: new Date(2023, 7, 10),
      endDate: new Date(2023, 8, 5),
    }),
  ];
  await db.projects.bulkAdd(projects);
}
