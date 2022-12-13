import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	id: Number,
	amount: Number,
	category: String,
	date: String,
	expensename: String,
	image: String,
	notes: String,
	user: String
})
const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
export default Expense