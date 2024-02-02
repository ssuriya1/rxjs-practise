import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs-tutorial';
  subscription: Subscription = new Subscription();

  /* 
    Hot vs Cold observeables.
    Hot: Every new subscribers recieves new data which is emmitted. It's like the response changes for the API calls.
    Cold: All the subscribers recieves the common data. This uses the exising data to provide to every users.
  */

  observeableBasics() {
    let observables$ = new Observable<string>((subscribe) => {
      console.log('observable executed');
      subscribe.next('Akash');
      subscribe.next('Nair');
      subscribe.error(new Error('Failure'));
      subscribe.next('Hari');
      subscribe.complete();
      subscribe.next('Sri');

      return () => console.log('Teardown');
    });
  }

  iterativeObserveable() {
    let observables$ = new Observable<number>((subscribe) => {
      let i: number = 1;
      const interval = setInterval(() => {
        console.log('Emmitted' + i);

        subscribe.next(i++);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    });

    this.subscription = observables$.subscribe({
      complete: () => console.log('Completed'),
      error: (error) => console.log(error),
      next: (value) => console.log(value),
    });

    setTimeout(() => {
      this.subscription.unsubscribe();
      console.log('Subscription Closed');
    }, 5000);
  }

  ngOnInit(): void {
    // this.observeableBasics();
    // this.iterativeObserveable();
  }

  ngOnDestroy(): void {
    console.log('ng Destroy triggered');
  }
}
