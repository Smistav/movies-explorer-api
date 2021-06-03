module.exports.PORT = process.env.PORT || 3000;
module.exports.MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb';
module.exports.LIMITER = { windowMs: 15 * 60 * 1000, max: 100 };
