import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { OrderDto } from './dto/order.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async createPayment(dto: OrderDto, userId: string) {
		const orderItems = dto.items.map(item => ({
			product: {
				connect: { id: item.productId } // don't forget productId here
			},
			store: {
				connect: { id: item.storeId }
			},
			quantity: item.quantity,
			price: item.price
		}))

		const total = dto.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		)

		const order = await this.prisma.order.create({
			data: {
				status: 'PENDING',
				items: {
					create: orderItems
				},
				total,
				user: {
					connect: { id: userId }
				}
			},
			include: {
				items: true,
				user: true
			}
		})

		// imitate payment succeeded
		return {
			success: true,
			message: 'Payment succeeded',
			paymentId: `pay_${Date.now()}`, // mock payment id
			amount: total,
			currency: 'USD', // or from dto
			order
		}
	}
}
