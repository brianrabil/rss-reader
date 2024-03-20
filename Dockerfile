# Use node:20-alpine as the base image
FROM node:20-alpine AS base

# Use the base image as the builder
FROM base AS builder

# Install libc6-compat package for compatibility
RUN apk add --no-cache libc6-compat

# Update the package repository
RUN apk update

# Set the working directory in the container to /app
WORKDIR /app

# Install the turbo package globally
RUN yarn global add turbo

# Copy the entire project directory to the working directory
COPY . .

# Prune the @rss-reader/web workspace using turbo
RUN turbo prune @rss-reader/web --docker

# Use the base image as the installer
FROM base AS installer

# Install libc6-compat package for compatibility
RUN apk add --no-cache libc6-compat

# Update the package repository
RUN apk update

# Set the working directory in the container to /app
WORKDIR /app

# Copy the .gitignore file to the working directory
COPY .gitignore .gitignore

# Copy the pruned JSON files from the builder stage to the current directory
COPY --from=builder /app/out/json/ .

# Copy the pruned yarn.lock file from the builder stage to the current directory
COPY --from=builder /app/out/yarn.lock ./yarn.lock

# Install the project dependencies using yarn
RUN yarn install

# Copy the remaining files from the builder stage to the current directory
COPY --from=builder /app/out/full/ .

# Build the @rss-reader/web workspace and its dependencies using turbo
RUN yarn turbo run build --filter=@rss-reader/web...

# Use the base image as the final runner
FROM base AS runner

# Set the working directory in the container to /app
WORKDIR /app

# Create a new system group with GID 1001 named nodejs
RUN addgroup --system --gid 1001 nodejs

# Create a new system user with UID 1001 named nextjs
RUN adduser --system --uid 1001 nextjs

# Switch to the nextjs user
USER nextjs

# Copy the next.config.mjs file from the installer stage to the current directory
COPY --from=installer /app/apps/web/next.config.mjs .

# Copy the package.json file from the installer stage to the current directory
COPY --from=installer /app/apps/web/package.json .

# Copy the standalone Next.js files from the installer stage to the current directory
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./

# Copy the static files from the installer stage to the apps/web/.next/static directory
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# Copy the public files from the installer stage to the apps/web/public directory
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Set the command to run the Next.js application
CMD node apps/web/server.js