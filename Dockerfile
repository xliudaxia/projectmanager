# 本地build打包命令
FROM nginx
COPY /dist /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf











# 执行dev调试命令
# FROM docker.mirrors.ustc.edu.cn/library/node:10
# WORKDIR /frontend
# COPY . /frontend
# RUN ls -lh /frontend
# RUN yarn config set registry https://registry.npm.taobao.org/
# RUN  yarn
# EXPOSE 9527
# ENTRYPOINT  npm run dev 