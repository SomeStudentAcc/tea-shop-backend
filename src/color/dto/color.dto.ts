import { IsString } from 'class-validator'

export class ColorDto {
	@IsString({
		message: 'Title must be a string'
	})
	name: string

	@IsString({
		message: 'value must be a string'
	})
	value: string
}
