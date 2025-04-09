import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { BlobService } from './blob.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CarouselModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  blobService = inject(BlobService);
  router = inject(Router);

  navigate() {
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
    this.loadImages();
  }

  async loadImages() {
    const urls = await this.blobService.listImageUrls();

    this.products = urls.map((url, index) => ({
      name: `Image ${index + 1}`,
      image: url,
    }));
  }
}
