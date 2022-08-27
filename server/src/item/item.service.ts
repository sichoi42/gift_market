import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpLoadItemDto } from './dto/upload_item.dto';
import { Item } from './item.entity';
import { createImageUrl } from './utils/multer_options';

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(Item)
		private itemRepository: Repository<Item>,
	) {}

	async create_item(
		upLoadItemDto: UpLoadItemDto,
		file: Express.Multer.File
		): Promise<Item> {
		const { item_name, brand_name, price, expire_date, pin_number } = upLoadItemDto;
		const item = this.itemRepository.create({
			item_name,
			pin_number,
			// TODO: create type, brand table
			//       and get from which type_id, tpye_name, brand_id
			// type_id,
			// type_name,
			// brand_id,
			brand_name,
			price,
			expire_date,
			register_date: new Date(),
			is_saled: false,
			buyer_id: undefined,
			// TODO: get seller_id from getUser method which is userGuard
			// seller_id,
			img_url: createImageUrl(file),
		});
		await this.itemRepository.save(item);
		return item;
	}
}
