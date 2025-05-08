import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlobService } from '../products/blob.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-gallery',
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  products: any[] = [];
  blobService = inject(BlobService);
  router = inject(Router);
  private location = inject(Location);

  isSpecialDays = false;
  specialDayOptions = [
    { label: 'Christmas', value: 'christmas' },
    { label: 'Easter', value: 'easter' },
    { label: "Mother's Day", value: 'mothersday' },
    { label: "Father's Day", value: 'fathersday' },
    { label: "Valentine's Day", value: 'valentinesday' },
  ];

  selectedSpecialDay: string = this.specialDayOptions[0].value;

  onSpecialDayChange() {
    console.log(this.selectedSpecialDay);
    this.loadImages('specialdays', this.selectedSpecialDay);
  }

  navigate() {
    this.location.back();
  }

  ngOnInit() {
    const categoryParam = this.route.snapshot.paramMap.get('category');
    const categoryMap = categoryParam?.trim().toLowerCase().replaceAll(' ', '');

    this.isSpecialDays = categoryMap === 'specialdays';
    console.log(this.selectedSpecialDay);
    if (this.isSpecialDays) {
      this.loadImages(categoryMap ?? '', this.selectedSpecialDay ?? '');
      return;
    }

    this.loadImages(categoryMap ?? '');
  }

  async loadImages(subfolder?: string, specialdays?: string) {
    const urls = await this.blobService.listImageUrls(subfolder, specialdays);
    this.products = urls.map((url, index) => ({
      name: `Image ${index + 1}`,
      image: url,
    }));
  }
}
