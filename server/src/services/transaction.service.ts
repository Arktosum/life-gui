import Transaction, { ITransaction } from '../models/transaction.model';

export const createTransaction = async (data: Partial<ITransaction>): Promise<ITransaction> => {
    const transaction = new Transaction(data);
    return await transaction.save();
};

export const getAllTransactions = async (): Promise<ITransaction[]> => {
    return await Transaction.find().populate('transactee');
};

export const getTransactionById = async (id: string): Promise<ITransaction | null> => {
    return await Transaction.findById(id).populate('transactee');
};

export const updateTransaction = async (id: string, data: Partial<ITransaction>): Promise<ITransaction | null> => {
    return await Transaction.findByIdAndUpdate(id, data, { new: true }).populate('transactee');
};

export const deleteTransaction = async (id: string): Promise<ITransaction | null> => {
    return await Transaction.findByIdAndDelete(id);
};



export const getBalance = async (id: string): Promise<number | null> => {
    const result = await Transaction.aggregate([
        {
            $match: {
                id,
            },
        },
        {
            $group: {
                _id: null,
                balance: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'PAID'] },
                            {
                                $cond: [
                                    { $eq: ['$mode', 'SEND'] },
                                    { $multiply: [-1, '$amount'] },
                                    '$amount',
                                ],
                            },
                            0,
                        ],
                    },
                },
            },
        },
    ]);

    return result[0]?.balance || 0;
};

export const getDailySpending = async (id: string): Promise<number | null> => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await Transaction.aggregate([
        {
            $match: {
                id,
                mode: 'SEND',
                completedAt: { $gte: startOfDay, $lte: endOfDay },
            },
        },
        {
            $group: {
                _id: null,
                spentToday: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'PAID'] },
                            '$amount',
                            0,
                        ],
                    },
                },
            },
        },
    ]);

    const spentToday = result[0]?.spentToday || 0;
    return spentToday;

};


export const getWeeklySpending = async (id: string): Promise<number | null> => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const result = await Transaction.aggregate([
        {
            $match: {
                id,
                mode: 'SEND',
                createdAt: { $gte: startOfWeek, $lte: endOfWeek },
            },
        },
        {
            $group: {
                _id: null,
                spentWeek: {
                    $sum: {
                        $cond: [
                            { $eq: ['$status', 'PAID'] },
                            '$amount',
                            0,
                        ],
                    },
                },
            },
        },
    ]);

    const spentWeek = result[0]?.spentWeek || 0;
    return spentWeek
};



