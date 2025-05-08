import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { BlobService } from './blob.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, RouterLink],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  router = inject(Router);

  navigate() {
    this.router.navigate(['home']);
  }

  categories = [
    {
      title: 'Party Packs',
      description:
        'A custom-designed party pack tailored to your specific request. Typically includes a toy, a packet of chips, a sweet treat, and more. Contact us for special requests!',
    },
    {
      title: 'Chocolate Wrappers',
      description:
        'Designed and printed by our team to match your event. Perfect for sweets and chocolates. Prices may vary depending on the item.',
    },
    {
      title: 'Hampers',
      description:
        'A beautiful bundle of themed goodies, handpicked for birthdays, baby showers, holidays, or just because. Wrapped with love and bursting with delight.',
    },
    {
      title: 'Embroidery',
      description:
        'Personalized embroidery on towels, clothes, bibs, and more. Thoughtful, timeless, and stitched to perfection — one thread at a time.',
    },
    {
      title: 'Special Days',
      description:
        "Celebrate life’s little moments — from teacher appreciation gifts to end-of-year tokens, to mother's day gifts. We make the “aww” happen, so you don’t have to.",
    },
    {
      title: 'Party Stickers',
      description:
        'Custom-designed stickers for party favors, gift bags, and decor. Stick with us — we’ll make your theme pop like confetti!',
    },
  ];
}
