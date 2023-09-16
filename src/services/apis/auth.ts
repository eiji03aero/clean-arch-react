import * as userDmn from '@/domain/User';
import { Database } from '@/services/apis/db';

export async function authenticate(id: UniqueId): Promise<userDmn.User> {
  const db = new Database();

  const user = await db.users.get(id);

  db.close();

  return user!;
}
