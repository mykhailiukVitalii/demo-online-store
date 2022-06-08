Build your simple Node.js project(online store) to upper your skills: server + frontend + e2e test + UI tests
==============================


# Technology:
- dev tools: MEVN stack = MySQL + Express + Vue.js + Node.js
- docker >= 20.10.7, 20.10.10 recommenced
- docker-compose >= 1.29.2
- testing tools: e2e-testing(supertest.io) + UI testing(playwright.dev)

## install docker-compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

# Instalation instruction:


## install packages(WIP)

```
npm i
```

## Start project server(cd /backend)

1. UP MySQL container
```
docker start storage_demo_mysql
```
2. Up server
```
npm run dev
```
3. Start e2e-tests: recreates DB + migrates test data + runs e2e-tests
```
npm test
```