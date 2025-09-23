/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-yandex'
import { VerifyCallback } from 'passport-oauth2'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor(private configService: ConfigService) {
		super({
			clientID: configService.get<string>('YANDEX_CLIENT_ID')!,
			clientSecret: configService.get<string>('YANDEX_CLIENT_SECRET')!,
			callbackURL:
				configService.get<string>('SERVER_URL')! +
				'/auth/yandex/callback'
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	) {
		const { username, emails, photos } = profile
		const user = {
			email: emails && emails.length > 0 ? emails[0].value : null,
			name: username,
			picture: photos && photos.length > 0 ? photos[0].value : null
		}
		done(null, user)
	}
}
