# Start from a python 3.8 base image
FROM node:alpine
# Set Working directory
WORKDIR /app
# Copy requirements file (pip freeze > requirements.txt) to workdir
COPY package.json .
COPY wait-for .
# Install dependencies listed in requirements.txt
RUN npm install
# Copy src code folder to workdir/app
COPY . .
# Change file permission to full access
# RUN chmod 777 wait-for
# Open port 3000
EXPOSE 3000

CMD ["npm", "start"]
# CMD ["./wait-for 0.0.0.0:5000 -t 10 -- npm start"]

# ./wait-for host:port|url [-t timeout] [-- command args]
#   -q | --quiet                        Do not output any status messages
#   -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
#   -v | --version                      Show the version of this tool
#   -- COMMAND ARGS                     Execute command with args after the test finishes

# CMD ["npm", "start"]