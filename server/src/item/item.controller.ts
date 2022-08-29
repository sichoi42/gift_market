import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetItemDto } from './dto/get_item.dto';
import { ItemBrandDto } from './dto/item_brand.dto';
import { ItemTypeDto } from './dto/item_type.dto';
import { UpLoadItemDto } from './dto/upload_item.dto';
import { Item } from './entity/item.entity';
import { Brand } from './entity/item_brand.entity';
import { Type } from './entity/item_type.entity';
import { ItemService } from './item.service';
import { multerOptions, multerOptionsBrand, multerOptionsType } from './utils/multer_options';

@Controller('item')
@ApiTags('Item API')
@UseGuards(AuthGuard('jwt'))
export class ItemController {
	constructor(private itemService: ItemService) {}

	@Post('/post_my_item')
	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: '[사용자 API] 내 상품 올리기',
		description: '판매할 상품에 대한 정보와 상품 이미지를 입력하면 해당 정보가 db에 저장된다.'
	})
	@UseInterceptors(FileInterceptor('item_img', multerOptions))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				item_name: {
					type: 'string',
					example: '스타벅스 아이스 아메리카노 Tall',
				},
				brand_name: {
					type: 'string',
					example: '스타벅스',
				},
				price: {
					type: 'number',
					example: 4500,
				},
				expire_date: {
					type: 'Date',
					example: new Date('2022-09-27'),
				},
				pin_number: {
					type: 'string',
					example: '1234-5678-9012',
				},
				item_img: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiCreatedResponse({
		description: 'Item Entity를 반환한다.',
		type: Item
	})
	async post_my_item(
		@Body(ValidationPipe) upLoadItemDto: UpLoadItemDto,
		@UploadedFile() file: Express.Multer.File,
		@getUser() user: User
		): Promise<Item> {
			console.log(file);
			return await this.itemService.create_item(upLoadItemDto, file, user);
	}

	@Post('/create_item_type')
	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: '[관리자 API] 새 카테고리 등록',
		description: '카테고리 이미지와 함께 카테고리 명을 입력하면 db에 새 카테고리가 추가된다.'
	})
	@UseInterceptors(FileInterceptor('type_img', multerOptionsType))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				type_name: { type: 'string' },
				type_img: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiCreatedResponse({
		description: 'Type Entity를 반환한다.',
		type: Type
	})
	async create_item_type(
		@Body(ValidationPipe) itemTypeDto: ItemTypeDto,
		@UploadedFile() file: Express.Multer.File,
		): Promise<Type> {
		return await this.itemService.create_item_type(itemTypeDto, file);
	}

	@Post('/create_item_brand')
	@ApiBearerAuth('access-token')
	@ApiOperation({
		summary: '[관리자 API] 새 브랜드 등록',
		description: '브랜드 이미지와 함께 브랜드 명을 입력하면 db에 새 브랜드가 추가된다.'
	})
	@UseInterceptors(FileInterceptor('brand_img', multerOptionsBrand))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				brand_name: { type: 'string' },
				type_name: { type: 'string' },
				brand_img: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiCreatedResponse({
		description: 'Brand Entity를 반환한다.',
		type: Brand
	})
	async create_item_brand(
		@Body(ValidationPipe) itemBrandDto: ItemBrandDto,
		@UploadedFile() file: Express.Multer.File,
		): Promise<Brand> {
		return await this.itemService.create_item_brand(itemBrandDto, file);
	}

	@Get('/get_item_type')
	async get_item_type(): Promise<ItemTypeDto[]> {
		return await this.itemService.get_item_type();
	}

	@Get('/get_item_brand/:type_name')
	async get_item_brand(@Param('type_name') type_name: string) : Promise<ItemBrandDto[]> {
		return await this.itemService.get_item_brand(type_name);
	}

	@Get('/get_item/:brand_name')
	async get_item(@Param('brand_name') brand_name: string) : Promise<GetItemDto[]> {
		return await this.itemService.get_item(brand_name);
	}
}
