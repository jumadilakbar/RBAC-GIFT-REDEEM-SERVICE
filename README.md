
## Gift Redeem Service
### List Fitur
**1. Role Base Access Controll**
**2. Auth**
**3. User Management**
**4. Gift Product Management and Upload File**
**5. Redeem Gift by Point**
**5. Rating Gift by Redeem Gift**
## Gift Redeem Service
### Configuration
Agar aplikasi dapat berjalan dengan parameter-parameter tertentu, sebaiknya dapat memanfaatkan
konfigurasi manajemen. Berikut ini modul yang digunakan terkait konfigurasi.
| Modul | Kegunaan |
|-|-|
| [NestJS Config](https://npmjs.com/package/@nestjs/config) | memanajemen konfigurasi |

### Authentication
Metode otentikasi yang digunakan adalah Bearer dengan JWT sebagai tokennya.
Berikut ini modul terkait kebutuhan otentikasi.
| Modul | Kegunaan |
|-|-|
| [NestJS Passport](https://www.npmjs.com/package/@nestjs/passport) | melakukan otentikasi sesuai strategi yang digunakan |
| [NestJS JWT](https://www.npmjs.com/package/@nestjs/jwt) | membuat dan memvalidasi token | 

### Database  & File Uload
Skeleton ini dapat memanajemen data dengan memanfaatkan database management system (DBMS).
Pemanfaatan database ini dibantu ORM (Object-Relational Mapping) dengan rangkaian modul
berikut ini.
| Modul | Kegunaan |
|-|-|
| [NestJS TypeORM](https://www.npmjs.com/package/@nestjs/typeorm) | sebagai ORM |
| [PG](https://www.npmjs.com/package/pg) | menyambungkan ke DBMS PostgreSQL |
| [Multer](https://www.npmjs.com/package/multer) | Untuk Mengelola file Upload |
## Setup .env
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=testing
TYPEORM_SYNC=false
API_PORT=9300
```
## Project setup
Node Version : v18.19.0
```bash
$ npm install
```

## Migrate and Seeder DB

```bash
# Generate File Migration
$ npm run migration:generate

# Migration Schema to Database
$ npm run migration:run

# Create Data Seeder
$ npm run seed
```
Note : Jika ingin menggukan database yang sudah tersedia maka lakukan import saja tanpa menjalan perintah seeder.
###### Berikut urutan import table agar tidak terjadi error pada relasinya
1. user
2. gift
3. redeem
4. rating 

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment using PM2
Demo : http://103.193.179.154:9300/api/v1 : {{base_url}} at postman for testing API
```bash
$ npm install pm2 -g
$ nest build or npm run build
$ pm2 start dist/main.js --name "Backend Redeem Service"

AUTO UP
pm2 startup
pm2 save
```

## Stay in touch
link Detail penjelasin API dengan Video : https://drive.google.com/drive/folders/1JAYGsvJ-Nwphxy9BwD_dYfUbM8YmRu1d?usp=sharing
- Author - [Muhamad Jumadil Akbar](https://bit.ly/mja-portofolio2024)
- Contact - [muhamadjumadilakbar@gmail.com]

### Configuration
Agar aplikasi dapat berjalan dengan parameter-parameter tertentu, sebaiknya dapat memanfaatkan
konfigurasi manajemen. Berikut ini modul yang digunakan terkait konfigurasi.
| Modul | Kegunaan |
|-|-|
| [NestJS Config](https://npmjs.com/package/@nestjs/config) | memanajemen konfigurasi |

### Authentication
Metode otentikasi yang digunakan adalah Bearer dengan JWT sebagai tokennya.
Berikut ini modul terkait kebutuhan otentikasi.
| Modul | Kegunaan |
|-|-|
| [NestJS Passport](https://www.npmjs.com/package/@nestjs/passport) | melakukan otentikasi sesuai strategi yang digunakan |
| [NestJS JWT](https://www.npmjs.com/package/@nestjs/jwt) | membuat dan memvalidasi token | 

### Database  & File Uload
Skeleton ini dapat memanajemen data dengan memanfaatkan database management system (DBMS).
Pemanfaatan database ini dibantu ORM (Object-Relational Mapping) dengan rangkaian modul
berikut ini.
| Modul | Kegunaan |
|-|-|
| [NestJS TypeORM](https://www.npmjs.com/package/@nestjs/typeorm) | sebagai ORM |
| [PG](https://www.npmjs.com/package/pg) | menyambungkan ke DBMS PostgreSQL |
| [Multer](https://www.npmjs.com/package/multer) | Untuk Mengelola file Upload |
## Setup .env
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=testing
TYPEORM_SYNC=false
API_PORT=9300
```
## Project setup
Node Version : v18.19.0
```bash
$ npm install
```

## Migrate and Seeder DB

```bash
# Generate File Migration
$ npm run migration:generate

# Migration Schema to Database
$ npm run migration:run

# Create Data Seeder
$ npm run seed
```
Note : Jika ingin menggukan database yang sudah tersedia maka lakukan import saja tanpa menjalan perintah seeder.
###### Berikut urutan import table agar tidak terjadi error pada relasinya
1. user
2. gift
3. redeem
4. rating 

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment using PM2
Demo : http://103.193.179.154:9300/api/v1 : {{base_url}} at postman for testing API
```bash
$ npm install pm2 -g
$ nest build or npm run build
$ pm2 start dist/main.js --name "Backend Redeem Service"

AUTO UP
pm2 startup
pm2 save
```

## Stay in touch
link Detail penjelasin API dengan Video : https://drive.google.com/drive/folders/1JAYGsvJ-Nwphxy9BwD_dYfUbM8YmRu1d?usp=sharing
- Author - [Muhamad Jumadil Akbar](https://bit.ly/mja-portofolio2024)
- Contact - [muhamadjumadilakbar@gmail.com]
