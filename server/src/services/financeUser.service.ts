import FinanceUser, { IFinanceUser } from '../models/financeUser.model';

export const createFinanceUser = async (username: string): Promise<IFinanceUser> => {
  const user = new FinanceUser({ username });
  return await user.save();
};

export const getAllFinanceUsers = async (): Promise<IFinanceUser[]> => {
  return await FinanceUser.find();
};

export const getFinanceUserById = async (id: string): Promise<IFinanceUser | null> => {
  return await FinanceUser.findById(id);
};

export const updateFinanceUser = async (id: string, username: string): Promise<IFinanceUser | null> => {
  return await FinanceUser.findByIdAndUpdate(id, { username }, { new: true });
};

export const deleteFinanceUser = async (id: string): Promise<IFinanceUser | null> => {
  return await FinanceUser.findByIdAndDelete(id);
};


export const getFinanceUsersByRegex = async (username: string): Promise<IFinanceUser[]> => {
  const regex = new RegExp(username, 'i'); // Case-insensitive search
  return await FinanceUser.find({ username: { $regex: regex } });
};

