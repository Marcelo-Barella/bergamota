# Bergamota — Nuxt node-server + Cursor Agent CLI (ACP)
FROM node:22-bookworm-slim AS base
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates \
  && curl -fsSL https://cursor.com/install | bash \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV PATH="/root/.local/bin:${PATH}"

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY . .
ENV NITRO_PRESET=node-server
RUN NODE_OPTIONS=--max-old-space-size=4096 npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_PRESET=node-server
ENV HOST=0.0.0.0
ENV PORT=3027
ENV ACP_ENABLED=true
COPY --from=build /app/.output ./.output
EXPOSE 3027
CMD ["node", ".output/server/index.mjs"]
