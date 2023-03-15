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
import { firstValurFrom } from 'rxjs/index';
const collection1 = of([1, 2, 3, 4, 5]);
const collection2 = of([6, 7, 8, 9, 10]);
//const observable = interval(1000);
let result$: NetworkModelWithStatus[] = [];
const ds = new DataService();

function run2() {
  const networks = ds.getNetworkModels();
  const obs$: Observable<NetworkModel>[] = [];
  networks.forEach((networksResponse) => {
    networksResponse.forEach((singleNetworkResponse) => {
      const xer = ds.getConnectionStatus(singleNetworkResponse).pipe(
        tap(
          (statusValue) =>
            (singleNetworkResponse.connectionInfo.status = statusValue)
        ),
        map(() => singleNetworkResponse)
      );
      obs$.push(xer);
    });
  });
  //dds
  const perp = forkJoin(obs$);
  perp.subscribe((n) => console.log(n));
}
function run() {
  const networks = ds.getNetworkModels();

  let maps$: Observable<NetworkModelWithStatus>[] = [];
  networks.forEach((network) => {
    maps$ = withConnections(network);
  });
  const ppe = forkJoin(maps$).pipe(
    tap((models) => {
      models.forEach((model) => {
        model.network.connectionInfo.status = model.status;
      });
    })
  );
  ppe.subscribe((n) => console.log(n));
}
function networksWithStatus(
  models: NetworkModel[]
): Observable<NetworkModel>[] {
  let maps$: Observable<NetworkModelWithStatus>[] = withConnections(models);

  models.forEach((network) => {
    maps$ = withConnections(network);
  });
}
function withConnections(
  models: NetworkModel[]
): Observable<NetworkModelWithStatus>[] {
  console.log(`Getting Map Status for models`);
  const result: Observable<NetworkModelWithStatus>[] = [];
  models.forEach((item) => {
    result.push(withConnection(item));
  });
  return result;
}
function withConnection(
  model: NetworkModel
): Observable<NetworkModelWithStatus> {
  console.log(`Getting Map Status for ${model.name}`);
  const result = ds.getConnectionStatus(model).pipe(
    map((value) => {
      const ws: NetworkModelWithStatus = {
        network: model,
        status: value,
      };
      return ws;
    })
  );
  return result;
}
run2();
