const config={
    ENV:process.env.NODE_ENV,
    app:{
        EMITTER_SERVICE_PORT:process.env.EMITTER_SERVICE_PORT,
        SECRET_KEY:process.env.SECRET_KEY,
        IV:process.env.IV,
        MESSAGE_MIN_COUNT:process.env.MESSAGE_MIN_COUNT,
        MESSAGE_MAX_COUNT:process.env.MESSAGE_MAX_COUNT,
        EMITTER_SERVICE_INTERVAL:process.env.EMITTER_SERVICE_INTERVAL
    }

}
module.exports = config;