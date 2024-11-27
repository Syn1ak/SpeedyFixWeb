import {Routes} from "@angular/router";
import {vehicleStrategies} from "./constants/constants";

export const ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () => import('./vehicles.component').then(c => c.VehiclesComponent),
  },
  {
    path: "create",
    loadComponent: () => import('./vehicle-upsert/vehicle-upsert.component').then(c => c.VehicleUpsertComponent),
    resolve: {strategy: vehicleStrategies.create},
  },
  {
    path: ":id/edit",
    loadComponent: () => import('./vehicle-upsert/vehicle-upsert.component').then(c => c.VehicleUpsertComponent),
    resolve: {strategy: vehicleStrategies.edit},
  },
]
