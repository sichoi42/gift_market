import { Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpLoadItemDto } from './dto/upload_item.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { multerOptions } from './utils/multer_options';

@Controller('item')
export class ItemController {
	constructor(private itemService: ItemService) {}

	@Post('/post_my_item')
	@UseInterceptors(FileInterceptor('img', multerOptions))
	async post_my_item(
		@Body(ValidationPipe) upLoadItemDto: UpLoadItemDto,
		@UploadedFile() file: Express.Multer.File): Promise<Item> {
			console.log(file);
			return await this.itemService.create_item(upLoadItemDto, file);
		}
}
