FROM node:latest
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV PORT = 3000
EXPOSE 3000
CMD ["npm","start"]