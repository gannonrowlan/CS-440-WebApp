# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port for the service
EXPOSE 5001

# Start the application
CMD ["node", "borrow-service.js"]
