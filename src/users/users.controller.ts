import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../ errors/httpexception';
import { typeOrmConnects } from '../../index';

import { IUser } from './users.interfaces';

export class UsersRouter {
	public router = Router();

	constructor() {
		this.usersrouts();
	}

	usersrouts(): void {
		// Registration
		this.router.post(
			'/registration',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const dataForDB: IUser = req.body;
					//await typeOrmConnects.userRegistrationWriteToDB(dataForDB);
					res.status(201).json('Registration is successful');
				} catch (err) {
					next(
						new HttpException(
							401,
							'Registration is not successful',
							err as string,
						),
					);
				}
			},
		);
	}
}
