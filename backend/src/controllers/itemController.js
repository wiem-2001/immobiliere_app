import * as itemService from "../services/itemService.js";

export const getItems = async (req,res, next) => {
  try {
    const items = await itemService.getAllItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const createItem = async (req, res, next) => {
  try {
    const newItem = await itemService.createItem(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const updated = await itemService.updateItem(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const deleted = await itemService.deleteItem(req.params.id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
