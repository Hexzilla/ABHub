export default {
  secret: process.env.NODE_ENV === 'production' ? (process.env.SECRET ? process.env.SECRET : 'INVALID_SECRET_KEY') : 'SECRET_DEBUG_KEY'
};
