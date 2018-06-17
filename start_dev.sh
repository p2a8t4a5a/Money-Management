#!/usr/bin/env bash
export STATISTICS_SERVICE_PASSWORD="test123"
export NOTIFICATION_SERVICE_PASSWORD="test123"
export ACCOUNT_SERVICE_PASSWORD="test123"
export MONGODB_PASSWORD="test123"
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up