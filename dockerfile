# Step 1: Use an official Node.js image as the base image to build the app
FROM node:22-slim AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies first
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the Vite app (production build)
RUN npm run build

# Step 7: Use a lightweight web server to serve the production build (Nginx in this case)
FROM nginx:alpine

# Step 8: Copy the build output to the Nginx server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 for the web server
EXPOSE 80

# Step 10: Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
