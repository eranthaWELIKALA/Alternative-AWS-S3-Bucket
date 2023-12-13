# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 9000

# Create the volume directory
RUN mkdir -p /usr/src/app/uploads

# Start the application with the provided volume directory
CMD ["sh", "-c", "UPLOAD_PATH=/usr/src/app/uploads npm start"]
