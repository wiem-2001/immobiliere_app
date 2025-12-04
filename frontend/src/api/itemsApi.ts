import { api } from "../lib/axios";

export const itemsApi = {
  getAll: () => api.get("/items"),
  getOne: (id: string) => api.get(`/items/${id}`),
  create: (data: any) => api.post("/items", data),
  update: (id: string, data: any) => api.put(`/items/${id}`, data),
  remove: (id: string) => api.delete(`/items/${id}`),
};
