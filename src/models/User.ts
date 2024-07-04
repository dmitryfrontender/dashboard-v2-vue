export interface User {
  id: string;
  optimistic?: boolean;
  firstName: string;
  lastName: string;
  contact: {
    email: string;
  };
}
