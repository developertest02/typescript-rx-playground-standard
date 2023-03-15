export interface NetworkModel {
  id: string;
  name: string;
  connectionInfo: {
    status: string;
    url: string;
  };
}
export interface NetworkModelWithStatus {
  network: NetworkModel;
  status: string;
}
