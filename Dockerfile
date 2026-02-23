############################################
# Stage 1 — Build frontend
############################################
FROM node:20-alpine AS frontend-build

WORKDIR /app/react

RUN apk add --no-cache python3 make g++

COPY react/package*.json ./

RUN npm install --legacy-peer-deps

COPY react/ ./

RUN npm run build


############################################
# Stage 2 — Build backend
############################################
FROM node:20-alpine AS backend-build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build


############################################
# Stage 3 — Runtime image
############################################
FROM node:20-alpine

WORKDIR /app

# Copy backend compiled
COPY --from=backend-build /app/dist ./dist
COPY --from=backend-build /app/package*.json ./

# Copy frontend static build
COPY --from=frontend-build /app/react/dist ./react/dist

# Install only production deps
RUN npm install --only=production

# Serve frontend assets location
ENV FRONTEND_PATH=/app/frontend-build

EXPOSE 3456

CMD ["node", "dist/main.js"]