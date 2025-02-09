const express = require('express');
const app = express();
const cors = require('cors');
const usersRouter = require('./users/user');
const accountsRouter = require('./accounts/account');
const cardsRouter = require('./cards/card');

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter, accountsRouter,cardsRouter);
app.use('/api/accounts', accountsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});