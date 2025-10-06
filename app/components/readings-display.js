import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ReadingsDisplayComponent extends Component {
  @service pagination;

  get readings() {
    if (!this.args.data || !Array.isArray(this.args.data)) {
      return [];
    }
    return this.args.data;
  }

  get paginatedReadings() {
    return this.pagination.getPaginatedData(this.readings);
  }

  get totalPages() {
    return this.pagination.getTotalPages(this.readings.length);
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

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
