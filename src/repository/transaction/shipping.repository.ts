import { QueryResult } from "pg";
import db from "../../configs/pg";
import {
  IDataDelivery,
  IDeliveryBody,
} from "../../model/transaction/shipping.model";

export const createData = (
  body: IDeliveryBody
): Promise<QueryResult<IDataDelivery>> => {
  const query = `insert into shippings ( shipping_method , minimum_cost , minimum_distance , added_cost )
    values ( $1 , $2 , $3 , $4 )
    returning shipping_method , minimum_cost , minimum_distance , added_cost`;
  const { shipping_method, minimum_cost, minimum_distance, added_cost } = body;
  const values = [shipping_method, minimum_cost, minimum_distance, added_cost];
  console.log(values, query);
  return db.query(query, values);
};

export const getAllData = (): Promise<QueryResult<IDataDelivery>> => {
  const query = ` select * from shippings`;
  return db.query(query);
};

export const updateData = (
  id: string,
  body: IDeliveryBody
): Promise<QueryResult<IDataDelivery>> => {
  let query = ` update shippings set `;
  let values = [];

  const { shipping_method, minimum_cost, minimum_distance, added_cost } = body;

  if (shipping_method?.length > 0) {
    query += `shipping_method = $${values.length + 1}, `;
    values.push(shipping_method);
  }

  if (minimum_cost >= 0) {
    query += `minimum_cost = $${values.length + 1}, `;
    values.push(minimum_cost);
  }

  if (minimum_distance >= 0) {
    query += `minimum_distance = $${values.length + 1}, `;
    values.push(minimum_distance);
  }

  if (added_cost >= 0) {
    query += `added_cost = $${values.length + 1}, `;
    values.push(added_cost);
  }

  query = query.slice(0, -2);
  query += ` WHERE id = $${values.length + 1} returning  *  `;
  values.push(id);

  console.log(values, query);

  return db.query(query, values);
};

export const checkIfDeliveryExists = async (id: string) => {
  const query = `SELECT COUNT(*) AS count FROM shippings WHERE id = $1`;
  const IsCheck = await db.query(query, [id]);
  return IsCheck.rows[0].count > 0;
};

export const deleteData = async (id: string): Promise<string> => {
  const query = "delete from public.shippings where id = $1";
  const values = [id];
  try {
    await db.query(query, values);
    return "Size product successfully deleted";
  } catch (error) {
    console.error("Error deleting Size product:", error);
    throw error;
  }
};
