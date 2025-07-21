# Stage 1: Build the client (React) and server (Node.js/Express) applications
# We use a full Node.js image for the build stage as it contains all necessary tools.
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy the application code
COPY . .

# This is the port where the server will run.
ARG SERVERPORT=4000
# environment variable for the client application to invoke server API for profiles
ENV REACT_APP_API_URL_PROFILES=http://localhost:${SERVERPORT}/api/profiles
RUN echo "REACT_APP_API_URL_PROFILES is set to ${REACT_APP_API_URL_PROFILES}"

# Install dependencies for Common Library
RUN cd common && npm install 

# Install dependencies for Client Application
RUN cd client && npm install 

# Install dependencies for Server Application
RUN cd server && npm install 

# Build the workspace that will build common, client, and server applications
RUN npm run build

# # Stage 2: Create the final production-ready image
# # We use a smaller Alpine-based Node.js image for production for reduced size.
FROM node:lts-alpine AS final

# # Set working directory
WORKDIR /app

# Copy compiled build artifacts from the builder stage
COPY --from=builder /app/build ./build

# Copy base folder that contains file to start monorepo
COPY --from=builder /app/bin ./bin

# Copy package.json and package-lock.json
COPY --from=builder /app/package*.json ./

# # Install dependencies
RUN npm install

# environment variables for parent monorepo application
ENV NODE_APP=./../build/server/app

# Expose your app port (change if needed)
EXPOSE $SERVERPORT

ENTRYPOINT [ "npm","start" ]