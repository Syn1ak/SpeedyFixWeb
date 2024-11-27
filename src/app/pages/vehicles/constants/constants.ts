import {ABaseUpsertStrategy, UpsertStrategyResolvers} from "../../../core/models/strategy/ABaseUpserStrategy";
import {VehicleViewDto} from "../../../core/dto/vehicles-dto";
import {inject} from "@angular/core";
import {VehiclesService} from "../vehicles.service";
import {map, Observable, of} from "rxjs";

export abstract class ABaseUpsertVehicleStrategy extends ABaseUpsertStrategy<VehicleViewDto> {
  protected api = inject(VehiclesService);
}

class CreateVehicleStrategy extends ABaseUpsertVehicleStrategy {
  title: string = 'Add Vehicle';
  initialValue$: Observable<VehicleViewDto> = of({
    brand: '',
    model: '',
    yearOfRelease: null,
    engineType: null,
    displacement: null,
    transmissionType: null,
    wheelRadius: null,
    registrationNumber: '',
  });
  id: number = 0;

  updateMethod$(view: VehicleViewDto) {
    return this.api.createVehicle(view)
  }
}

class UpdateVehicleStrategy extends ABaseUpsertVehicleStrategy {
  title: string = 'Edit Vehicle';
  initialValue$: Observable<VehicleViewDto> = this.api.getVehicleById(this.id)
    .pipe(map((state) => ({
      brand: state.brand,
      model: state.model,
      yearOfRelease: state.yearOfRelease,
      engineType: state.engineType,
      displacement: state.displacement,
      transmissionType: state.transmissionType,
      wheelRadius: state.wheelRadius,
      registrationNumber: state.registrationNumber,
    })))


  updateMethod$(view: VehicleViewDto) {
    return this.api.updateVehicle(view)
  }

  constructor(public id: number) {
    super();
  }
}

export const vehicleStrategies: UpsertStrategyResolvers<ABaseUpsertVehicleStrategy> = {
  create: () => new CreateVehicleStrategy(),
  edit: route => new UpdateVehicleStrategy(Number(route.params['id']))
}
