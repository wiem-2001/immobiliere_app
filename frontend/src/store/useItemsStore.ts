import { create } from "zustand";
import { itemsApi } from "../api/itemsApi"
import type  { Item ,CreateItemInput,UpdateItemInput} from "../types/item";

export interface ItemsState {
  items: Item[];
  item : Item | null;
  loading: boolean;
  error: string | null;

  fetchItems: () => Promise<void>;
  createItem: (data: CreateItemInput) => Promise<void>;
  updateItem: (id: string, data: UpdateItemInput) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  fetchOneItem: (id: string) => Promise<void>;
}

export const useItemsStore = create<ItemsState>((set) => ({
  items: [],
  item: null,
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const res = await itemsApi.getAll();
      set({ items: res.data });
      console.log(res.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  createItem: async (data: CreateItemInput) => {
    set({ loading: true, error: null });
    try {
      const res = await itemsApi.create(data);
      set((state) => ({ items: [...state.items, res.data] }));
      console.log("Item created:", res.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  updateItem: async (id: string, data: UpdateItemInput) => {
    set({ loading: true, error: null });
    try {
      const res = await itemsApi.update(id, data);
      set((state) => ({
        items: state.items.map((i) => (i.id === id ? res.data : i)),
      }));
      set({ item: null});
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  deleteItem: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await itemsApi.remove(id);
      set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },
  fetchOneItem: async (id: string) => {
    set({ loading: true, error: null });
    try {
        const res = await itemsApi.getOne(id);
        set({ item:  res.data });
        console.log("Fetched item:", res.data);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        set({ error: message });
    }
    finally {
        set({ loading: false });
    }
}
}));
