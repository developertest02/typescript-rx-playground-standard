import { Observable } from 'rxjs';
import { NETWORK_MODELS } from '../data/models';
import { NetworkModel } from '../models/network-models';
export class DataService {
  getNetworkModels(): Observable<NetworkModel[] | undefined> {
    console.log(`Calling Get Network Models`);
    const result = new Observable<NetworkModel[] | undefined>((subscriber) => {
      subscriber.next(NETWORK_MODELS),
        setTimeout(() => {
          subscriber.complete();
        }, 1000);
    });
    return result;
  }

  getConnectionStatus(network: NetworkModel): Observable<string> {
    console.log(`Calling Connection Status ${network.name}`);
    const result = new Observable<string>((subscriber) => {
      subscriber.next('Connected'),
        setTimeout(() => {
          subscriber.complete();
        }, 2000);
    });
    return result;
  }
}
