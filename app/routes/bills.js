import Route from '@ember/routing/route';
import {
  API_ENDPOINTS,
  API_CONFIG,
  DEFAULT_DATE_RANGES,
} from '../constants/api';

export default class BillsRoute extends Route {
  async model() {
    try {
      const { START: startDate, END: endDate } = DEFAULT_DATE_RANGES.BILLS;

      const response = await fetch(
        `${API_ENDPOINTS.BILLS}?start=${startDate}&end=${endDate}`,
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

      let bills = [];
      if (jsonData.data && Array.isArray(jsonData.data)) {
        bills = jsonData.data.map((item) => ({
          id: item.id,
          type: item.type,
          ...item.attributes,
          serviceId: item.relationships?.service?.data?.id || '2080448990210',
        }));
      }

      return {
        bills: bills,
        error: null,
        totalCount: bills.length,
        dateRange: { start: startDate, end: endDate },
      };
    } catch (error) {
      return { bills: null, error: error.message };
    }
  }
}
