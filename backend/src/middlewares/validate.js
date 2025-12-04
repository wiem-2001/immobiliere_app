export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (err) {
      res.status(400).json({ error: err.errors || err.message });
    }
  };
};