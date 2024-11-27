import { Pipe, PipeTransform } from '@angular/core';
import {TransmissionType, TransmissionType_l18} from "../../core/dto/vehicles-dto";

@Pipe({
  name: 'localizeTransmissionType',
  standalone: true
})
export class LocalizeTransmissionTypePipe implements PipeTransform {
  private enum = TransmissionType_l18;

  transform(value: TransmissionType): string {
    return this.enum[value];
  }

}
