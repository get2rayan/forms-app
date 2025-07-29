# Stage 1: Build the server (Node.js/Express) application
# We use a full Node.js image for the build stage as it contains all necessary tools.
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# copy all code
COPY . .

# Build Common Library
RUN cd common && npm install && npm run build

# Build Server Application
RUN cd server && npm install && npm run build

# # Stage 2: Create the final production-ready image
# # We use a smaller Alpine-based Node.js image for production for reduced size.
FROM node:lts-alpine AS final

# # Set working directory
WORKDIR /app

# Copy compiled build artifacts from the builder stage
COPY --from=builder /app/build ./build

WORKDIR /app/build/server
COPY ./server/package*.json ./
RUN npm install

ARG SERVERPORT
ENV SERVERPORT=$SERVERPORT
RUN echo "SERVERPORT is ${SERVERPORT}"

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI
RUN echo "MONGODB_URI is ${MONGODB_URI}"

# Expose your app port
EXPOSE $SERVERPORT

ENTRYPOINT [ "node","app.js" ]