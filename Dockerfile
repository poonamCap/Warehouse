FROM node:slim
WORKDIR /src/api
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN npm install
EXPOSE 8085
CMD node src/api/index.js