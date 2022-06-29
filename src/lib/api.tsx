import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
});

export const authApi = {
  getAuthToken: (code: string) => api.get(`/auth/${code}`),
};

export const postApi = {
  getAllPosts: (params?: Object) => api.get('/post', { params }),
  getPostById: (postId: string | undefined) => api.get(`/post/${postId}`),
  deletePost: (postId: string, token: string) => api.delete(`/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  updatePost: (postId: string, bodyData: FormData, token: string) => api.post(`/post/${postId}`, bodyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  publishPost: (bodyData: FormData, token: string) => api.post('/post', bodyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
};

export const categoryApi = {
  getAllCategory: () => api.get('/category'),
};

export const userApi = {
  getAllUser: () => api.get('/user'),
  getUserById: (userId: string) => api.get(`/user/${userId}`),
  updateUser: (userId: string, bodyData: Object, token: string) => api.patch(`/user/${userId}`, bodyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  deleteUser: (userId: string, token: string) => api.delete(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
};
