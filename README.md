# Mp3
Website nghe nhạc trực tuyến. Xây dựng trên Angular 2 Framework

## Cài đặt

Trước tiên cần có các phần mềm: NodeJS và angular-cli.

* NodeJS: [Tải về](https://nodejs.org/)
* Angular-CLI: `npm i -g angular-cli`

## Chỉnh sửa

Để thay đổi thumbnail mặc định, facebook url và album nhạc ZingMP3 có thể thực hiện trong file **src/app/app.module.ts**.

## Run

Để chạy website, gõ lệnh sau khi ở thư mục gốc
```
ng serve
```

## Build

Để build website, có thể chạy lệnh

```
ng build -prod -sm false
```

Sau khi lệnh đã chạy xong ta có được thư mục **dist**, upload thư mục này lên webserver.

## Tác giả

Website thực hiện bởi **Ngô Xuân Bách** (<http://ngobach.com>).  
Email: <thanbaiks@gmail.com>.
