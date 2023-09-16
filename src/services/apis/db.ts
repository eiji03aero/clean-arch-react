import Dexie, { Table } from 'dexie';

import * as userDmn from '@/domain/User';

const DBName = 'clean-arch-react-db';
const DBVersion = 1;

export class Database extends Dexie {
  public users!: Table<userDmn.User, number>;

  public constructor() {
    super(DBName);
    this.version(DBVersion).stores({
      users: '++id,name,createdAt,updatedAt',
    });
  }
}
