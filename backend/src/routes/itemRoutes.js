import express from "express";
import * as itemController from "../controllers/itemController.js";
import { validate } from "../middlewares/validate.js";
import { createItemSchema, updateItemSchema, itemIdParamSchema } from "../schemas/itemSchema.js";

const router = express.Router();

router.get("/", itemController.getItems);
router.get("/:id", validate(itemIdParamSchema, "params"), itemController.getItem);
router.post("/", validate(createItemSchema), itemController.createItem);
router.put("/:id",validate(itemIdParamSchema, "params"), validate(updateItemSchema), itemController.updateItem);
router.delete("/:id", validate(itemIdParamSchema, "params"), itemController.deleteItem);

export default router;
