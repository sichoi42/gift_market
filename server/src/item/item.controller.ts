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
import { multerOptions } from './utils/multer_options';

@Controller('item')
@UseGuards(AuthGuard('jwt'))
export class ItemController {
	constructor(private itemService: ItemService) {}

	@Post('/post_my_item')
	@UseInterceptors(FileInterceptor('img', multerOptions))
	async post_my_item(
		@Body(ValidationPipe) upLoadItemDto: UpLoadItemDto,
		@UploadedFile() file: Express.Multer.File,
		@getUser() user: User
		): Promise<Item> {
			console.log(file);
			return await this.itemService.create_item(upLoadItemDto, file, user);
		}

	@Post('/create_item_type')
	async create_item_type(@Body() createItemTypeDto: CreateItemTypeDto): Promise<Type> {
		return await this.itemService.create_item_type(createItemTypeDto);
	}

	@Post('/create_item_brand')
	async create_item_brand(@Body() createItemBrandDto: CreateItemBrandDto): Promise<Brand> {
		return await this.itemService.create_item_brand(createItemBrandDto);
	}
}
