require('dotenv').config({ silent: true });
const custClient = require('./cust_client');
const userClient = require('./user_client');

const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Customers
app.get('/customers', (req, res) => {
  custClient.getAll(null, (err, data) => {
    if (!err) {
      res.render('customers', {
        results: data.customers,
      });
    }
  });
});

app.post('/save', (req, res) => {
  let newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  custClient.insert(newCustomer, (err, data) => {
    if (err) throw err;

    console.log('Customer created successfully', data);
    res.redirect('/');
  });
});

app.post('/update', (req, res) => {
  const updateCustomer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  custClient.update(updateCustomer, (err, data) => {
    if (err) throw err;

    console.log('Customer updated successfully', data);
    res.redirect('/');
  });
});

app.post('/remove', (req, res) => {
  custClient.remove({ id: req.body.customer_id }, (err, _) => {
    if (err) throw err;

    console.log('Customer removed successfully');
    res.redirect('/');
  });
});

// Users
app.get('/users', (req, res) => {
  userClient.getAll(null, (err, data) => {
		console.log('==data==', data)
    if (!err) {
      res.render('customers', {
        results: data.users,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running at port %d', PORT);
});
