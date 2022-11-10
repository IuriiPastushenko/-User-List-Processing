import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../ errors/httpexception';
import { typeOrmConnects } from '../../index';
import { validationMiddleware } from '../midlleware/validate.middleware';
import { UsersListDto } from './dto/userslistdto';

export class UsersRouter {
	public router = Router();

	constructor() {
		this.usersrouts();
	}

	usersrouts(): void {
		// Registration
		this.router.get(
			'/userslist',
			validationMiddleware(UsersListDto),
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const dataForDB = req.query;
					const resultUsersList = await typeOrmConnects.sendUsersList(
						dataForDB,
					);
					res.status(201).json(resultUsersList);
				} catch (err) {
					next(
						new HttpException(406, 'Users list not available', err as string),
					);
				}
			},
		);
	}
}
