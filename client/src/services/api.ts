// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface FinanceUser {
    _id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}
export type TransactionCategory =
    | "FOOD"
    | "TRANSPORT"
    | "RENT"
    | "SALARY"
    | "GROOMING"
    | "EDUCATION"
    | "OTHER";
export type TransactionStatus = "PAID" | "PENDING";
export type TransactionMode = "SEND" | "RECEIVE";


export interface Transaction {
    _id: string;
    transactee: string;
    amount: number;
    category: TransactionCategory;
    status: TransactionStatus;
    mode: TransactionMode;
    remarks?: string;
    completedAt: string;
    createdAt: string;
    updatedAt: string;
}

export const ORIGIN = 'https://life-gui.onrender.com:3000/api'
// export const ORIGIN = 'http://localhost:3000/api/'
// export const ORIGIN = 'http://192.168.0.187:3000/api'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: ORIGIN }),
    tagTypes: ['FinanceUser', 'Transaction'],
    endpoints: (builder) => ({
        getFinanceUsers: builder.query<FinanceUser[], void>({
            query: () => 'financeusers',
            providesTags: ['FinanceUser'],
        }),
        getFinanceUser: builder.query<FinanceUser, string>({
            query: (_id) => `financeusers/${_id}`,
            providesTags: ['FinanceUser'],
        }),
        createFinanceUser: builder.mutation<FinanceUser, Partial<FinanceUser>>({
            query: (body) => ({
                url: 'financeusers',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FinanceUser'],
        }),
        getTransactions: builder.query<Transaction[], void>({
            query: () => 'transactions',
            providesTags: ['Transaction'],
        }),
        createTransaction: builder.mutation<Transaction, Partial<Transaction>>({
            query: (body) => ({
                url: 'transactions',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Transaction'],
        }),
        searchFinanceUsers: builder.query<FinanceUser[], string>({
            query: (username) => `financeusers/search?username=${encodeURIComponent(username)}`,
        }),

        getBalance: builder.query<number, void>({
            query: () => `transactions/spending/balance`,
        }),
        getDailySpending: builder.query<number, void>({
            query: () => `transactions/spending/daily`,
        }),
        getWeeklySpending: builder.query<number, void>({
            query: () => `transactions/spending/weekly`,
        }),
    }),
});

export const {
    useGetFinanceUsersQuery,
    useCreateFinanceUserMutation,
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    useSearchFinanceUsersQuery,
    useGetFinanceUserQuery,
    useGetBalanceQuery,
    useGetDailySpendingQuery,
    useGetWeeklySpendingQuery,
} = api;
