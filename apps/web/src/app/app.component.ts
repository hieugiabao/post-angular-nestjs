import { Component, OnInit } from '@angular/core';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'Post App';

  constructor(private authStore: AuthStore) {}

  ngOnInit() {
    this.authStore.init();
    console.log('hello');
  }
}
