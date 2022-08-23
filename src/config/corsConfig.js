const corsWhiteList = [
  `${process.env.PROD_DOMAIN}`,
  `${process.env.DEV_DOMAIN}`,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.indexOf(origin) !== -1) {
      callback(null, { origin: true });
    } else {
      callback(new Error('Not allowed by CORS'), { origin: false });
    }
  },
};

export default corsOptions;
