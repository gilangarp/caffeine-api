import { QueryResult } from "pg";
import { IAuth } from "../../model/auth/auth.model";
import db from "../../configs/pg";

export const GetByEmail = (email: string): Promise<QueryResult<IAuth>> => {
  const query = `select user_pass , id , role from users where user_email = $1`;
  const values = [email];
  return db.query(query, values);
};
