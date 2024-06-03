require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    DB_URL : `mongodb://localhost:27017/crm_db_old` 
}