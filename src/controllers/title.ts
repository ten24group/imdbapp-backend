import { Controller, defaultMetaContainer, BaseEntityController, ILogger, createLogger } from '@ten24group/fw24';
import { Title } from '../entities/title';
import { TitleService } from '../services/title';

@Controller('title', { 
	resourceAccess: {
		tables: ['imdbapp'], 
	}
})
export class TitleController extends BaseEntityController<Title.TitleSchemaType> {	
	readonly logger: ILogger = createLogger('titleController');
	
	constructor() {
		super('title');
	}
	
	async initDI() {
		this.logger.debug('TitleController.initDI');
		
        // register DI factories
		defaultMetaContainer.setEntityServiceByEntityName('title', TitleService.factory);	

		this.logger.debug('TitleController.initDI - done');
        return Promise.resolve();
    }


}

export const handler = TitleController.CreateHandler(TitleController);

