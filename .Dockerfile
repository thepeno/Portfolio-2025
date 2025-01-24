# Base image
FROM node:18.8-alpine as base

# Build stage
FROM base as builder

WORKDIR /home/node/app

# Copy dependency files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Set environment variables to prevent Payload CLI prompts
ENV PAYLOAD_CLI_ACCEPT_PROMPTS=true
ENV PAYLOAD_ALLOW_DYNAMIC_DATA_DESTRUCTION=true

# Copy the rest of the app files
COPY . .

# Run migrations and build the app
RUN yarn payload migrate
RUN yarn build

# Runtime stage
FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app

# Copy necessary files for production
COPY package*.json  ./
COPY yarn.lock ./
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/node_modules ./node_modules

# Install production dependencies
RUN yarn install --production

# Expose the app's port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]
