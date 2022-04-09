const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const db = require("./db");
const cors = require("cors");
const e = require("express");
const { request } = require("express");

app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center'>Welcome to the server of Energy Share</h1>"
  );
});

app.get("/api/createUser", (req, res) => {
  var request = req.query;
  var data = {
    Email: request.email,
    Password: request.password,
    Wallet: 0,
  };
  db.user.collection.insertOne(data, (err, result) => {
    console.log(result, err);
    if (result === undefined) res.json({ success: false });
    else res.json({ success: true, data: result });
  });
});

app.get("/api/readUser", (req, res) => {
  var request = req.query;
  db.user.findOne(
    { Email: request.email, Password: request.password },
    (err, result) => {
      console.log(result, err);
      if (err || result === null || result === undefined)
        res.json({ success: false });
      else {
        var user = {
          id: result._id,
          email: result.Email,
          wallet: result.Wallet,
        };
        res.json({ success: true, data: user });
      }
    }
  );
});

app.get("/api/createHolding", (req, res) => {
  var request = req.query;
  var data = {
    Email: request.email,
    Id: request.id,
    Units: request.units,
    Price: request.price,
    Active: true,
    AdminActive: false,
    Sold: false,
  };
  console.log(data);
  db.sells.collection.insertOne(data, (err, result) => {
    console.log(result, err);
    if (err) res.json({ success: false });
    else res.json({ success: true, data: result });
  });
});

app.get("/api/updateWallet", (req, res) => {
  var request = req.query;
  var id = request._id;
  var wallet = request.wallet;
  db.user.updateOne({ _id: id }, { Wallet: wallet }, (err, result) => {
    console.log(result, err);
    if (err) res.json({ success: false });
    else res.json({ success: true, data: result });
  });
});

app.get("/api/readHoldingById", (req, res) => {
  var request = req.query;
  db.sells.find(
    { $and: [{ Id: request.id }, { Active: true }] },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/api/readHoldings", (req, res) => {
  db.sells.find(
    { $and: [ { Active: true }, { AdminActive: true },{Sold:false}] },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/api/removeHoliding", (req, res) => {
  db.sells.updateOne(
    { _id: req.query.id },
    { Active: false },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/api/createTransaction", (req, res) => {
  var request = req.query;
  var data = {
    From: request.from,
    To: request.to,
    Units: request.units,
    Total: request.total,
  };
  db.transactions.collection.insertOne(data, (err, result) => {
    console.table(result, err);
    db.sells.updateOne(
        { _id: req.query.id },
        { Sold: true },
        (err, result) => {
          console.log(result, err);
          if (err) res.json({ success: false });
          else res.json({ success: true, data: result });
        }
      );
  });
});

app.get("/api/readTransacionByEmail", (req, res) => {
  var request = req.query;
  var Emails = request.email;
  db.transactions.find(
    { $or: [{ From: Emails }, { To: Emails }] },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/api/readTransactions", (req, res) => {
  db.transactions.find({}, (err, result) => {
    console.log(result, err);
    if (err) res.json({ success: false });
    else res.json({ success: true, data: result });
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
