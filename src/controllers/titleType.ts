import { Controller, defaultMetaContainer, BaseEntityController, ILogger, createLogger } from '@ten24group/fw24';
import { TitleType } from '../entities/titleType';
import { TitleTypeService } from '../services/titleType';

@Controller('titleType', { 
	resourceAccess: {
		tables: ['imdbapp'], 
	}
})
export class TitleTypeController extends BaseEntityController<TitleType.TitleTypeSchemaType> {	
	readonly logger: ILogger = createLogger('titleTypeController');
	
	constructor() {
		super('titleType');
	}
	
	async initDI() {
		this.logger.debug('TitleTypeController.initDI');
		
        // register DI factories
		defaultMetaContainer.setEntityServiceByEntityName('titleType', TitleTypeService.factory);	

		this.logger.debug('TitleTypeController.initDI - done');
        return Promise.resolve();
    }


}

export const handler = TitleTypeController.CreateHandler(TitleTypeController);

