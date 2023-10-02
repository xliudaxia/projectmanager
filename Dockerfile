# build stage
FROM node:14 as build-stage
WORKDIR /app
COPY . /app
RUN npm install --registry=https://registry.npmmirror.com
RUN npm run build

# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/www.bajie.club_bundle.crt /etc/nginx
COPY --from=build-stage /app/www.bajie.club.key /etc/nginx
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 执行dev调试命令
# FROM docker.mirrors.ustc.edu.cn/library/node:10
# WORKDIR /frontend
# COPY . /frontend
# RUN ls -lh /frontend
# RUN yarn config set registry https://registry.npm.taobao.org/
# RUN  yarn
# EXPOSE 9527
# ENTRYPOINT  npm run dev 