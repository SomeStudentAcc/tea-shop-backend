# Stage 1: Install dependencies
FROM node:20-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y netcat-openbsd
RUN npm install --frozen-lockfile


# Stage 2: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY entrypoint.sh .
RUN chmod +x /app/entrypoint.sh
EXPOSE 3000
CMD ["/app/entrypoint.sh"]
