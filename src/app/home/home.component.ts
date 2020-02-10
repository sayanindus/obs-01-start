import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservable: Subscription;

  constructor() { }

  ngOnInit() {
    /* this.firstObservable = interval(1000).subscribe((count) => {
      console.log(count);
    }); */
    const customObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if ( count > 3 ) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });
    this.firstObservable = customObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Completed');
    });
  }
  
  ngOnDestroy() {
    this.firstObservable.unsubscribe();
  }

}
