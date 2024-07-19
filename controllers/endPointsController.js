const dotenv = require("dotenv");
const commonFunction = require("../commonFunctions/commonFunction")

const getConfigs = async (req, res) => {

    try {
        res.status(200).json({
            appEndPoints: {
                BACKEND_URL: process.env.ET_BACKEND_URL
            }
        })

    } catch (error) {
        commonFunction.errorMessage(res, error);
    }
}

module.exports = { getConfigs };