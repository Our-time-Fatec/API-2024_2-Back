declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    JWT_SECRET_REFRESH: string;
    DB_URI_1: string;
    DB_URI: string;
    ADMIN_PASSWORD: string;
  }
}