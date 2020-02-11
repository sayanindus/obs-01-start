import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, interval, Observable } from 'rxjs';

import { map, filter } from "rxjs/operators";

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

    /* customObservable.pipe(map(data => {
      return 'Round ' + data + 1;
    }
    )); */

    this.firstObservable = customObservable.pipe(filter( data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round ' + (data + 1);
    }
    )).subscribe(data => {
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
