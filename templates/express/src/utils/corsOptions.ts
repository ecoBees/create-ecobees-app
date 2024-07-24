const allCorsAllowedOptions = ["GET,HEAD,PUT,PATCH,POST,DELETE"];

export const corsOptions = {
  credentials: true,
  origin: process.env.ALLOWED_ORIGIN,
  methods: allCorsAllowedOptions,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
