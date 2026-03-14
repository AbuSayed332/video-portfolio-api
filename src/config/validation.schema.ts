import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api/v1'),

  // MongoDB Database
  MONGODB_URI: Joi.string().required(),
  MONGODB_URI_PROD: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  // Email
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().default(587),
  MAIL_USER: Joi.string().required(),
  MAIL_PASS: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),

  // Security
  ADMIN_API_KEY: Joi.string().required(),
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
  JWT_SECRET: Joi.string().optional(),
});