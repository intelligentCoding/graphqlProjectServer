import { __prod__ } from "./constants";
import { UserFruits } from "./entities/UserFruits";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { User } from "./entities/User";
import { Fruits } from "./entities/Fruits";
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [UserFruits, User, Fruits],
  dbName: "graphQL",
  user: "postgres",
  password: "kasjee",
  type: "postgresql",
  debug: !__prod__,
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
