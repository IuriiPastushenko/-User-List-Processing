import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/httpexception';
import { typeOrmConnects } from '../../index';
import { validationMiddleware } from '../midlleware/validate.middleware';
import { UserDTO } from './dto/user.dto';
import { UserFullDTO } from './dto/userfull.dto';
import { UsersListDto } from './dto/userslist.dto';
import { IUser } from './users.interfaces';

export class UsersRouter {
	public router = Router();

	constructor() {
		this.usersrouts();
	}

	usersrouts(): void {
		// List of users
		this.router.get(
			'/list',
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

		this.router.post(
			'/changerank',
			validationMiddleware(UserDTO),
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const dataForDB: IUser = req.body;
					await typeOrmConnects.changeUserRank(dataForDB);
					const resultUsersList = await typeOrmConnects.sendUsersList({
						sort: 'rank',
					});
					res.status(201).json(resultUsersList);
				} catch (err) {
					next(
						new HttpException(
							406,
							'Rank of user is not changed',
							err as string,
						),
					);
				}
			},
		);

		this.router.post(
			'/add',
			validationMiddleware(UserDTO),
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const dataForDB: IUser = req.body;
					await typeOrmConnects.addUser(dataForDB);
					res.status(201).json(` User ${dataForDB.name} was added`);
				} catch (err) {
					next(
						new HttpException(406, 'Adding user not available', err as string),
					);
				}
			},
		);

		this.router.post(
			'/delete',
			validationMiddleware(UserDTO),
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const dataForDB: IUser = req.body;
					await typeOrmConnects.deleteUser(dataForDB);
					res.status(201).json(` User ${dataForDB.name} was deleted`);
				} catch (err) {
					next(
						new HttpException(
							406,
							'Deleting user not available',
							err as string,
						),
					);
				}
			},
		);

		this.router.post(
			'/update',
			validationMiddleware(UserFullDTO),
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const dataForDB: IUser = req.body;
					await typeOrmConnects.updateUser(dataForDB);
					res.status(201).json(` User ${dataForDB.name} was updated`);
				} catch (err) {
					next(
						new HttpException(
							406,
							'Updating user not available',
							err as string,
						),
					);
				}
			},
		);
	}
}
