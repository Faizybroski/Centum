# 1️⃣ Builder stage
FROM node:22-alpine AS builder
WORKDIR /app

# Dependencies install
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Next.js (App Router)
RUN npm run build

# 2️⃣ Runner stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Next.js needs this to run standalone
ENV PORT=3000

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "server.js"]
