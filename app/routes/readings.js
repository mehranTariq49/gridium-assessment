import Route from '@ember/routing/route';
import {
  API_ENDPOINTS,
  API_CONFIG,
  DEFAULT_DATE_RANGES,
} from '../constants/api';

export default class ReadingsRoute extends Route {
  async model() {
    try {
      const { START: startDate, END: endDate } = DEFAULT_DATE_RANGES.READINGS;

      const response = await fetch(
        `${API_ENDPOINTS.READINGS}?start=${startDate}&end=${endDate}`,
        {
          headers: {
            Authorization: API_CONFIG.AUTH_TOKEN,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      const readings = [];

      if (jsonData.data && Array.isArray(jsonData.data)) {
        jsonData.data.forEach((item) => {
          const attributes = item.attributes;
          if (attributes && attributes.readings) {
            Object.keys(attributes.readings).forEach((unit) => {
              const unitReadings = attributes.readings[unit];
              if (unitReadings && typeof unitReadings === 'object') {
                Object.entries(unitReadings).forEach(([timestamp, value]) => {
                  readings.push({
                    timestamp: timestamp,
                    value: value,
                    unit: unit,
                    serviceId: item.id,
                    isApprox: attributes['is-approx'] || false,
                  });
                });
              }
            });
          }
        });
      }

      readings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      return {
        readings: readings,
        error: null,
        totalCount: readings.length,
        dateRange: { start: startDate, end: endDate },
      };
    } catch (error) {
      return { readings: null, error: error.message };
    }
  }
}
