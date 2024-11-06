import { QueryResult } from "pg";
import db from "../../configs/pg";
import { ISizeProductBody, ISizeProductData } from "../../model/transaction/sizeProduct.model";

export const createData = (body: ISizeProductBody) => {
  const query = `insert into public."size" ("size" ,added_cost) values ($1 ,$2) returning size , added_cost `;
  const { product_size, added_cost } = body;
  const values = [product_size, added_cost];
  return db.query(query, values);
};

export const getAllData = (): Promise<QueryResult<ISizeProductData>> => {
  const query = `select id , size , added_cost  from public."size" `;
  return db.query(query);
};

export const updateData = (
  id: string,
  body: ISizeProductBody
): Promise<QueryResult<ISizeProductData>> => {
  let queryParts: string[] = [];
  const values: any[] = [];
  let hasUpdates = false;

  const { product_size, added_cost } = body;

  if (product_size && product_size.length > 0) {
    queryParts.push(`size = $${values.length + 1}`);
    values.push(product_size);
    hasUpdates = true;
  }

  if (added_cost && added_cost > 0) {
    queryParts.push(`added_cost = $${values.length + 1}`);
    values.push(added_cost);
    hasUpdates = true;
  }

  if (hasUpdates) {
    const query = `
        update size set ${queryParts.join(", ")}
        WHERE id = $${values.length + 1} 
        RETURNING id , size , added_cost
      `;
    values.push(id);

    return db.query(query, values);
  } else {
    throw new Error("No fields to update");
  }
};

export const deleteData = async (id: string): Promise<string> => {
    const query = "delete from public.size where id = $1";
    const values = [id];
    try {
      await db.query(query, values);
      return "Size product successfully deleted";
    } catch (error) {
      console.error("Error deleting Size product:", error);
      throw error;
    }
  };
  