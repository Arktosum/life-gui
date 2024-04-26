const FinanceUser = require("../models/financeUserSchema");
const Transaction = require("../models/transactionSchema");

const createFinanceUser = async (req, res) => {
  try {
    // Implied that unique attributes are set as required.
    const newData = new FinanceUser(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateFinanceUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await FinanceUser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deleteFinanceUser = async (req, res) => {
  try {
    const { id } = req.params;
    await FinanceUser.findByIdAndDelete(id);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const fetchAllFinanceUsers = async (req, res) => {
  try {
    const data = await FinanceUser.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const fetchFinanceUsersRegex = async (req, res) => {
  try {
    const { regex } = req.params;
    const REGEXP = new RegExp(regex, "i"); // 'i' flag for case-insensitive matching
    const users = await FinanceUser.find({ transactee: REGEXP });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const fetchAllTransactions = async (req, res) => {
  try {
    const data = await Transaction.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const payFinanceUser = async (req, res) => {};

module.exports = {
  fetchFinanceUsersRegex,
  createFinanceUser,
  updateFinanceUser,
  deleteFinanceUser,
  fetchAllFinanceUsers,
  deleteTransaction,
  fetchAllTransactions,
  payFinanceUser,
};
