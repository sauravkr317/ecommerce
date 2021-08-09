require('dotenv').config();

export const {
    PORT,
    DB_URL,
    DOMAIN_URL,
    DEBUG_MODE,
    SECRET,
    REFRESH_SECRET,
    SESSION_SECRET
} = process.env