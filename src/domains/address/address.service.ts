import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IBGECityResponse, IBGEStateResponse } from './address.types';

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);
  private ibgeApi: AxiosInstance;
  private ibgeApiBaseURL =
    'https://servicodados.ibge.gov.br/api/v1/localidades/';

  constructor() {
    this.ibgeApi = axios.create({
      baseURL: this.ibgeApiBaseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async cities(): Promise<IBGECityResponse[]> {
    try {
      const { data } = await this.ibgeApi.get<IBGECityResponse[]>('municipios');
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Erro ao chamar serviço de IBGE. [${error}]`);
    }
  }

  public async cityByIBGECode(code: number): Promise<IBGECityResponse> {
    try {
      const { data } = await this.ibgeApi.get<IBGECityResponse>(
        `municipios/${code}`,
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Erro ao chamar serviço de IBGE. [${error}]`);
    }
  }

  public async citiesByStateUF(uf: string): Promise<IBGECityResponse[]> {
    try {
      const { data } = await this.ibgeApi.get<IBGECityResponse[]>(
        `estados/${uf}/municipios`,
      );

      return data;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Erro ao chamar serviço de IBGE. [${error}]`);
    }
  }

  public async states(): Promise<IBGEStateResponse[]> {
    try {
      const { data } = await this.ibgeApi.get<IBGEStateResponse[]>('estados');

      return data;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Erro ao chamar serviço de IBGE. [${error}]`);
    }
  }

  public async stateByUF(uf: string): Promise<IBGEStateResponse> {
    try {
      const { data } = await this.ibgeApi.get<IBGEStateResponse>(
        `estados/${uf}`,
      );

      return data;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Erro ao chamar serviço de IBGE. [${error}]`);
    }
  }
}
