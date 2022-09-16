const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const dbName = "practica_2";
const accountCollName = "cuentas";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const getAccountsCollection = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(accountCollName);

  return collection;
};

const userExists = async (email) => {
  const collection = await getAccountsCollection();

  await client.connect();
  const res = await collection.findOne({ email });

  return {
    status: res ? true : false,
    res,
  };
};

const darDeAltaAlumno = async (user) => {
  const collection = await getAccountsCollection();
  let res = await collection.findOne({ student: user.email });

  if (!res) {
    var hashpass = await bcrypt.hash(user.pass, 10);
    await collection.insertOne({
      email: user.email,
      password: hashpass,
    });
  }
};

const darDeBajaAlumno = async (user) => {
  const collection = await getAccountsCollection();
  await collection.deleteOne({ email: user.email });
};

module.exports = { userExists, client, darDeAltaAlumno, darDeBajaAlumno };
