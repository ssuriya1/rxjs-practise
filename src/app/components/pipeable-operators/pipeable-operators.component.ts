import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  filter,
  fromEvent,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-pipeable-operators',
  templateUrl: './pipeable-operators.component.html',
  styleUrls: ['./pipeable-operators.component.scss'],
})
export class PipeableOperatorsComponent implements OnInit {
  // (source -> operator) -> oberver
  ngOnInit(): void {
    // this.concatMapOperator();
    // this.switchMapOperator();
    this.mergeMapOperator();
  }

  filterOperator() {}

  concatMapOperator() {
    /*
    const source$ = new Observable((subscriber) => {
      setTimeout(() => subscriber.next('A'), 2000);
      setTimeout(() => subscriber.next('B'), 5000);
    });

    console.log('App has started');
    source$
      .pipe(concatMap((value) => of(1, 2)))
      .subscribe((value) => console.log(value));
    */
    const input: any = document.querySelector('input');
    const fetchButton: any = document.querySelector('button');
    fromEvent(fetchButton, 'click')
      .pipe(
        map(() => input.value),
        concatMap((value) =>
          ajax(`https://random-data-api.com/api/v2/${value}`).pipe(
            // The EMPTY will make the error to compelete notification.
            catchError(() => EMPTY)
          )
        )
        // catchError(() => EMPTY) // Subscription will end here.
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log('error', err),
        complete: () => console.log('Completed'),
      });
  }

  switchMapOperator() {
    const input: any = document.querySelector('input');
    const fetchButton: any = document.querySelector('button');
    fromEvent(fetchButton, 'click')
      .pipe(
        map(() => input.value),
        switchMap((value) =>
          ajax(`https://random-data-api.com/api/v2/${value}`).pipe(
            // The EMPTY will make the error to compelete notification.
            catchError(() => EMPTY)
          )
        )
        // catchError(() => EMPTY) // Subscription will end here.
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log('error', err),
        complete: () => console.log('Completed'),
      });
  }

  mergeMapOperator() {
    const input: any = document.querySelector('input');
    const fetchButton: any = document.querySelector('button');
    fromEvent(fetchButton, 'click')
      .pipe(
        map(() => input.value),
        mergeMap((value) =>
          ajax(`https://random-data-api.com/api/v2/${value}`).pipe(
            // The EMPTY will make the error to compelete notification.
            catchError(() => EMPTY)
          )
        )
        // catchError(() => EMPTY) // Subscription will end here.
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log('error', err),
        complete: () => console.log('Completed'),
      });
  }
}

interface sample {
  type: 'business' | 'sport';
  value: string;
}
