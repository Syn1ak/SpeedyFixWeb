import {EnumToSelectList} from "../utils/enum-to-select-list.util";
import {UserDto} from "./auth-dto";

export interface VehicleDto {
  id: number;
  brand: string;
  model: string;
  yearOfRelease: number;
  engineType: EngineType;
  displacement: number;
  transmissionType: TransmissionType;
  wheelRadius: number;
  registrationNumber: string;
  // TODO: must be replaced with Customer Dto
  owner: UserDto;
}

export interface VehicleViewDto {
  id?: number;
  brand: string;
  model: string;
  yearOfRelease: number;
  engineType: EngineType;
  displacement: number;
  transmissionType: TransmissionType;
  wheelRadius: number;
  registrationNumber: string;
  ownerId?: number;
}

export enum EngineType {
  PETROL_NATURALLY_ASPIRATED = 'PETROL_NATURALLY_ASPIRATED',
  PETROL_SUPERCHARGED = 'PETROL_SUPERCHARGED',
  PETROL_TURBO = 'PETROL_TURBO',
  PETROL_NATURALLY_ASPIRATED_HYBRID = 'PETROL_NATURALLY_ASPIRATED_HYBRID',
  PETROL_SUPERCHARGED_HYBRID = 'PETROL_SUPERCHARGED_HYBRID',
  PETROL_TURBO_HYBRID = 'PETROL_TURBO_HYBRID',
  DIESEL_NATURALLY_ASPIRATED = 'DIESEL_NATURALLY_ASPIRATED',
  DIESEL_SUPERCHARGED = 'DIESEL_SUPERCHARGED',
  DIESEL_TURBO = 'DIESEL_TURBO',
  DIESEL_NATURALLY_ASPIRATED_HYBRID = 'DIESEL_NATURALLY_ASPIRATED_HYBRID',
  DIESEL_SUPERCHARGED_HYBRID = 'DIESEL_SUPERCHARGED_HYBRID',
  DIESEL_TURBO_HYBRID = 'DIESEL_TURBO_HYBRID',
  ELECTRIC = 'ELECTRIC',
}

export const EngineType_l18 = {
  [EngineType.PETROL_NATURALLY_ASPIRATED]: 'Petrol Naturally Aspirated',
  [EngineType.PETROL_SUPERCHARGED]: 'Petrol Supercharged',
  [EngineType.PETROL_TURBO]: 'Petrol Turbocharged',
  [EngineType.PETROL_NATURALLY_ASPIRATED_HYBRID]: 'Petrol Naturally Aspirated Hybrid',
  [EngineType.PETROL_SUPERCHARGED_HYBRID]: 'Petrol Supercharged Hybrid',
  [EngineType.PETROL_TURBO_HYBRID]: 'Petrol Turbocharged Hybrid',
  [EngineType.DIESEL_NATURALLY_ASPIRATED]: 'Diesel Naturally Aspirated',
  [EngineType.DIESEL_SUPERCHARGED]: 'Diesel Supercharged',
  [EngineType.DIESEL_TURBO]: 'Diesel Turbocharged',
  [EngineType.DIESEL_NATURALLY_ASPIRATED_HYBRID]: 'Diesel Naturally Aspirated Hybrid',
  [EngineType.DIESEL_SUPERCHARGED_HYBRID]: 'Diesel Supercharged Hybrid',
  [EngineType.DIESEL_TURBO_HYBRID]: 'Diesel Turbocharged Hybrid',
  [EngineType.ELECTRIC]: 'Electric',
};

export enum TransmissionType {
  MANUAL = 'MANUAL',
  TORQUE_CONVERTER = 'TORQUE_CONVERTER',
  CONTINUOUSLY_VARIABLE = 'CONTINUOUSLY_VARIABLE',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
  DUAL_CLUTCH = 'DUAL_CLUTCH',
}

export const TransmissionType_l18 = {
  [TransmissionType.MANUAL]: 'Manual',
  [TransmissionType.TORQUE_CONVERTER]: 'Torque Converter',
  [TransmissionType.CONTINUOUSLY_VARIABLE]: 'Continuously Variable Transmission (CVT)',
  [TransmissionType.SEMI_AUTOMATIC]: 'Semi-Automatic',
  [TransmissionType.DUAL_CLUTCH]: 'Dual Clutch Transmission (DCT)',
};

export const getEngineTypes = () => EnumToSelectList<EngineType>(EngineType_l18);

export const getTransmissionTypes = () => EnumToSelectList<TransmissionType>(TransmissionType_l18);
