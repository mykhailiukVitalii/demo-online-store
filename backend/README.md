Build your simple Node.js project(online store) to upper your skills: server + frontend + e2e test + UI tests
==============================

# Instalation instruction:

## install packages

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

3. Refresh DB: migrations + seeds

```
npm run pretest
```

3. Start e2e-tests: refresh DB + migrates test data + runs e2e-tests
```
npm test
```