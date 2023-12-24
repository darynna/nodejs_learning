const express = require('express');
const uuid = require('uuid').v4;
const cors = require('cors');
const fs = require('fs').promises;

const app = express();

// MIDDLEWARES =========================
app.use(express.json());
app.use(cors());

// custom global MW
app.use((req, res, next) => {
  console.log('Hello from middleware!!');

  req.time = new Date().toLocaleString('uk-UA');

  next();
});

// custom get user middleware
app.use('/users/:id', async (req, res, next) => {
  const { id } = req.params;

  const usersDB = await fs.readFile('models.json');

  const users = JSON.parse(usersDB);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      msg: 'User does not exist..',
    });
  }

  req.user = user;

  next();
});

// CONTROLLERS ===============================
app.get('/ping', (req, res) => {
  // res.sendStatus(201);
  // res.status(200).send('<h1>Hello from server =^^=</h1>');
  res.status(200).json({
    msg: 'pong!',
    date: req.time,
  });
});

/** HTTP methods==========
 * POST, GET, PUT, PATCH, DELETE
 *
 * REST API (CRUD operations)
 * POST       /users            - create user
 * GET        /users            - get users list
 * GET        /users/<userID>   - get one user
 * PATCH      /users/<userID>   - update one user
 * DELETE     /users/<userID>   - delete one user
 */

app.post('/users', async (req, res) => {
  try {
    const { name, year } = req.body;

    // :TODO req.body validation

    const newUser = {
      name,
      year,
      id: uuid(),
    };

    // save to DB
    const usersDB = await fs.readFile('models.json');

    const users = JSON.parse(usersDB);

    users.push(newUser);

    await fs.writeFile('models.json', JSON.stringify(users));

    // response sending
    res.status(201).json({
      msg: 'Success!',
      user: newUser,
    });
  } catch (err) {
    console.log(err);

    res.sendStatus(500); // internal server error
  }
});

app.get('/users', async (req, res) => {
  try {
    const usersDB = await fs.readFile('models.json');

    const users = JSON.parse(usersDB);

    res.status(200).json({
      msg: 'Success!',
      users,
    });
  } catch (err) {
    console.log(err);

    res.sendStatus(500); // internal server error
  }
});

app.get('/users/:id', (req, res) => {
  res.status(200).json({
    msg: 'Success!',
    user: req.user,
  });
});

// app.patch('/users/:id', async (req, res) => {});
// app.delete('/users/:id', async (req, res) => {});

// SERVER INIT =========================
const port = 3001;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}..`);
});
