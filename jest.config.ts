import { config } from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env.dev
config({ path: '.env.dev' });

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Define a pasta de testes
  // testTimeout: 10000,
};
