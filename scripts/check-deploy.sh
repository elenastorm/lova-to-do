#!/bin/sh
# Проверка на сервере: что задеплоено и перезапуск при необходимости
# Запускать на сервере: ssh root@130.49.149.176 "cd /root/lova-to-do && sh scripts/check-deploy.sh"

set -e
echo "=== Проверка файлов ==="
ls -la src/app/page.tsx 2>/dev/null && head -5 src/app/page.tsx || echo "Файл не найден"
echo ""
ls -la src/app/love/page.tsx 2>/dev/null && echo "Есть /love" || echo "Нет src/app/love/page.tsx"
echo ""
echo "=== Пересборка и запуск ==="
podman compose down
podman compose build --no-cache
podman compose up -d
echo ""
echo "=== Готово. Проверь: http://IP/ и http://IP/love ==="
