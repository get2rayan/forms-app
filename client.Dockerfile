# Stage 1: Build the client (React) and server (Node.js/Express) applications
# We use a full Node.js image for the build stage as it contains all necessary tools.
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install dependencies for Common Library
RUN cd common && npm install && npm run build

# Install dependencies for Client Application
RUN cd client && npm install && npm run build

# # Stage 2: Create the final production-ready image
FROM nginx:alpine AS final

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build/client /usr/share/nginx/html/client

# WORKDIR /app/build/client
# # Copy package.json and package-lock.json
# COPY ./client/package*.json ./
# RUN npm install

# # This is the port where the client will run.
# ARG CLIENTPORT=4001
# This is the port where the server will run.
ARG SERVERPORT=4000
# environment variable for the client application to invoke server API for profiles
ENV REACT_APP_API_URL_PROFILES=http://localhost:${SERVERPORT}/api/profiles
RUN echo "REACT_APP_API_URL_PROFILES is set to ${REACT_APP_API_URL_PROFILES}"
ENV PUBLIC_URL='/client'
# ENV PORT=${CLIENTPORT}

# Expose your app port (change if needed)
EXPOSE 80

# ENTRYPOINT [ "npm","start" ]