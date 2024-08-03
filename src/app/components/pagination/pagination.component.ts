import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  pagination = {
    limitItem: 2,
    currentPage: 1,
    totalPage: 5,
  };
  
  @Output() urlChange: EventEmitter<string> = new EventEmitter<string>();
  urlForFetch: string = "";

  constructor(
    private paginationService: PaginationService,
  ) {}

  ngOnInit() {
    return this.handleGetTotalPages();
  }

  handleGetTotalPages() {
    this.paginationService.getTotalPages().subscribe((res: any) => {
      this.pagination.totalPage = Math.ceil(res.data.amountUser / this.pagination.limitItem);
    });
  }

  createRange(total: number): number[] {
    return Array(total).fill(0).map((x, i) => i + 1);
  }

  handlePagination(page: number, idxPage: number) {
    this.pagination.currentPage = page;
    this.urlForFetch = this.paginationService.requestApi(idxPage);
    this.urlChange.emit(this.urlForFetch);
  }
}
