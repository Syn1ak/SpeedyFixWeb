import { Pipe, PipeTransform } from '@angular/core';
import {EngineType, EngineType_l18} from "../../core/dto/vehicles-dto";

@Pipe({
  name: 'localizeEngineType',
  standalone: true
})
export class LocalizeEngineTypePipe implements PipeTransform {
  private enum = EngineType_l18;

  transform(value: EngineType): string {
    return this.enum[value];
  }

}
