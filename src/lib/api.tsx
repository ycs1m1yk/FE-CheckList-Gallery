import axios from "axios";

const token = "test";

const api = axios.create({
  baseURL: "https://fcgserver.loca.lt/",
});

export const postApi = {
  getAllPosts: () => api.get("/post"),
  getPostById: (postId: string) => api.get(`/post/${postId}`),
  deletePost: (postId: string) =>
    api.delete(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updatePost: (postId: string, bodyData: FormData) =>
    api.post(`/post/${postId}`, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  publishPost: (bodyData: FormData) =>
    api.post("/post", bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const categoryApi = {
  getAllCategory: () => api.get("/category"),
};

export const userApi = {
  getAllUser: () => api.get("/user"),
  getUserById: (userId: string) => api.get(`/user/${userId}`),
  updateUser: (userId: string, bodyData: Object) =>
    api.patch(`/user/${userId}`, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteUser: (userId: string) =>
    api.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
