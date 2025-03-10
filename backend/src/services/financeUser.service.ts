import FinanceUser from "../models/FinanceUser";

export const createFinanceUser = async (username: string) => {
    return FinanceUser.create({ username });
};

export const findFinanceUsersByName = async (username: string) => {
    return FinanceUser.find({ username: { $regex: username, $options: "i" } });
};



export const findFinanceUserById = async (_id: string) => {
    return FinanceUser.findById(_id);
};
