import { Pool, PoolClient, QueryResult } from "pg";
import {
  IDataDetailHistory,
  IDataProductDetailHistory,
  IDataTransaction,
  ITransactionBody,
  ITransactionProduct,
  ITransactionQuery,
} from "../../model/transaction/transactions.model";
import db from "../../configs/pg";

export const createData = (
  body: ITransactionBody,
  dbPool: Pool | PoolClient
): Promise<QueryResult<IDataTransaction>> => {
  const query = `insert into transactions ( user_id ,shipping_id , status_id , subtotal , tax  , grand_total , full_name , address , user_email , payment_type)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      returning *`;
  const {
    user_id,
    shipping_id,
    status_id,
    subtotal,
    tax,
    grand_total,
    full_name,
    address,
    user_email,
    payment_type,
  } = body;
  const values = [
    user_id,
    shipping_id,
    status_id,
    subtotal,
    tax,
    grand_total,
    full_name,
    address,
    user_email,
    payment_type,
  ];
  return dbPool.query(query, values);
};

export const createDataProduct = (
  transaction_id: string,
  product: ITransactionProduct,
  dbPool: Pool | PoolClient
): Promise<QueryResult<ITransactionProduct>> => {
  const query = `insert into transaction_products (  transaction_id , product_id , size_id  , fd_option_id , product_name , product_price)
      values ($1,$2,$3,$4,$5,$6)
      returning *`;
  const { product_id, size_id, fd_option_id, product_name, product_price } =
    product;
  const values = [
    transaction_id,
    product_id,
    size_id,
    fd_option_id,
    product_name,
    product_price,
  ];

  return dbPool.query(query, values);
};

export const getAllData = (queryParams: ITransactionQuery, id: string) => {
  let query = `
      select 
      t.id,
      t.order_number,
      to_char(t.created_at, 'DD-Month-YYYY') AS created_at,
      t.grand_total,
      st.status
  from transactions t 
  inner join status_transactions st on t.status_id = st.id
  inner join users u on t.user_id = u.id`;

  const values: any[] = [];
  const { status, page, limit } = queryParams;
  const conditions: string[] = [];

  if (status) {
    let statusFilter = "";
    switch (status.toLowerCase()) {
      case "1":
        statusFilter = `st.status = 'On Progress'`;
        break;
      case "2":
        statusFilter = `st.status = 'Sending Goods'`;
        break;
      case "3":
        statusFilter = `st.status = 'Finish Order'`;
        break;
      default:
        throw new Error("Invalid status");
    }
    conditions.push(statusFilter);
  }

  if (id) {
    values.push(id);
    conditions.push(`u.id = $${values.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (page && limit) {
    const pageLimit = parseInt(limit);
    const offset = (parseInt(page) - 1) * pageLimit;

    values.push(pageLimit, offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
  }

  return db.query(query, values);
};

export const getTotalTransaction = (
  uuid: string
): Promise<QueryResult<{ total_product: string }>> => {
  let query = `select count(*) as total_product from transactions t
    INNER JOIN users u ON t.user_id = u.id 
    WHERE u.id = $1;`;
  return db.query(query, [uuid]);
};

export const getDetailData = (
  uuid: string
): Promise<QueryResult<IDataDetailHistory>> => {
  const query = `select p2.full_name,p2.phone_number,p2.address, t.order_number, TO_CHAR(t.created_at, 'DD Month YYYY "at" HH12:MI AM') AS created_at , p.payment_method , s.shipping_method , st.status , t.grand_total
  from transactions t 
  inner join users u on t.user_id = u.id 
  inner join profile p2 on u.id = p2.user_id 
  inner join payments p on t.payments_id = p.id 
  inner join shippings s on t.shipping_id = s.id 
  inner  join status_transactions st on t.status_id = st.id 
  WHERE t.id = $1`;
  return db.query(query, [uuid]);
};

export const getDetailDataProduct = (
  uuid: string
): Promise<QueryResult<IDataProductDetailHistory>> => {
  const query = `select (SELECT img_product
         FROM image_product
         WHERE product_id = p.id
         LIMIT 1) AS img_product,
         p.product_name ,
         p.product_price ,
         p2.discount_price ,
         ps.size ,
         ih."option" ,
         s.shipping_method 
    from transaction_products tp 
    inner join products p on tp.product_id = p.id 
    left join promos p2 on p.id = p2.product_id 
    inner join size ps on tp.size_id = ps.id 
    left join food_and_drink_options ih on tp.fd_option_id = ih.id 
    inner join transactions t on tp.transaction_id = t.id 
    inner  join shippings s on t.shipping_id = s.id 
    where t.id = $1`;
  return db.query(query, [uuid]);
};

export const updateTransactionsStatus = (
  transaction_id: string,
  transaction_status: number,
  payment_type?: string
) => {
  const query = `
    UPDATE transactions 
    SET status_id = $2, payment_type = $3 
    WHERE id = $1
  `;
  const values = [transaction_id, transaction_status, payment_type || null];
  return db.query(query, values);
};

export const getBytransactionById = (transaction_id: string) => {
  const query = `select * from transactions where id = $1`;
  return db.query(query, [transaction_id]);
};
