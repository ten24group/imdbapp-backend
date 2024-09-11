import { Controller, defaultMetaContainer, BaseEntityController, ILogger, createLogger } from '@ten24group/fw24';
import { Genre } from '../entities/genre';
import { GenreService } from '../services/genre';

@Controller('genre', { 
	resourceAccess: {
		tables: ['imdbapp'], 
	}
})
export class GenreController extends BaseEntityController<Genre.GenreSchemaType> {	
	readonly logger: ILogger = createLogger('genreController');
	
	constructor() {
		super('genre');
	}
	
	async initDI() {
		this.logger.debug('GenreController.initDI');
		
        // register DI factories
		defaultMetaContainer.setEntityServiceByEntityName('genre', GenreService.factory);	

		this.logger.debug('GenreController.initDI - done');
        return Promise.resolve();
    }


}

export const handler = GenreController.CreateHandler(GenreController);

