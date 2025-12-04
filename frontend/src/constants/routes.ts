export const ROUTES = {
  LIST_ITEMS: "/",
  ITEM_DETAILS: "/item/:id",
  ITEM_EDIT: "/item/edit/:id",
  ITEM_DELETE: "/item/delete/:id",
  ITEM_CREATE: "/item/create",
} as const;

export const routePaths = {
  listItems: () => "/",
  itemDetails: (id: string) => `/item/${id}`,
  itemEdit: (id: string) => `/item/edit/${id}`,
  itemCreate: () => "/item/create",
  itemDelete: (id: string) => `/item/delete/${id}`,
};
