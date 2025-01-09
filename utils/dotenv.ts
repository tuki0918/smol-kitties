import { schema as publicSchema } from "@/utils/dotenv.public";
import { zenv } from "dotenv-zod-validator";

const schema = zenv.object({
  // MY_SECRET: zenv.string(),
});

export const ENV = zenv.validate(publicSchema.merge(schema));
