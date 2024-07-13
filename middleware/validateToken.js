const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const commonFunction = require('../commonFunctions/commonFunction');
const User = require('../models/User');
const Expense = require('../models/User');


dotenv.config();
const secretKey = process.env.SECRET_KEY;


const validateToken = async (req, res, next) => {

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ info: "Token required" })
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ info: "User not found with a given id" })
        }

        req.userId = user._id;
        next();

    } catch (error) {
        commonFunction.errorMessage(res, error)
    }
}

module.exports = validateToken;