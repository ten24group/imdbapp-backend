import { Controller, defaultMetaContainer, BaseEntityController, ILogger, createLogger } from '@ten24group/fw24';
import { CastType } from '../entities/castType';
import { CastTypeService } from '../services/castType';

@Controller('castType', { 
	resourceAccess: {
		tables: ['imdbapp'], 
	}
})
export class CastTypeController extends BaseEntityController<CastType.CastTypeSchemaType> {	
	readonly logger: ILogger = createLogger('castTypeController');
	
	constructor() {
		super('castType');
	}
	
	async initDI() {
		this.logger.debug('CastTypeController.initDI');
		
        // register DI factories
		defaultMetaContainer.setEntityServiceByEntityName('castType', CastTypeService.factory);	

		this.logger.debug('CastTypeController.initDI - done');
        return Promise.resolve();
    }


}

export const handler = CastTypeController.CreateHandler(CastTypeController);

