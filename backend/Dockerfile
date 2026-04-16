# Use a slim Node.js image
FROM node:18-slim

# Set the working directory to the root
WORKDIR /app

# Copy the backend package files first (for better caching)
COPY backend/package*.json ./backend/

# Install dependencies inside the backend folder
RUN cd backend && npm install

# Copy the rest of the backend code
COPY backend/ ./backend/

# Move into the backend folder for the final execution
WORKDIR /app/backend

# Expose the port your Express app uses (Back4app needs this)
EXPOSE 8000

# Start the application
CMD ["node", "src/index.js"]
