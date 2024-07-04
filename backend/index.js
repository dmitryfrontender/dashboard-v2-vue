import Fastify from 'fastify';
import cors from '@fastify/cors';
import process from 'node:process';
import sqlite3 from 'sqlite3';
import { faker } from '@faker-js/faker';
import { Server } from 'socket.io';

const API_PORT = 8080;
const SOCKET_PORT = 8081;

const USERS_NUM = 200;

const db = new sqlite3.Database(':memory:');

export const getUserFromRow = (row) => ({
  id: row.id,
  firstName: row.firstName,
  lastName: row.lastName,
  contact: {
    email: row['contact.email']
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      "contact.email" TEXT
    );
  `);

  const stmt = db.prepare('INSERT INTO users (firstName, lastName, "contact.email") VALUES (?, ?, ?)');
  for (let i = 0; i < USERS_NUM; i += 1) {
    stmt.run(faker.person.firstName(), faker.person.lastName(), faker.internet.email());
  }
  stmt.finalize();
});

export const getUsers = (page, count) => {
  const offset = (page - 1) * count;
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users LIMIT ${count} OFFSET ${offset}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map(getUserFromRow));
      }
    });
  });
};

export const getUserById = (id) => new Promise((resolve, reject) => {
  db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
    if (err) {
      reject(err);
    } else {
      resolve(getUserFromRow(row));
    }
  });
});

export const createUser = (user) => new Promise((resolve, reject) => {
  db.run(
    'INSERT INTO users (firstName, lastName, "contact.email") VALUES (?, ?, ?)',
    user.firstName,
    user.lastName,
    user.contact.email,
    function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(getUserById(this.lastID));
      }
    }
  );
});

export const deleteUser = (id) => new Promise((resolve, reject) => {
  db.run('DELETE FROM users WHERE id = ?', id, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

export const updateUser = (user) => new Promise((resolve, reject) => {
  db.run(
    'UPDATE users SET firstName = ?, lastName = ?, "contact.email" = ? WHERE id = ?',
    user.firstName,
    user.lastName,
    user.contact.email,
    user.id,
    (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(getUserById(user.id));
      }
    }
  );
});

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

new Server(SOCKET_PORT, {
  cors: {
    origin: '*'
  }
}).on('connection', (socket) => {
  const interval = setInterval(() => {
    socket.emit('ALERT', JSON.stringify({
      data: randInt(0, 100),
      timestamp: Date.now()
    }));
  }, 1000);
  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

const fastify = Fastify({ logger: true });
fastify.register(cors);

fastify.get('/users', async (req) => ({
  data: await getUsers(req.query.page ?? 1, req.query?.count ?? 10)
}));

fastify.post('/users', async (req) => ({
  data: await createUser(JSON.parse(req.body))
}));

fastify.delete('/users/:id', async (req) => {
  await deleteUser(req.params.id);
  return { data: true };
});

fastify.put('/users', async (req) => ({
  data: await updateUser(JSON.parse(req.body))
}));

try {
  await fastify.listen({ port: API_PORT }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening on http://localhost:${API_PORT}`);
    console.log(`Socket listening on http://localhost:${SOCKET_PORT}`);
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
