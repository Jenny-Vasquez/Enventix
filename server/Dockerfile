FROM php:8.2-cli


# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    unzip zip git curl libpng-dev libonig-dev libxml2-dev libcurl4-openssl-dev \
    && docker-php-ext-install pdo pdo_mysql


# Instalar extensión de MongoDB
RUN pecl install mongodb && docker-php-ext-enable mongodb


# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


# Establecer directorio de trabajo
WORKDIR /var/www/html


# Copiar código de Laravel (asegúrate de que exista en backend/)
COPY . .


# Instalar dependencias de Laravel
RUN ls -la
RUN composer install


# Comando para ejecutar Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]