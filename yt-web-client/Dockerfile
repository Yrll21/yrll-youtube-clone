# Stage 1: build stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy the package*.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy other source code files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the listening port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

