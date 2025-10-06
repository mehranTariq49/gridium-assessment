import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BillsDisplayComponent extends Component {
  @service pagination;
  @tracked expandedBillId = null;

  constructor() {
    super(...arguments);
    if (this.expandedBillId === undefined) {
      this.expandedBillId = null;
    }
  }

  get bills() {
    if (!this.args.data || !Array.isArray(this.args.data)) {
      return [];
    }
    return this.args.data;
  }

  get paginatedBills() {
    return this.pagination.getPaginatedData(this.bills);
  }

  get totalPages() {
    return this.pagination.getTotalPages(this.bills.length);
  }

  get hasNextPage() {
    return this.pagination.currentPage < this.totalPages;
  }

  get hasPreviousPage() {
    return this.pagination.currentPage > 1;
  }

  get isPreviousDisabled() {
    return !this.hasPreviousPage;
  }

  get isNextDisabled() {
    return !this.hasNextPage;
  }

  get pageNumbers() {
    const pages = [];
    const totalPages = this.totalPages;
    const currentPage = this.pagination.currentPage;
    const maxVisiblePages = 10;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ number: i, isActive: i === currentPage });
      }
    } else {
      const startPage = Math.max(1, currentPage - 4);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push({ number: i, isActive: i === currentPage });
      }
    }

    return pages;
  }

  get totalStatistics() {
    if (!this.bills.length) {
      return null;
    }

    const totalCost = this.bills.reduce((sum, bill) => {
      const cost = parseFloat(bill.cost || bill['total-cost'] || 0);
      return sum + cost;
    }, 0);

    const totalUsage = this.bills.reduce((sum, bill) => {
      const usage = parseFloat(bill.used || bill.kWh || 0);
      return sum + usage;
    }, 0);

    const avgCost = totalCost / this.bills.length;

    return {
      totalCost: totalCost.toFixed(2),
      totalUsage: totalUsage.toFixed(2),
      avgCost: avgCost.toFixed(2),
      count: this.bills.length,
    };
  }

  toggleBillDetails = (billId) => {
    if (!this) return;
    this.expandedBillId = this.expandedBillId === billId ? null : billId;
  };

  nextPage = () => {
    this.pagination.nextPage(this.totalPages);
  };

  previousPage = () => {
    this.pagination.previousPage();
  };

  goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pagination.setPage(pageNumber);
    }
  };

  periodStart(bill) {
    return bill['period-start'] ?? bill.period_start ?? null;
  }

  periodEnd(bill) {
    return bill['period-end'] ?? bill.period_end ?? null;
  }

  serviceId(bill) {
    return bill.serviceId ?? bill['service-id'] ?? bill.service_id ?? null;
  }

  totalCost(bill) {
    return bill['total-cost'] ?? bill.cost ?? 0;
  }

  usedKwh(bill) {
    return bill.used ?? bill.kWh ?? 0;
  }

  peakDemand(bill) {
    return bill.peak ?? bill.demand ?? null;
  }

  utilityAccountId(bill) {
    return bill['utility-account-id'] ?? bill.utility_account_id ?? null;
  }

  publishedOrClosing(bill) {
    return bill.published ?? bill.closing ?? null;
  }

  initialOrStart(bill) {
    return bill.initial ?? this.periodStart(bill);
  }

  isExpanded(billId) {
    if (!this || this.expandedBillId === undefined) {
      return false;
    }
    return this.expandedBillId === billId;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}
