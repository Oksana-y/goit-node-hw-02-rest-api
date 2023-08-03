import express from "express";
import contactsController from "../../controllers/contacts-controllers.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchema from "../../schemas/contacts-schemas.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const contactAddValidate = validateBody(contactsSchema.contactAddSchema);
const contactUpdateFavorite = validateBody(
  contactsSchema.contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactsController.add
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateFavorite,
  contactsController.updateFavorite
);

export default contactsRouter;
