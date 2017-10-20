# Coin using coinone api

코인원 API 를 이용하여 코인의 가격과 거래 완료 내역을 확인할 수 있습니다.
또한, 알람 기능을 설정하여 원하는 코인의 설정 가격 도달 시 SMS 발송 기능도 있습니다.
다만, SMS 발송 기능의 경우 Twillo 의 API 를 사용하니 Twillo 의 계정이 필요합니다.

## Usage
빌드에 필요한 패키지 설치:
```
npm install -g yarn babel-cli
```
```
npm install
cd server
npm install
```

## Edit Twillo Token
- `server/src/alarm.js` 파일을 수정하여 Twillo 계정 토큰을 반영합니다. 
- https://www.twilio.com/console
```
var accountSid = ''; // Your Twillo account sid
var authToken = ''; // Your Twillo auth token
```


## MongoDB Server 
- MongoDB 서버 구축 후 Mongo shell:
```javascript
use {Database name}
db.createCollection("alarms")
db.createCollection("records")
```

- `server/src/main.js`, `server/src/alarm.js` 를 수정하여 MongoDB 접속 경로를 변경합니다.
```javascript
mongoose.connect('mongodb://{MongoDB Ip Address}/{Database name}');
```

## Run Checking Alarm Server
```
cd server
node alarm.js
```

## Run Development Server
두 개의 독립적인 터미널을 실행한 후 :
##### First Terminel - Run api server:
```
cd server
npm run development
```

##### Second Terminel - Run hot reloader:
```
yarn start
```

##### Dev Hot Live Server:
```
http://localhost:3001
```


## Production
```
yarn build
cd server
npm run build
npm run start
```

```
http://localhost:3000
```