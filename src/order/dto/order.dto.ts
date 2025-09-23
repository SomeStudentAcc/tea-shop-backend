import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { OrderStatus } from 'generated/prisma'

export class OrderDto {
	@IsOptional()
	@IsEnum(OrderStatus)
	status: OrderStatus

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
}

export class OrderItemDto {
	@IsNumber()
	quantity: number

	@IsNumber()
	price: number

	@IsString()
	productId: string

	@IsString()
	storeId: string
}
