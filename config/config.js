const config={
    ENV:process.env.NODE_ENV,
    app:{
        SECRET_KEY:process.env.SECRET_KEY,
        IV:process.env.IV,
        MESSAGE_MIN_COUNT:process.env.MESSAGE_MIN_COUNT,
        MESSAGE_MAX_COUNT:process.env.MESSAGE_MAX_COUNT,
    }

}
module.exports = config;