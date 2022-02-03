import axios from 'axios';
import { User } from '../models/User';
import { Show } from '../models/Show';
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
  const jwt = await getJwt();
  const { data } = await http.get('/trending', {
    params: { page },
    ...(await getAuthHeader()),
  });
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
  const jwt = await getJwt();
  const { data } = await http.post(
    '/shows/preferences',
    input,
    await getAuthHeader()
  );
};

export const getShowList = async () => {
  console.log('Fetching show list');
  const jwt = await getJwt();
  const { data } = await http.get('/shows', await getAuthHeader());
  return data;
};

export const getUsers = async (name: string) => {
  console.log('Fetching user list');
  const jwt = await getJwt();
  try {
    const { data } = await http.get(`/users/${name}`, await getAuthHeader());
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addFriend = async (id: string, name: string, avatar?: string) => {
  console.log('Adding friend', { id, name, avatar });
  const jwt = await getJwt();
  const { data } = await http.post(
    '/users/add_friend',
    { id, name, avatar },
    await getAuthHeader()
  );
  return data;
};

export const getFriends = async () => {
  console.log('Fetching friends.');
  const jwt = await getJwt();
  const { data } = await http.post('/friends/get', {}, await getAuthHeader());
  return data;
};
