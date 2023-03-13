const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/financeItem");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e.message);
    res.send(false);
  }
});
router.post("/read", async (req, res) => {
  try {
    const user = await User.find(req.body)
    res.send(user);
  } catch (e) {
    console.log(e.message);
    res.send(false);
  }
});

router.post("/exists", async (req, res) => {
  let exists = await User.exists(req.body);
  if(exists == null){
    return res.send(false)
  }
  res.send(true)
});
router.post("/delete", async (req, res) => {
  try {
    await User.deleteOne(req.body);
    res.send(true);
  } catch (e) {
    console.log(e.message);
    res.send(false);
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate(req.body.filter,req.body.data);
    res.send(true);
  } catch (e) {
    console.log(e.message);
    res.send(false);
  }
});

module.exports = router;
