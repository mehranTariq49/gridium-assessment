import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { API_CONFIG, DEFAULT_DATE_RANGES } from '../constants/api';

export default class ApiService extends Service {
  @tracked isLoading = false;
  @tracked error = null;

  baseUrl = API_CONFIG.BASE_URL;
  authToken = API_CONFIG.AUTH_TOKEN;

  async fetchReadings(
    meterId = API_CONFIG.METER_ID,
    start = DEFAULT_DATE_RANGES.READINGS.START,
    end = DEFAULT_DATE_RANGES.READINGS.END,
  ) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        `${this.baseUrl}/meters/${meterId}/readings?start=${start}&end=${end}`,
        {
          headers: {
            Authorization: this.authToken,
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

      return readings;
    } catch (error) {
      this.error = error.message;
      console.error('Error fetching readings:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async fetchBills(
    serviceId = API_CONFIG.SERVICE_ID,
    start = DEFAULT_DATE_RANGES.BILLS.START,
    end = DEFAULT_DATE_RANGES.BILLS.END,
  ) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        `${this.baseUrl}/services/${serviceId}/bills?start=${start}&end=${end}`,
        {
          headers: {
            Authorization: this.authToken,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      if (jsonData.data && Array.isArray(jsonData.data)) {
        return jsonData.data.map((item) => ({
          id: item.id,
          type: item.type,
          ...item.attributes,
          serviceId: item.relationships?.service?.data?.id || serviceId,
        }));
      }

      return [];
    } catch (error) {
      this.error = error.message;
      console.error('Error fetching bills:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}
