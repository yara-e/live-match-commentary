# This file should now live at backend/Dockerfile
FROM node:18-slim

# The working directory inside the container
WORKDIR /app

# We are already in the 'backend' folder, so we copy files directly
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Match the port your app uses
EXPOSE 8000

# Start your app
CMD ["node", "src/index.js"]
