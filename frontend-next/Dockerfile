# ---- Base Node ----
FROM node:20-alpine AS base

# ---- Giai đoạn 1: Cài đặt Dependencies ----
FROM base AS deps
# Cài đặt libc6-compat để hỗ trợ một số thư viện native của Node trên Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Chỉ copy package.json và lock file để tận dụng cache của Docker
COPY package.json package-lock.json ./
RUN npm ci

# ---- Giai đoạn 2: Build code ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# [QUAN TRỌNG] Khai báo ARG để hứng các biến từ github actions truyền vào
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Gắn ARG vào ENV để Next.js nướng cứng vào code tĩnh lúc build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

RUN npm run build

# ---- Giai đoạn 3: Chạy Production (Chỉ lấy những file cần thiết) ----
FROM base AS runner
WORKDIR /app

# Set môi trường production
ENV NODE_ENV production

# Tạo user không có quyền root để bảo mật server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy thư mục public
COPY --from=builder /app/public ./public

# Tự động set quyền cho các file standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Chuyển sang user nextjs
USER nextjs

EXPOSE 4000
ENV PORT 4000
# Tắt tính năng gửi telemetry của Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Khởi chạy server từ file server.js (được sinh ra bởi chế độ standalone)
CMD ["node", "server.js"]