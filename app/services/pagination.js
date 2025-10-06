import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PaginationService extends Service {
  @tracked currentPage = 1;
  @tracked itemsPerPage = 30;

  setPage(pageNumber) {
    this.currentPage = pageNumber;
  }

  nextPage(totalPages) {
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  resetPage() {
    this.currentPage = 1;
  }

  getPaginatedData(data) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  getTotalPages(dataLength) {
    return Math.ceil(dataLength / this.itemsPerPage) || 1;
  }
}
