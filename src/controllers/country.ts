import { Controller, defaultMetaContainer, BaseEntityController, ILogger, createLogger } from '@ten24group/fw24';
import { Country } from '../entities/country';
import { CountryService } from '../services/country';

@Controller('country', { 
	resourceAccess: {
		tables: ['imdbapp'], 
	}
})
export class CountryController extends BaseEntityController<Country.CountrySchemaType> {	
	readonly logger: ILogger = createLogger('countryController');
	
	constructor() {
		super('country');
	}
	
	async initDI() {
		this.logger.debug('CountryController.initDI');
		
        // register DI factories
		defaultMetaContainer.setEntityServiceByEntityName('country', CountryService.factory);	

		this.logger.debug('CountryController.initDI - done');
        return Promise.resolve();
    }


}

export const handler = CountryController.CreateHandler(CountryController);

