import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dbConnect from '../../lib/mongodb';
import Expense from '../../models/expense';

const host = process.env.APOLLO_HOST;
const port: any = process.env.APOLLO_PORT;

dbConnect();

const typeDefs = `
  type Expense {
		_id: ID
    id: Int
    expensename: String
		category: String
		date: String
		image: String
		notes: String
		amount: Int
		user: String
  }

	input ExpenseInput {
		expensename: String
		category: String
		date: String
		image: String
		notes: String
		amount: Int
		user: String
	}

  type Query {
    getAllExpenses: [Expense],
		getExpense(expenseId: Int) : Expense
  }

	type Mutation {
		createExpense(expenseInput: ExpenseInput): Expense
		updateExpense(ID: ID!, expenseInput: ExpenseInput): Boolean
		deleteExpense(ID: ID!): Boolean
	}
`;

const resolvers = {
	Query: {
		getAllExpenses: async () => {
			const expenses = await Expense.find({})
			return expenses
		},
		getExpense: async (_: any, { expenseId }: any) => {
			const expense = await Expense.find({ where: { id: expenseId } });
			return expense[0]
		}
	},
	Mutation: {
		createExpense: async (_: any, { expenseInput: { expensename, category, date, image, notes, amount, user } }: any) => {
			const newExpense = new Expense({
				expensename,
				category,
				date,
				image,
				notes,
				amount,
				user
			});
			const expense = await newExpense.save();
			return expense;
		},
		updateExpense: async (_: any, { ID: ID, expenseInput: { expensename, category, date, image, notes, amount, user } }: any) => {
			const wasEdited = (await Expense.updateOne({ _id: ID }, {
				expensename,
				category,
				date,
				image,
				notes,
				amount,
				user
			})).modifiedCount;
			return wasEdited;
		},
		deleteExpense: async (_: any, { ID }: any) => {
			const wasDeleted = (await Expense.deleteOne({ _id: ID })).deletedCount
			return wasDeleted;
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const url = startStandaloneServer(server, {
	listen: { port: port },
});

export default function test(req: any, res: any) {
	return res.json({ hello: 'world' });
}