import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { getUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateItemBrandDto } from './dto/create_item_brand.dto';
import { CreateItemTypeDto } from './dto/create_item_type.dto';
import { UpLoadItemDto } from './dto/upload_item.dto';
import { Item } from './entity/item.entity';
import { Brand } from './entity/item_brand.entity';
import { Type } from './entity/item_type.entity';
import { ItemService } from './item.service';
import { multerOptions, multerOptionsBrand, multerOptionsType } from './utils/multer_options';

@Controller('item')
@UseGuards(AuthGuard('jwt'))
export class ItemController {
	constructor(private itemService: ItemService) {}

	@Post('/post_my_item')
	@UseInterceptors(FileInterceptor('item_img', multerOptions))
	async post_my_item(
		@Body(ValidationPipe) upLoadItemDto: UpLoadItemDto,
		@UploadedFile() file: Express.Multer.File,
		@getUser() user: User
		): Promise<Item> {
			console.log(file);
			return await this.itemService.create_item(upLoadItemDto, file, user);
		}

	@Post('/create_item_type')
	@UseInterceptors(FileInterceptor('type_img', multerOptionsType))
	async create_item_type(
		@Body(ValidationPipe) createItemTypeDto: CreateItemTypeDto,
		@UploadedFile() file: Express.Multer.File,
		): Promise<Type> {
		return await this.itemService.create_item_type(createItemTypeDto, file);
	}

	@Post('/create_item_brand')
	@UseInterceptors(FileInterceptor('brand_img', multerOptionsBrand))
	async create_item_brand(
		@Body(ValidationPipe) createItemBrandDto: CreateItemBrandDto,
		@UploadedFile() file: Express.Multer.File,
		): Promise<Brand> {
		return await this.itemService.create_item_brand(createItemBrandDto, file);
	}
}
