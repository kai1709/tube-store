require('dotenv').config();

const config = {
  allowedMedia: ['jpg', 'jpeg', 'png', 'gif', 'avi', 'mov', '3gp', 'mp4', 'mkv', 'mpeg', 'mpg', 'mp3', 'pdf'],
  baseUrl: process.env.BASE_URL,
  ddosConfig: {
    burst: process.env.DDOS_BRUST,
    limit: process.env.DDOS_LIMIT,
  },
  env: process.env.NODE_ENV,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_INTERVAL,
  jwtSecret: process.env.JWT_SECRET,
  mongo: { uri: process.env.DB_CONNECTION_STRING },
  port: process.env.PORT,
  website: process.env.WEBSITE,
  whitelist: [null, undefined, 'null'].includes(process.env.WHITE_LIST) ? null : process.env.WHITE_LIST.split(','),
};

export default config