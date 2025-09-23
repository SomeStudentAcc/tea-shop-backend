/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponce(res, refreshToken)

		return response
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } =
			await this.authService.register(dto)
		this.authService.addRefreshTokenToResponce(res, refreshToken)
		return response
	}

	@UsePipes(new ValidationPipe())
	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies = req.cookies[
			this.authService.REFRESH_TOKEN_NAME
		] as string | undefined

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenFromResponce(res)
			throw new Error('No refresh token in cookies')
		}
		const { refreshToken, ...response } =
			await this.authService.getNewTokens(refreshTokenFromCookies)
		this.authService.addRefreshTokenToResponce(res, refreshToken)
		return response
	}

	@HttpCode(200)
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenFromResponce(res)
		return { message: 'Logged out' }
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req) {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthCallback(
		@Req() req,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } =
			await this.authService.validateOAuthLogin(req)
		this.authService.addRefreshTokenToResponce(res, refreshToken)
		return res.redirect(
			`${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`
		)
	}

	@Get('yandex/callback')
	@UseGuards(AuthGuard('yandex'))
	async yandexAuthCallback(
		@Req() req,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } =
			await this.authService.validateOAuthLogin(req)
		this.authService.addRefreshTokenToResponce(res, refreshToken)
		return res.redirect(
			`${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`
		)
	}

	@Get('yandex')
	@UseGuards(AuthGuard('yandex'))
	async yandexAuth(@Req() _req) {}
}
