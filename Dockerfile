FROM node:22-bookworm-slim AS deps
WORKDIR /app
ENV CI=1
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV CI=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm run test:shipped-install-blackbox

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV CI=1
ENV HOST=0.0.0.0
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/db ./db
COPY --from=builder /app/tsconfig.json ./tsconfig.json
EXPOSE 8080
CMD ["npm", "start"]
