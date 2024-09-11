export * as CountryService from './country';
import { BaseEntityService } from '@ten24group/fw24';
import { Dynamo } from '../db/imdbapp.dynamo.client';
import { Country } from '../entities/country';

export class Service extends BaseEntityService<Country.CountrySchemaType> {

}

export const factory = () => {
	console.log("called: countryService factory");
	const schema = Country.createCountrySchema();
	return new Service(schema, Dynamo.DefaultEntityConfiguration);
}
