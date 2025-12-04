import  prisma  from "../prisma.js";

export const getAllItems = async () => {
  return await prisma.item.findMany();
};

export const getItemById = async (id) => {
  const item = await prisma.item.findUnique({ where: { id } });
  if (!item) throw { status: 404, message: "Item not found" };
  return item;
};

export const createItem = async (data) => {
  return await prisma.item.create({ data });
};

export const updateItem = async (id, data) => {
  try {
    return await prisma.item.update({
      where: { id },
      data,
    });
  } catch {
    throw { status: 404, message: "Item not found" };
  }
};

export const deleteItem = async (id) => {
  try {
    return await prisma.item.delete({ where: { id } });
  } catch {
    throw { status: 404, message: "Item not found" };
  }
};
