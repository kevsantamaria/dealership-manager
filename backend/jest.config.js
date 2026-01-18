import { createDefaultPreset } from 'ts-jest'

const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  // Esto es vital para que Jest entienda tus rutas con @/
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
