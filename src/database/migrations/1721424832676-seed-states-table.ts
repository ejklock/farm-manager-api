import { AddressService } from 'src/domains/address/address.service';
import { CityEntity } from 'src/domains/localization/city.entity';
import { StateEntity } from 'src/domains/localization/state.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStatesTable1721424832676 implements MigrationInterface {
  private readonly addressService: AddressService;

  constructor() {
    this.addressService = new AddressService();
  }

  private async getStates(): Promise<StateEntity[]> {
    return (await this.addressService.states())?.map((ibgeState) => {
      return <StateEntity>{
        name: ibgeState.nome,
        uf: ibgeState.sigla,
        ibgeCode: ibgeState.id,
      };
    });
  }

  private async getCities(states: StateEntity[]) {
    const cities = await Promise.all(
      states?.map(async (state) => {
        return (await this.addressService.citiesByStateUF(state.uf)).map(
          (ibgeCity) => {
            return <CityEntity>{
              name: ibgeCity.nome,
              ibgeCode: ibgeCity.id,
              stateId: state.id,
            };
          },
        );
      }),
    );

    return cities.flat();
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    let stateIds = [];
    const states = await this.getStates();

    await queryRunner.manager.transaction(async (transactionalManager) => {
      const result = await transactionalManager
        .createQueryBuilder()
        .insert()
        .into(StateEntity)
        .values(states)
        .orUpdate(['name', 'uf'], ['ibge_code'])
        .execute();

      stateIds = result?.identifiers
        ?.filter((identifier) => identifier?.id)
        .map((identifier) => identifier?.id);
    });

    if (stateIds.length > 0) {
      const cities = await this.getCities(states);
      await queryRunner.manager.transaction(async (transactionalManager) => {
        await transactionalManager
          .createQueryBuilder()
          .insert()
          .into(CityEntity)
          .values(cities)
          .orUpdate(['name', 'state_id'], ['ibge_code'])
          .execute();
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'TRUNCATE TABLE states, cities RESTART IDENTITY CASCADE',
    );
  }
}
