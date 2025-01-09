import { zenv } from "dotenv-zod-validator";

export const schema = zenv.object({
  // NEXT_PUBLIC_MY_VALUE: zenv.string(),
});

export const ENV = zenv.validate(schema, {
  // NEXT_PUBLIC_MY_VALUE: process.env.NEXT_PUBLIC_MY_VALUE,
});
