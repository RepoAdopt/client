FROM node:latest as build-stage
WORKDIR /repoadopt/app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir -p /repoadopt/app
COPY --from=build-stage /repoadopt/app/dist /repoadopt/app
COPY nginx.conf /etc/nginx/nginx.conf
