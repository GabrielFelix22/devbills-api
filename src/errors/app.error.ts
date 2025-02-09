import type { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
	public statusCode: StatusCodes;
	constructor(message: string, statusCode: number) {
		super(message);

		this.statusCode = statusCode;
	}
}
