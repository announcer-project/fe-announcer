# Announcer - Frontend
## Installing
ติดตั้ง <a href="https://nodejs.org/en/download/">Node.js</a> บนเครื่องที่จะทำการรันตัวโปรเจค

## Getting Started
1. ติดตั้ง package ที่จะต้องใช้สำหรับตัวโปรเจค
```bash
npm install
```

2. รันตัวโปรเจค
```bash
npm run start
```
โปรเจคจะรันที่ http://localhost:3000

## Learn More
สามารถแก้ไขการตั้งค่าต่าง ๆ ได้ที่ไฟล์ .env
1. REACT_APP_FE_PATH คือ Path ของ Frontend ในที่นี้คือ http://localhost:3000
2. REACT_APP_BE_PATH คือ Path ของ Backend ในที่นี้คือ http://localhost:8000
```bash
REACT_APP_FE_PATH = http://localhost:3000
REACT_APP_BE_PATH = http://localhost:8000
```