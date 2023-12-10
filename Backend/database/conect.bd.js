import { connect } from "mongoose";
import "dotenv/config";

const dbConnection = process.env.URL_MONGO;

export const startConnection = async () => {
  try {
    const db = await connect(dbConnection);
    console.log(`*********************************************
    >>> DB connection to: ${db.connection.name}
*********************************************`);
  } catch (error) {
    console.error(">>Error: ", error);
  }
};
