import TransactionUser from "../models/TransactionUser";

export const createTransactionUser = async (username: string) => {
    return TransactionUser.create({ username });
};

export const findTransactionUsersByName = async (username: string) => {
    return TransactionUser.find({ username: { $regex: username, $options: "i" } });
};



export const findTransactionUserById = async (_id: string) => {
    return TransactionUser.findById(_id);
};
