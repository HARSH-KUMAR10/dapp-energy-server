const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const db = require("./db");
const cors = require("cors");
const Gun = require('gun');
app.use(Gun.serve);
app.use(cors());
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center'>Welcome to the server of Energy Share</h1>"
  );
});

app.get("/createUser", (req, res) => {
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

app.get("/readUser", (req, res) => {
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

app.get("/createHolding", (req, res) => {
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

app.get("/updateWallet", (req, res) => {
  var request = req.query;
  var id = request._id;
  var wallet = request.wallet;
  db.user.updateOne({ _id: id }, { Wallet: wallet }, (err, result) => {
    console.log(result, err);
    if (err) res.json({ success: false });
    else res.json({ success: true, data: result });
  });
});

app.get("/readHoldingById", (req, res) => {
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

app.get("/readHoldings", (req, res) => {
  db.sells.find(
    { $and: [ { Active: true }, { AdminActive: true },{Sold:false}] },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/readHoldingsNotActive", (req, res) => {
  db.sells.find(
    { $and: [ { Active: true }, { AdminActive: false },{Sold:false}] },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/removeHoliding", (req, res) => {
  console.log('id:',req.query.id)
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

app.get("/adminRemoveHoliding", (req, res) => {
  console.log('id:',req.query.id)
  db.sells.findByIdAndUpdate(
    req.query.id,
    { AdminActive: false },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/approveHoliding", (req, res) => {
  console.log('id:',req.query.id)
  db.sells.findByIdAndUpdate(
    req.query.id,
    { AdminActive: true },
    (err, result) => {
      console.log(result, err);
      if (err) res.json({ success: false });
      else res.json({ success: true, data: result });
    }
  );
});

app.get("/createTransaction", (req, res) => {
  var request = req.query;
  var data = {
    From: request.from,
    To: request.to,
    Units: request.units,
    Total: request.total,
  };
  db.transactions.collection.insertOne(data, async(err, result) => {
    console.table(result);
    console.table(err);
    if(!err){
      console.log('-id:',req.query.id);
      const userObjectId = mongoose.Types.ObjectId(req.query.id);
    await db.sells.updateOne(
        {_id:userObjectId},
        { $set:{Sold: true} },
        async(err1, result1) => {
          console.log('result:\n',result1,'error:\n', err1);
          console.log('data updated : ',result1);
          if (err1) res.json({ success: false });
          else res.json({ success: true, data: result1 });
        }
      ).clone().catch(function(err){ console.log(err)});
    }else{
      res.json({success:false})
    }
  });
});


app.get("/readTransacionByEmail", (req, res) => {
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

app.get("/readTransactions", (req, res) => {
  db.transactions.find({}, (err, result) => {
    console.log(result, err);
    if (err) res.json({ success: false });
    else res.json({ success: true, data: result });
  });
});



const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
Gun({ web: server });