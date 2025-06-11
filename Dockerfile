# Stage 1: Build Angular app with SSR
FROM node:latest AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the app
FROM node:latest
WORKDIR /app
COPY --from=build /app/package.json ./
RUN npm install --only=production
COPY --from=build /app/dist/ /app/dist/
EXPOSE 8080
CMD ["npm", "run", "serve:ssr:gwkPartyPacks"]
