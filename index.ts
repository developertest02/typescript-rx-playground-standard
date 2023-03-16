// Import stylesheets
import './style.css';
screenLog.init();

import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { range } from 'rxjs/observable/range';
import { combineLatest } from 'rxjs/observable/combineLatest';
import {
  filter,
  withLatestFrom,
  map,
  shareReplay,
  debounceTime,
  skip,
  take,
  concat,
  merge,
  tap,
  startWith,
  bufferWhen,
  buffer,
  zip,
  delay,
  delayWhen,
  flatMap,
  combineAll,
} from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { interval } from 'rxjs/observable/interval';
import { DataService } from './services/data-service';
import { concatAll } from 'rxjs/operators/concatAll';
import { mergeAll } from 'rxjs/operators/mergeAll';
import { NetworkModel, NetworkModelWithStatus } from './models/network-models';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { mergeMap } from 'rxjs/operators/mergeMap';
const collection1 = of([1, 2, 3, 4, 5]);
const collection2 = of([6, 7, 8, 9, 10]);

function combineLatestExample(): void {
  const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
  const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
  const combinedTimers = combineLatest([firstTimer, secondTimer]);

  combinedTimers.subscribe((value) => console.log(value));
}

interface Person {
  firstName: string;
  lastName: string;
}

const ds = new DataService();
function filterThePeople(): void {
  const networkModels = ds.getNetworkModels();
  const networkWithStatus = networkModels.pipe(
    mergeMap((response) =>
      response.map((nv) =>
        ds.getConnectionStatus(nv).pipe(
          tap((status) => (nv.connectionInfo.status = status)),
          map(() => nv)
        )
      )
    )
  );

  
}
//combineLatestExample();
