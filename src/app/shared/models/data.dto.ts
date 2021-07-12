import { LoginResponseDTO } from './user.dto';

export interface DataRequestDTO {
  user: LoginResponseDTO;
  fromDate: Date;
  toDate: Date;
}

export interface DataResponseDTO {
  amount: number;
  debit: number;
  fromDate: string;
  operations: OperationDTO[];
  refill: number;
  toDate: string;
}

export interface OperationDTO {
  operationDate: string;
  processingDate: string;
  amount: number;
  authorizationCode: string;
  balance: number;
  category: string;
  transactionDescription: string;
}

export interface ChartDTO {
  value: number;
  name: string;
}

export interface MultiDTO {
  name: string;
  series: ChartDTO[];
}
