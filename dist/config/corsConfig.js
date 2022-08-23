"use strict";Object.defineProperty(exports, "__esModule", {value: true});const corsWhiteList = [
  `${process.env.PROD_DOMAIN}`,
  `${process.env.DEV_DOMAIN}`,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

exports. default = corsOptions;
