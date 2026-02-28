const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const validationSchema = {};

  if (schema.body) validationSchema.body = schema.body;
  if (schema.query) validationSchema.query = schema.query;
  if (schema.params) validationSchema.params = schema.params;

  const { error } = Joi.compile(validationSchema)
    .prefs({ errors: { label: "key" } })
    .validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false }
    );

  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message).join(", "),
    });
  }

  next();
};

module.exports = validate;