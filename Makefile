include .env

connect_admin_URL=mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${WEGONICE_HOST}:${WEGONICE_PORT}
connect_user_URL=mongodb://${WEGONICE_USER}:${WEGONICE_PWD}@${WEGONICE_HOST}:${WEGONICE_PORT}

db-connect-admin:
	docker exec -it wegonice-db mongosh "${connect_admin_URL}/admin?authSource=admin"

db-connect-user:
	docker exec -it wegonice-db mongosh "${connect_user_URL}/${WEGONICE_DB}?authSource=${WEGONICE_DB}"

db-create-user:
	docker exec -it wegonice-db mongosh "${connect_admin_URL}/${WEGONICE_DB}?authSource=admin" --eval 'db.createUser({ user: "${WEGONICE_USER}", pwd: "${WEGONICE_PWD}", roles: [{ role: "readWrite", db: "${WEGONICE_DB}"}]});'