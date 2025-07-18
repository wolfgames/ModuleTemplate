import { OriginConfig, DEFAULT_ORIGIN_CONFIG } from '@wolfgames/module-kit';

// Modify this object to update the origin configuration
const customOriginConfig: OriginConfig = {
  allowedOrigins: [
    "http://localhost:9005",
    "http://localhost:9007",
    "http://localhost:3000",
  ]
};

// region Frozen
export const originConfig: OriginConfig = {
  ...DEFAULT_ORIGIN_CONFIG,
  ...customOriginConfig
};
// endregion Frozen