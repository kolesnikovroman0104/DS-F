# Деловая Сфера

Сервис Онлайн регистрации юридических лиц, а так же внесения изменений в действующий бизнес через Электронно цифровую подпись без участия нотариуса, и без поездки в налоговую. 

## Getting Started

Based at laravel 5.5, so just run 
```
composer update 
php artisan serve
php artisan migrate
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
npm install
```

### Prerequisites

Your server must have the following requirements:

```
PHP >= 7.0.0
OpenSSL PHP Extension
PDO PHP Extension
Mbstring PHP Extension
Tokenizer PHP Extension
XML PHP Extension

```
