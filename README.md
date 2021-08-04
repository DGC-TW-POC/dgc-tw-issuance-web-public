# dgc-tw-vaccine-web-public
EU疫苗護照概念式驗證開發前端。
使用情境為民眾線上申請qr code。
- 語言與框架:  Angular, Typescript

## DEMO
- 身分驗證(健保卡+身分證)
![](https://i.imgur.com/sZtx18N.png)
- 選擇劑次
![](https://i.imgur.com/PzIhjOQ.png)
- 填寫及確認資料
![](https://i.imgur.com/x7AJHo2.png)
- 填寫完成取得qrcode
![](https://i.imgur.com/1rmwKlA.png)
- email取得TAN碼
![](https://i.imgur.com/S38j4f5.png)

## 前置作業
- angular 9
- 請記得把[dgc-tw-vaccine-service](#)給架起來
- 請先安裝[angular CLI](https://angular.tw/guide/setup-local) 9.0
> `npm install -g @angular/cli`

## 設定
`proxy.config.json`用來轉發api要call什麼url的設定檔
```JSON
{
    "/api": { //dgc-tw-vaccine-service
        "target": "http://localhost:9191", 
        "secure": false
    } ,
    "/dgca-issuance-service" : { //dgc-issuance-service
        "target" : "https://example.com",
        "secure" : true,
        "changeOrigin": true,
        "auth" : "username:password"
    }
}
```
## 啟動
- Run `npm install`
- Run `npm run start`