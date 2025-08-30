version: '3.8'

services:
  mysql:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: todos
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

  backend:
    build:
      context: ./backend
      target: backend-dev
    ports:
      - "3001:3001"
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: root
      MYSQL_DATABASE: todos
    depends_on:
      - mysql
    develop:
      watch:
        - path: ./backend/src
          action: sync
          target: /usr/local/app/src
        - path: ./backend/package.json
          action: rebuild

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: frontend-dev
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_BASE: http://backend:3001
    depends_on:
      - backend
    develop:
      watch:
        - path: ./frontend/pages
          action: sync
          target: /usr/local/app/pages
        - path: ./frontend/components
          action: sync
          target: /usr/local/app/components
        - path: ./frontend/package.json
          action: rebuild

volumes:
  mysql-data:
