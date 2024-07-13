const errorMessage = (res, error) => {
    console.log(`Internal Service error due to ${error}`);
    return res.status(500).json({ error: "Internal Service Error", errorMessage: error.message })
}

module.exports = { errorMessage }