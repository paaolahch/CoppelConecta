export type LatitudLongitud = {
  latitude: number;
  longitude: number;
};

export type VisitLocation = {
  name: string;
  lat: number;
  lng: number;
};

export type Visits = {
  [key: string]: {
    location: VisitLocation;
  };
};

export type Fleet = {
  [vehicleId: string]: {
    start_location: LatitudLongitud;
  };
};

export type RoutificRequestBody = {
  visits: Visits;
  fleet: Fleet;
};

export type RoutificSolution = {
  [vehicleId: string]: string[]; // e.g. { vehicle_1: ['stop_0', 'stop_1'] }
};

export type RoutificResponse = {
  solution?: RoutificSolution;
};
