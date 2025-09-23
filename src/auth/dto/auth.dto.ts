import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsOptional()
	@IsString()
	name: string

	@IsString({
		message: 'Email is optional'
	})
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password should be minimum 6 symbols'
	})
	@IsString({
		message: 'Pasword is mandatory'
	})
	password: string
}
