import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  router = inject(Router);

  navigate() {
    this.router.navigate(['home']);
  }
}
