import config from 'gridium-assessment/config/environment';

export const API_CONFIG = {
  BASE_URL: config.APP.API_BASE_URL,
  AUTH_TOKEN: config.APP.AUTH_TOKEN,
  METER_ID: config.APP.METER_ID,
  SERVICE_ID: config.APP.SERVICE_ID,
};

export const API_ENDPOINTS = {
  READINGS: `${API_CONFIG.BASE_URL}/meters/${API_CONFIG.METER_ID}/readings`,
  BILLS: `${API_CONFIG.BASE_URL}/services/${API_CONFIG.SERVICE_ID}/bills`,
};

export const DEFAULT_DATE_RANGES = {
  READINGS: {
    START: '2023-09-01',
    END: '2023-10-01',
  },
  BILLS: {
    START: '2018-09-01',
    END: '2024-01-01',
  },
};
