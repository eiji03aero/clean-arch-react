import { Database } from '@/services/apis/db';

export async function findAll() {
  const db = new Database();

  const users = await db.users.toArray();

  db.close();

  return users;
}

export async function findById(id: UniqueId) {
  const db = new Database();

  const user = await db.users.get(id);

  db.close();

  return user;
}
