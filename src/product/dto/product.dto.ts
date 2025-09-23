import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsNumber()
	@IsNotEmpty()
	price: number

	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@ArrayMinSize(1, { message: 'At least one image is required' })
	images: string[]

	@IsString()
	@IsNotEmpty()
	categoryId: string

	@IsString()
	@IsNotEmpty()
	colorId: string
}
