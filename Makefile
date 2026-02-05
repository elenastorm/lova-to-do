# Makefile для lova-to-do
# Упрощает деплой и управление проектом

# Конфигурация
SERVER_IP = 130.49.149.176
SERVER_USER = root
SERVER_PATH = /root/lova-to-do
LOCAL_PATH = /Users/elmarshtupa/Vibe/lova-to-do/

# Цвета для вывода
GREEN = \033[0;32m
YELLOW = \033[0;33m
NC = \033[0m # No Color

.PHONY: help dev commit push sync deploy update logs status stop start restart

# По умолчанию показываем справку
help:
	@echo ""
	@echo "$(GREEN)🐱 Lova To-Do — команды$(NC)"
	@echo ""
	@echo "  $(YELLOW)Локальная разработка:$(NC)"
	@echo "    make dev          — запустить dev-сервер"
	@echo ""
	@echo "  $(YELLOW)Git:$(NC)"
	@echo "    make commit m=\"текст\"  — коммит с сообщением"
	@echo "    make push              — пуш на GitHub"
	@echo ""
	@echo "  $(YELLOW)Деплой на сервер:$(NC)"
	@echo "    make sync         — синхронизировать файлы на сервер"
	@echo "    make deploy       — пересобрать и запустить на сервере"
	@echo "    make update       — полный цикл: commit + push + sync + deploy"
	@echo ""
	@echo "  $(YELLOW)Управление сервером:$(NC)"
	@echo "    make logs         — показать логи контейнера"
	@echo "    make status       — статус контейнера"
	@echo "    make stop         — остановить контейнер"
	@echo "    make start        — запустить контейнер"
	@echo "    make restart      — перезапустить контейнер"
	@echo "    make ssh          — подключиться к серверу"
	@echo ""

# === Локальная разработка ===

dev:
	@echo "$(GREEN)🚀 Запуск dev-сервера...$(NC)"
	npm run dev

# === Git ===

commit:
ifndef m
	$(error Укажи сообщение: make commit m="твоё сообщение")
endif
	@echo "$(GREEN)📝 Коммит: $(m)$(NC)"
	git add -A
	git commit -m "$(m)"

push:
	@echo "$(GREEN)📤 Пуш на GitHub...$(NC)"
	git push origin main

# === Деплой ===

sync:
	@echo "$(GREEN)📦 Синхронизация файлов на сервер...$(NC)"
	rsync -avz --progress \
		--exclude 'node_modules' \
		--exclude '.next' \
		--exclude '.git' \
		--exclude '*.db' \
		--exclude '.env' \
		$(LOCAL_PATH) \
		$(SERVER_USER)@$(SERVER_IP):$(SERVER_PATH)/

deploy:
	@echo "$(GREEN)🐳 Пересборка и запуск на сервере...$(NC)"
	ssh $(SERVER_USER)@$(SERVER_IP) "cd $(SERVER_PATH) && docker compose down && docker compose up -d --build"
	@echo "$(GREEN)✅ Деплой завершён!$(NC)"
	@echo "$(YELLOW)🌐 Сайт: http://$(SERVER_IP):3000$(NC)"

# Полный цикл обновления
update:
ifndef m
	$(error Укажи сообщение: make update m="твоё сообщение")
endif
	@echo "$(GREEN)🔄 Полное обновление...$(NC)"
	@echo ""
	@$(MAKE) commit m="$(m)"
	@$(MAKE) push
	@$(MAKE) sync
	@$(MAKE) deploy
	@echo ""
	@echo "$(GREEN)🎉 Всё готово!$(NC)"

# === Управление сервером ===

logs:
	@echo "$(GREEN)📋 Логи контейнера (Ctrl+C для выхода):$(NC)"
	ssh $(SERVER_USER)@$(SERVER_IP) "cd $(SERVER_PATH) && docker compose logs -f"

status:
	@echo "$(GREEN)📊 Статус контейнера:$(NC)"
	ssh $(SERVER_USER)@$(SERVER_IP) "cd $(SERVER_PATH) && docker compose ps"

stop:
	@echo "$(YELLOW)⏹️  Остановка контейнера...$(NC)"
	ssh $(SERVER_USER)@$(SERVER_IP) "cd $(SERVER_PATH) && docker compose down"

start:
	@echo "$(GREEN)▶️  Запуск контейнера...$(NC)"
	ssh $(SERVER_USER)@$(SERVER_IP) "cd $(SERVER_PATH) && docker compose up -d"

restart:
	@echo "$(YELLOW)🔄 Перезапуск контейнера...$(NC)"
	ssh $(SERVER_USER)@$(SERVER_IP) "cd $(SERVER_PATH) && docker compose restart"

ssh:
	@echo "$(GREEN)🔐 Подключение к серверу...$(NC)"
	ssh $(SERVER_USER)@$(SERVER_IP)
