import { Pool, PoolClient, QueryResult } from "pg";
import { IDataProfile, IProfileBody } from "../../model/auth/profile.model";

export const createDataProfile = async (
  id: string,
  body: IProfileBody,
  dbPool: Pool | PoolClient
): Promise<QueryResult<IDataProfile>> => {
  const query = `INSERT INTO profile (user_id, full_name, phone_number, address,profile_image)
                   VALUES ($1, $2, $3, $4,$5 )
                   RETURNING full_name, phone_number, address`;
  const { full_name, phone_number, address, profile_image } = body;
  const values = [id, full_name, phone_number, address, profile_image];

  return dbPool.query(query, values);
};
