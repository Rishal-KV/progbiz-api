# Development stage
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

# Install Bun properly
RUN curl -fsSL https://bun.sh/install | bash \
    && export PATH="/root/.bun/bin:$PATH"

# Install dependencies
RUN /root/.bun/bin/bun install

# Copy source code
COPY . .

EXPOSE 8000

# Use Bun for development
CMD ["/root/.bun/bin/bun", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install Bun properly
RUN curl -fsSL https://bun.sh/install | bash \
    && export PATH="/root/.bun/bin:$PATH"

# Install only production dependencies
RUN /root/.bun/bin/bun install --production

# Copy built files from development stage
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["/root/.bun/bin/bun", "run", "start"]
