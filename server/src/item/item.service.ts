import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateItemBrandDto } from './dto/create_item_brand.dto';
import { CreateItemTypeDto } from './dto/create_item_type.dto';
import { UpLoadItemDto } from './dto/upload_item.dto';
import { Item } from './entity/item.entity';
import { Brand } from './entity/item_brand.entity';
import { Type } from './entity/item_type.entity';
import { createImageUrl } from './utils/multer_options';

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(Item)
		private itemRepository: Repository<Item>,

		@InjectRepository(Type)
		private typeRepository: Repository<Type>,

		@InjectRepository(Brand)
		private brandRepository: Repository<Brand>,
	) {}

	async create_item(
		upLoadItemDto: UpLoadItemDto,
		file: Express.Multer.File,
		user: User
		): Promise<Item> {
		const { item_name, brand_name, price, expire_date, pin_number } = upLoadItemDto;

		const found = await this.brandRepository.findOne({
			where: {
				brand_name: brand_name,
			}
		});
		if (!found) {
			throw new NotFoundException(`Cannot find Brand with name ${brand_name}`);
		}

		const item = await this.itemRepository.create({
			item_name,
			pin_number,
			type_id: found.type_id,
			type_name: found.type_name,
			brand_id: found.id,
			brand_name,
			price,
			expire_date,
			register_date: new Date(),
			is_saled: false,
			buyer_id: undefined,
			seller_id: user.id,
			img_url: createImageUrl(file),
		});
		await this.itemRepository.save(item);
		return item;
	}

	async create_item_type(createItemTypeDto: CreateItemTypeDto): Promise<Type> {
		const { type_name, type_img_url } = createItemTypeDto;
		const type = await this.typeRepository.create({
			type_name,
			type_img_url,
		});
		await this.typeRepository.save(type);
		return type;
	}

	async create_item_brand(createItemBrandDto: CreateItemBrandDto): Promise<Brand> {
		const { brand_name, type_name, brand_img_url } = createItemBrandDto;
		const found = await this.typeRepository.findOne({
			where: {
				type_name: type_name
			}
		});
		if (!found) {
			throw new NotFoundException(`Cannot find Type with name ${type_name}`);
		}

		const type_id = found.id;
		const brand = await this.brandRepository.create({
			brand_name,
			type_id,
			type_name,
			brand_img_url,
		});
		await this.brandRepository.save(brand);
		return brand;
	}
}
