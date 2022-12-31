import { Component, OnInit } from '@angular/core';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(private authStore: AuthStore) {}

  ngOnInit() {
    this.authStore.init();
  }
}
