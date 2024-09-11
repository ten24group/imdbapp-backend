import { Controller, defaultMetaContainer, BaseEntityController, ILogger, createLogger } from '@ten24group/fw24';
import { Cast } from '../entities/cast';
import { CastService } from '../services/cast';

@Controller('cast', { 
	resourceAccess: {
		tables: ['imdbapp'], 
	}
})
export class CastController extends BaseEntityController<Cast.CastSchemaType> {	
	readonly logger: ILogger = createLogger('castController');
	
	constructor() {
		super('cast');
	}
	
	async initDI() {
		this.logger.debug('CastController.initDI');
		
        // register DI factories
		defaultMetaContainer.setEntityServiceByEntityName('cast', CastService.factory);	

		this.logger.debug('CastController.initDI - done');
        return Promise.resolve();
    }


}

export const handler = CastController.CreateHandler(CastController);

