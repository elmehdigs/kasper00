FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --production || true
EXPOSE 3000
CMD ["node", "api/index.js"]
