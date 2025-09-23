import { IsString } from 'class-validator'

export class CategoryDto {
	@IsString({
		message: 'Title must be a string'
	})
	name: string

	@IsString({
		message: 'value must be a string'
	})
	description: string
}
