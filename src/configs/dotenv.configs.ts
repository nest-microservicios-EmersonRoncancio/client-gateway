import 'dotenv/config';
import * as joi from 'joi';

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST_PRODUCT_SERVICE: joi.string().required(),
    PORT_PRODUCT_SERVICE: joi.number().required(),
    HOST_ORDER_SERVICE: joi.string().required(),
    PORT_ORDER_SERVICE: joi.number().required(),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

interface Env {
  PORT: number;
  HOST_PRODUCT_SERVICE: string;
  PORT_PRODUCT_SERVICE: number;
  HOST_ORDER_SERVICE: string;
  PORT_ORDER_SERVICE: number;
}

const env: Env = value as Env;

export const envs = {
  PORT: env?.PORT,
  HOST_PRODUCT_SERVICE: env?.HOST_PRODUCT_SERVICE,
  PORT_PRODUCT_SERVICE: env?.PORT_PRODUCT_SERVICE,
  HOST_ORDER_SERVICE: env?.HOST_ORDER_SERVICE,
  PORT_ORDER_SERVICE: env?.PORT_ORDER_SERVICE,
};
