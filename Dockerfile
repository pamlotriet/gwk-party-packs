# Stage 1: Build Angular app with SSR
FROM node:20-slim AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM node:20-slim
WORKDIR /app
COPY --from=build /app/package.json ./
RUN npm install --only=production
COPY --from=build /app/dist/ /app/dist/
EXPOSE 4200
CMD ["npm", "run", "serve:ssr:gwkPartyPacks"]
