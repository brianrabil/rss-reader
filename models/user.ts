
export interface Avatar {
  src?: string;
}

export interface User {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: Avatar;
}