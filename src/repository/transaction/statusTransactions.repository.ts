import { QueryResult } from "pg";
import {
  IDataStatusTransaction,
  IStatusTransactionBody,
} from "../../model/transaction/statusTransactions.model";
import db from "../../configs/pg";

export const createData = (
  body: IStatusTransactionBody
): Promise<QueryResult<IDataStatusTransaction>> => {
  const query = `insert into status_transactions (status)
    values ($1)
    returning * `;
  const { status } = body;
  const values = [status];
  return db.query(query, values);
};

export const getData = (): Promise<QueryResult<IDataStatusTransaction>> => {
  const query = ` select * from status_transactions`;
  return db.query(query);
};

export const updateData = (
  id: string,
  body: IStatusTransactionBody
): Promise<QueryResult<IDataStatusTransaction>> => {
  const query = ` update status_transactions set status = $2 where id = $1
    returning * `;
  const { status } = body;
  const values = [id, status];
  return db.query(query, values);
};

export const deleteData = async (id: string): Promise<string> => {
  const query = "delete from public.status_transactions where id = $1";
  const values = [id];
  try {
    await db.query(query, values);
    return "Size product successfully deleted";
  } catch (error) {
    console.error("Error deleting Size product:", error);
    throw error;
  }
};
