import axios from 'axios';
import { getAuth } from 'firebase/auth';

const http = axios.create({ baseURL: 'http://localhost:8080' });

export const getJwt = () => {
  const auth = getAuth();
  return auth.currentUser?.getIdToken();
};

export const getAuthHeader = async () => {
  const jwt = await getJwt();
  return {
    headers: { authorization: `Bearer ${jwt}` },
  };
};

export const getTrending = async (page: number) => {
  const { data } = await http.post(
    '/shows/get_trending',
    { page },
    await getAuthHeader()
  );
  return data as { page: number; results: any[] };
};

export interface HandlePreferenceInput {
  userId: string;
  showId: string;
  showTitle: string;
  showPoster: string;
  yes?: boolean;
  no?: boolean;
  watched?: boolean;
}

export const setShowPreferences = async (input: HandlePreferenceInput) => {
  console.log('Setting preferences.', { input });
  await http.post('/show_preferences/add', input, await getAuthHeader());
};

export const getWatchList = async () => {
  console.log('Fetching show preferences.');
  const { data } = await http.post(
    '/show_preferences/list',
    {},
    await getAuthHeader()
  );
  return data;
};

export const getUsers = async (name: string) => {
  console.log('Fetching user list');
  const { data } = await http.post(
    '/users/list',
    { name },
    await getAuthHeader()
  );
  return data;
};

export const addFriend = async (id: string, name: string, avatar?: string) => {
  console.log('Adding friend', { id, name, avatar });
  await http.post('/friends/add', { id, name, avatar }, await getAuthHeader());
};

export const removeFriend = async (id: string) => {
  console.log('Removing friend');
  const { data } = await http.post(
    '/friends/remove',
    { id },
    await getAuthHeader()
  );
  return data;
};

export const getFriends = async () => {
  console.log('Fetching friends.');
  const { data } = await http.post('/friends/list', {}, await getAuthHeader());
  return data;
};

export const getFriendsWatchList = async (input) => {
  console.log('Fetching friends watch list');
  const { data } = await http.post(
    '/show_preferences/list_by_friend',
    input,
    await getAuthHeader()
  );
  return data;
};
