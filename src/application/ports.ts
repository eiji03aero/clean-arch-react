import * as userDmn from '@/domain/User';

export interface AuthenticationService {
  login(id: UniqueId): Promise<userDmn.User>;
}

export interface UsersService {
  findAll(): Promise<userDmn.User[]>;
  findById(id: UniqueId): Promise<userDmn.User | undefined>;
}

export interface NavigationService {
  push(path: URLPath): void;
  getPath(): URLPath;
}

export interface SessionStorage {
  currentUser: userDmn.User | undefined;
  isLoggedIn: () => boolean;
  getSessionUserId: () => number | null;
  persistSession: (id: UniqueId) => void;
  revokeSession: () => void;
  setCurrentUser: (user: userDmn.User | undefined) => void;
}
