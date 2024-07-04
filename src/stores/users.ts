import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
import { faker } from '@faker-js/faker';
import type { User } from '@/models/User';
import {
  createUserReq,
  deleteUserReq,
  getUsersReq,
  updateUserReq
} from '@/api/users';

export const USERS_PER_PAGE = 100;

export const generateUser = (optimistic: boolean = false): User => ({
  id: faker.string.uuid(),
  optimistic,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  contact: {
    email: faker.internet.email()
  }
});

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const isUpdating = ref(false);

  const updateUsers = async (newValue: User[]) => {
    isUpdating.value = true;
    await nextTick();
    users.value = newValue;
    isUpdating.value = false;
  };

  const createUser = async (user: User & { id?: string }): Promise<User> => {
    const { id = faker.string.uuid(), optimistic, ...rest } = user;

    // Optimistic update
    await updateUsers([{ ...user, id }, ...users.value]);

    const newUser = await createUserReq(rest);
    await updateUsers(users.value.map((u) => (u.id === id ? newUser : u)));
    return newUser;
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    if (!await deleteUserReq(id)) return false;
    await updateUsers(users.value.filter((user) => user.id !== id));
    return true;
  };

  const updateUser = async (user: User): Promise<User> => {
    await updateUsers(users.value.map((u) => (u.id === user.id ? { ...user, optimistic: true } : u)));
    const newUser = await updateUserReq(user);
    await updateUsers(users.value.map((u) => (u.id === user.id ? newUser : u)));
    return newUser;
  };

  const loadPageMap = new Map<string, Promise<User[]>>();

  const loadPage = async (page: number, perPage: number = USERS_PER_PAGE): Promise<User[]> => {
    const key = `${page}-${perPage}`;

    // Simulate server response
    const promise = getUsersReq(page + 1, perPage);

    loadPageMap.set(key, promise);
    const newUsers = await promise;
    const currentPromise = loadPageMap.get(key);
    if (currentPromise !== promise) throw new Error('Throttle');

    await updateUsers([
      ...users.value.slice(0, page * perPage),
      ...newUsers,
      ...users.value.slice(page * perPage + perPage)
    ]);
    return newUsers;
  };

  return {
    isUpdating,
    users,
    createUser,
    deleteUser,
    updateUser,
    loadPage
  };
});
