const commonFunction = require('../commonFunctions/commonFunction');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const userRegisteration = async (req, res) => {

    const { userName, email, password } = req.body;
    try {
        const userMail = await User.find({ email });
        if (!userMail) {
            return res.status(400).json({ info: "Email is already taken" });
        };

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            userName,
            email,
            password: hashedPassword
        })
        await user.save();
        res.status(200).json({ message: "Registered successfully" })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Incorrect Email" });
        }
        const decodedPassword = await bcrypt.compare(password, user.password);
        if (!user || !decodedPassword) {
            return res.status(404).json({ error: "Incorrect email or password" })
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });

        res.status(200).json({ message: "Login Successfull", token: token })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const getUsers = async (req, res) => {

    try {
        const users = await User.find().populate('expense');
        res.status(200).json({ users })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate('expense');
        if (!user) {
            return res.status(404).json({ info: "user not found with the given id" })
        }
        res.status(200).json(
            userDetails = {
                _id: user._id,
                userName: user.userName,
                email: user.email
            }
        );

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ info: "User not found with the given id" })
        }
        res.status(200).json(user)

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const changePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userMail = await User.findOne({ email });
        if (!userMail) {
            return res.status(404).json({ error: "Email Is Incorrect or not found" });
        };

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.findByIdAndUpdate(
            { _id: userMail._id },
            { $set: { password: hashedPassword } },
            { new: true }
        )
        res.status(200).json({ message: "Password Changed successfully" })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

const updateUserDetailsById = async (req, res) => {
    const { userName, email } = req.body;
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found with the given id" });
        };

        await User.findByIdAndUpdate(
            { _id: user._id },
            { $set: { userName: userName, email: email } },
            { new: true }
        )


        res.status(200).json({ message: "Details Updated successfully" })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

module.exports = { userRegisteration, userLogin, getUsers, getUserById, deleteUser, changePassword, updateUserDetailsById };