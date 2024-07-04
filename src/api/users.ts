import type { User } from '@/models/User';

const USERS_API_PATH = '/users';

export const getUsersReq = async (page: number, count: number): Promise<User[]> => fetch(
  new URL(
    `${USERS_API_PATH}?${new URLSearchParams({
      page: page.toString(),
      count: count.toString()
    })}`,
    import.meta.env.VITE_APP_API_URL
  )
)
  .then((response) => response.json())
  .then((response) => response.data as User[]);

export const createUserReq = async (user: Omit<User, 'id'>): Promise<User> => fetch(
  new URL(
    USERS_API_PATH,
    import.meta.env.VITE_APP_API_URL
  ),
  {
    method: 'POST',
    body: JSON.stringify(user)
  }
)
  .then((response) => response.json())
  .then((response) => response.data as User);

export const deleteUserReq = async (id: string): Promise<boolean> => fetch(
  new URL(
    `${USERS_API_PATH}/${id}`,
    import.meta.env.VITE_APP_API_URL
  )
)
  .then((response) => response.json())
  .then((response) => response.data as boolean);

export const updateUserReq = async (user: User): Promise<User> => fetch(
  new URL(
    USERS_API_PATH,
    import.meta.env.VITE_APP_API_URL
  ),
  {
    method: 'PUT',
    body: JSON.stringify(user)
  }
)
  .then((response) => response.json())
  .then((response) => response.data as User);
