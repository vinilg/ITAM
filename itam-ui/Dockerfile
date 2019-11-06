FROM node as builder
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
CMD npm run build


FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html 