import { Pool, PoolClient, QueryResult } from "pg";
import { IDataUser } from "../../model/auth/user.model";

export const createData = (
  hashedPassword: string,
  email: string,
  dbPool: Pool | PoolClient
): Promise<QueryResult<IDataUser>> => {
  const query = `
      INSERT INTO users ( user_email, user_pass)
      VALUES ($1, $2  )
      RETURNING user_email , id `;
  const values = [email, hashedPassword];
  return dbPool.query(query, values);
};
