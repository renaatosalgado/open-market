import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const hasEmail = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (hasEmail.rowCount !== 0) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [name, email, passwordHash]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (user && bcrypt.compareSync(password, user.rows[0].senha)) {
      const token = uuid();

      await db.query(
        "INSERT INTO sessoes ('idUsuario', token) VALUES ($1, $2)",
        [user.rows[0].id, token]
      );

      res.send({ token: token, name: user.rows[0].name });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
