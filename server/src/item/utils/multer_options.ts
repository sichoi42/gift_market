import { HttpException, HttpStatus } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import uuidRandom from "./uuidRandom";


export const multerOptions = {
	fileFilter: (req, file, cb) => {
		const mimetype = file.mimetype;
		if (mimetype.match(/\/(jpg|jpeg|png)$/)) {
			cb(null, true);
		} else {
			cb(new HttpException({
				status: HttpStatus.UNPROCESSABLE_ENTITY,
				error: `${mimetype} is not supported!`
			}, HttpStatus.UNPROCESSABLE_ENTITY), false);
		}
	},
	storage: diskStorage({
		destination: (req, file, cb) => {
			const upLoadPath: string = 'public';
			if (!existsSync(upLoadPath)) {
				mkdirSync(upLoadPath);
			}
			cb(null, upLoadPath);
		},
		filename: (req, file, cb) => {
			cb(null, uuidRandom(file));
		}
	})
}

export const createImageUrl = (file): string => {
	return `/public/${file.filename}`;
}
