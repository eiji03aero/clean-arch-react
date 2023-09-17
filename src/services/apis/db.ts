import Dexie, { Table } from 'dexie';

import * as userDmn from '@/domain/User';
import * as pjDmn from '@/domain/Project';
import * as upDmn from '@/domain/UserProject';

const DBName = 'clean-arch-react-db';
const DBVersion = 1;

export class Database extends Dexie {
  public users!: Table<userDmn.User, number>;
  public projects!: Table<pjDmn.Project, number>;
  public userProject!: Table<upDmn.UserProject, number>;

  public constructor() {
    super(DBName);
    this.version(DBVersion).stores({
      users: '++id,name,createdAt,updatedAt',
      projects: '++id,title,description,startDate,endDate,createdAt,updatedAt',
      userProject: '++id,projectId,userId,createdAt',
    });
  }
}
