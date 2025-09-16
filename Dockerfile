# Stage 1: Build the client (React) and server (Node.js/Express) applications
# We use a full Node.js image for the build stage as it contains all necessary tools.
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY common/package*.json ./common/
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd common && npm install
RUN cd client && npm install  
RUN cd server && npm install

# Copy rest of the application code
COPY . .

# Build the workspace that will build common, client, and server applications
RUN npm run build

# # Stage 2: Create the final production-ready image
# # We use a smaller Alpine-based Node.js image for production for reduced size.
FROM node:lts-alpine AS final

# # Set working directory
WORKDIR /app

# Copy package files and install production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Copy compiled build artifacts from the builder stage
COPY --from=builder /app/build ./build

# Copy base folder that contains file to start monorepo
COPY --from=builder /app/bin ./bin

# environment variables for parent monorepo application
ARG MONOREPOPORT=5000
ENV MONOREPOPORT=$MONOREPOPORT
ARG MONGODB_URI=mongodb://xxxxxxxx.xxx
ENV MONGODB_URI=$MONGODB_URI
ENV NODE_APP=./../build/server/app

# Expose your app port (change if needed)
EXPOSE $MONOREPOPORT

CMD [ "npm","start" ]