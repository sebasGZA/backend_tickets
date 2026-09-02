import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    NODE_ENV: Joi.string().default('local'),
    PORT: Joi.string().default(3000),

    DB_URL: Joi.string().required(),

    SWAGGER_TITLE: Joi.string().default('Tickets'),
    SWAGGER_DESCRIPTION: Joi.string().default('Service to manage tickets'),

    API_PREFIX: Joi.string().default('api'),
    PASSWORD_SALT_ROUNDS: Joi.number().required(),

    ADMIN_EMAIL: Joi.string().required(),
    ADMIN_PASSWORD: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_SECONDS: Joi.number().default(900),
});