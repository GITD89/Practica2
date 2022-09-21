const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const dbName = "practica_2";
const accountCollName = "cuentas";
const profileCollName = "perfiles";
const timeCollName = "horarios";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const getAccountsCollection = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(accountCollName);

  return collection;
};

const getCustomCollection = async (name) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(name);

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

const obtenerPerfiles = async () => {
  const collection = await getCustomCollection(profileCollName);

  const data = await collection.find({}).toArray();

  return data;
};

const insertarHorario = async (data) => {
  const collection = await getCustomCollection(timeCollName);

  await collection.insertOne(data);
};

const getHorarioPerStudent = async (matricula) => {
  const collection = await getCustomCollection(timeCollName);

  const data = await collection.find({ alumno: matricula }).toArray();

  return data;
};

const getHorarioPerTeacher = async (matricula) => {
  const collection = await getCustomCollection(timeCollName);

  const data = await collection.find({ teacher: matricula }).toArray();

  return data;
};

const subirPerfil = async (perfil) => {
  const collection = await getCustomCollection(profileCollName);

  await collection.insertOne(perfil);
};

const removerPerfil = async (matricula) => {
  const collection = await getCustomCollection(profileCollName);
  await collection.deleteOne({ matricula: matricula });
};

const removerClase = async (id) => {
  const collection = await getCustomCollection(timeCollName);
  await collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  userExists,
  client,
  darDeAltaAlumno,
  darDeBajaAlumno,
  obtenerPerfiles,
  insertarHorario,
  getHorarioPerStudent,
  getHorarioPerTeacher,
  subirPerfil,
  removerPerfil,
  removerClase,
};
