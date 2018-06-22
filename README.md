# Coin using coinone api

코인원 API 를 이용하여 코인의 가격과 거래 완료 내역을 확인할 수 있습니다.

## Usage
패키지 설치 & 빌드:
```sh
npm install -g yarn babel-cli
```

```sh
npm install
npm build
cd server
npm install
npm build
```

## Run Development Server
두 개의 독립적인 터미널을 실행한 후 순서대로 명령어 실행 :
##### First Terminel - Run api server:
```sh
cd server
npm run development
```

##### Second Terminel - Run hot reloader:
```sh
yarn start
```

##### Dev Hot Live Server:
```
http://localhost:3001
```


## Production
```sh
yarn build
cd server
npm run build
npm run start
```

```
http://localhost:3000
```