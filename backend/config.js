const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'ec2-52-208-221-89.eu-west-1.compute.amazonaws.com', //'hattie.db.elephantsql.com',
    port: env.DB_PORT || '5432', //'5432',
    user: env.DB_USER || 'uppihwvixvddqx', //'orvldgmb',
    password: env.DB_PASSWORD || 'd01fc2f937100d5f013c1aa4c302ea3bbc8836479866657b2288eb07e3141eaa', //'QFv.jVv8aGxFkd-BtMIuNFEg9Ik20GaOm',
    database: env.DB_NAME || 'd8bjisibl81tff', //'orvldgmb',
    ssl: {rejectUnauthorized: false}
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;