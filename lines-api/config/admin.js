module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e43af61c896d9c0b8c03f0d796ddaf64'),
  },
});
