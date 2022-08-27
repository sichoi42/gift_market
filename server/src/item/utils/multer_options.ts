import { HttpException, HttpStatus } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";
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

export const multerOptionsType = {
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
			const upLoadPath: string = `${__dirname}/../assets/categories/`;
			if (!existsSync(upLoadPath)) {
				mkdirSync(upLoadPath);
			}
			cb(null, upLoadPath);
		},
	})
}

export const multerOptionsBrand = {
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
			const upLoadPath: string = `${__dirname}/../assets/brands/`;
			if (!existsSync(upLoadPath)) {
				mkdirSync(upLoadPath);
			}
			cb(null, upLoadPath);
		},
	})
}

export const getImageUrl = (file): string => {
	return `/public/${file.filename}`;
}

export const getTypeImageUrl = (file): string => {
	return `${__dirname}/../assets/categories/${file.filename}`;
}

export const getBrandImageUrl = (file): string => {
	return `${__dirname}/../assets/brands/${file.filename}`;
}
