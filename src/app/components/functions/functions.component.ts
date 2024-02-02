import { Component, OnInit } from '@angular/core';
import {
  Observable,
  combineLatest,
  forkJoin,
  from,
  fromEvent,
  interval,
  of,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss'],
})
export class FunctionsComponent implements OnInit {
  ngOnInit(): void {
    // this.ofFunction();
    // this.fromFunction();
    // this.observeableWithPromise();
    // this.fromEventFunction();
    // this.timerFunction();
    // this.intervalFunction();
    // this.forkJoinFunction();
    // this.combineLatestFunction();
  }

  /**
   * Converts a list of values to a observeable
   */
  ofFunction() {
    console.log('Creating using "of" function');
    of('Akash', 'Nair', 'hari').subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed'),
    });
  }

  /**
   * Converts a array of values to a observeable
   */
  fromFunction() {
    console.log('Creating using "from" function');
    from(['Akash', 'Nair', 'hari']).subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed'),
    });
  }

  /**
   * Converting a promise values into a observeable using from function rxjs
   */
  observeableWithPromise() {
    console.log('Using Promise with observeable');
    const promise = new Promise((resolve, reject) => {
      // resolve('Resolve');
      reject('Reject');
    });

    const promiseObserveable$ = from(promise);

    promiseObserveable$.subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log('Error:', err),
      complete: () => console.log('Completed'),
    });
  }

  /**
   * Creates observeables for Events using fromEvent functions
   */
  fromEventFunction() {
    const triggerButton = document.querySelector('button#trigger');
    if (triggerButton) {
      let subscription = fromEvent<MouseEvent>(
        triggerButton,
        'click'
      ).subscribe((event) => console.log(event.type, event.y, event.x));

      /* Alternate Way */

      // const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
      //   const triggerFn = (event: any) => {
      //     console.log('event triggered');
      //     subscriber.next(event);
      //   };

      //   triggerButton.addEventListener('click', triggerFn);

      //   return () => {
      //     triggerButton.removeEventListener('click', triggerFn);
      //   };
      // });

      // const subscription = triggerClick$.subscribe((event) => {
      //   console.log(event.type, event.y, event.x);
      // });

      setTimeout(() => {
        subscription.unsubscribe();
        console.log('unsubscribed');
      }, 5000);
    }
  }

  /**
   * Completes are a certain period of time (Hot Observeable)
   */
  timerFunction() {
    timer(1000).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err),
      complete: () => console.log('Completed'),
    });
  }

  /**
   * Runs until the observeable is unsubscribed. (Cold observeable)
   */
  intervalFunction() {
    const interval$ = interval(1000).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err),
      complete: () => console.log('Completed'),
    });

    setTimeout(() => {
      interval$.unsubscribe();
      console.log('unsubscribed');
    }, 5000);
  }

  /**
   * Used to Handle Multiple HTTP calls
   * @returns Complete Notification if all the HTTP call gets response
   */
  forkJoinFunction() {
    const randomUsers$ = ajax('https://random-data-api.com/api/v2/users');
    const randomBanks$ = ajax('https://random-data-api.com/api/v2/banks');
    const randomAppliances$ = ajax(
      'https://random-data-api.com/api/v2/appliances'
    );

    // randomUsers$.subscribe((ajaxResponse: any) => console.log(ajaxResponse.response.first_name));
    // randomBanks$.subscribe((ajaxResponse: any) => console.log(ajaxResponse.response.bank_name));
    // randomAppliances$.subscribe((ajaxResponse: any) => console.log(ajaxResponse.response.brand));

    forkJoin([randomUsers$, randomBanks$, randomAppliances$]).subscribe({
      next: ([userAjax, bankAjax, appliancesAjax]: any) =>
        console.log(
          `${userAjax.response.first_name} is having ${appliancesAjax.response.brand} brand car with help of ${bankAjax.response.bank_name} bank.`
        ),
      error: (err) => console.log(err),
      complete: () => console.log('Completed'),
    });
  }

  /**
   * function used to combine multiple functions of the observeables
   */
  combineLatestFunction() {
    const temperature = document.getElementById('temperature');
    const type = document.getElementById('type');

    if (temperature && type) {
      const temperature$ = fromEvent(temperature, 'input');
      const type$ = fromEvent(type, 'input');

      combineLatest([temperature$, type$]).subscribe(
        ([temperature$, type$]: any) =>
          console.log(
            `${temperature$.target['value']} is ${type$.target['value']}`
          )
      );
    }
  }
}
