import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:any = [];
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;
  pages: number[] = [];
  pageSizes = [10, 20,30, 50,100]; // Define available page sizes
  constructor(private dataService: ProductServiceService) { }

  ngOnInit(): void {
    this.fetchProducts();
    console.log(this.products);
  }

  fetchProducts(): void {
    this.dataService.getProducts(this.page, this.size).subscribe((response:any) => {
      this.products = response.response.content;
      this.totalPages = response.response.totalPages;
      this.totalElements = response.response.totalElements;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.fetchProducts();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchProducts();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchProducts();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.size = parseInt(target.value, 10);
    this.page = 0; // Reset to first page
    this.fetchProducts();
  }

  getShowingRange(): string {
    const start = this.page * this.size + 1;
    const end = Math.min((this.page + 1) * this.size, this.totalElements);
    return `Showing ${start} to ${end} of ${this.totalElements}`;
  }

  getPagesToShow(): (any)[] {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (this.totalPages <= maxPagesToShow) {
      for (let i = 0; i < this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.page <= halfMaxPages) {
        for (let i = 0; i < maxPagesToShow; i++) {
          pages.push(i);
        }
        pages.push('...', this.totalPages - 1);
      } else if (this.page >= this.totalPages - halfMaxPages - 1) {
        pages.push(0, '...');
        for (let i = this.totalPages - maxPagesToShow; i < this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0, '...');
        for (let i = this.page - halfMaxPages; i <= this.page + halfMaxPages; i++) {
          pages.push(i);
        }
        pages.push('...', this.totalPages - 1);
      }
    }
    return pages;
  }
}
