const {
	validateEmail,
	validateLength,
	validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// exports.home = (req, res) => {
// 	res.send("Welcome userHome!");
// };
exports.register = async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			username,
			email,
			password,
			contact,
			address,
			gender,
			bYear,
			bMonth,
			bDay,
			task,
			classes,
		} = req.body;
		if (!validateEmail(email)) {
			return res.status(400).json({ message: "Invalid email address" });
		}

		const check = await User.findOne({ email });
		if (check) {
			return res.status(400).json({
				message: "Email address already exist, try with different email Id.",
			});
		}
		if (!validateLength(first_name, 3, 30)) {
			return res.status(400).json({
				message: "First name must be between 3 and 30 characters.",
			});
		}
		if (!validateLength(last_name, 3, 30)) {
			return res.status(400).json({
				message: "Last name must be between 3 and 30 characters.",
			});
		}
		if (!validateLength(password, 6, 40)) {
			return res.status(400).json({
				message: "Password must be atleast 6 characters",
			});
		}

		const cryptedPassword = await bcrypt.hash(password, 12);
		let tempUsername = first_name + last_name;
		let newUsername = await validateUsername(tempUsername);

		const user = await new User({
			first_name,
			last_name,
			username: newUsername,
			email,
			password: cryptedPassword,
			contact,
			address,
			gender,
			bYear,
			bMonth,
			bDay,
			task,
			classes,
		}).save();

		const emailVerificationToken = generateToken(
			{ id: user._id.toString() },
			"1d"
		);
		console.log(emailVerificationToken);
		res.send(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid Email, please check!" });
		}
		const check = await bcrypt.compare(password, user.password);
		if (!check) {
			return res.status(400).json({
				message: "Invalid Credential. Please check!",
			});
		}

		const token = generateToken({ id: user._id.toString() }, "1d");
		res.send({
			id: user._id,
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			token: token,
			message: "Logged In Suceessfully!",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
