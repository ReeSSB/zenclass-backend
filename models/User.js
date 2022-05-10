const mongoose = require("mongoose");

const { objectId } = mongoose.Schema;
const userSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: [true, "first name is required"],
		trim: true,
		text: true,
	},
	last_name: {
		type: String,
		required: [true, "last name is required"],
		trim: true,
		text: true,
	},
	username: {
		type: String,
		required: [true, "username is required"],
		trim: true,
		text: true,
	},
	email: {
		type: String,
		required: [true, "email is required"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "password is required"],
	},
	contact: {
		type: Number,
		required: [true, "contact is required"],
		trim: true,
	},
	address: {
		type: String,
		required: [true, "address is required"],
	},
	gender: {
		type: String,
		enum: ["Male", "Female", "Other"],
		required: [true, "gender is required"],
	},
	bYear: {
		type: Number,
		required: [true, "bYear is required"],
	},
	bMonth: {
		type: Number,
		required: [true, "bMonth is required"],
	},
	bDay: {
		type: Number,
		required: [true, "bDay is required"],
	},
	task: {
		type: Array,
		default: [],
	},
	classes: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("User", userSchema);
