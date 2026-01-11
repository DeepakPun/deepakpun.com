#!/bin/bash
set -euo pipefail # Fail-fast on errors

# --- 2026 Docker Management Script ---
# Usage: ./manage-docker.sh [build|stop|clean|restart|watch|up-watch]

# Reusable Docker Actions
stop_containers() {
    echo "🛑 Stopping project containers..."
    docker compose down
}

deep_clean() {
    echo "🧹 Deep cleaning local Docker environment..."
    docker compose down --volumes --remove-orphans
    docker system prune -a --volumes -f
    echo "✨ Environment is now clean."
}

# Cleanup specifically for interactive/watch modes
interactive_cleanup() {
    echo -e "\n🛑 Interruption detected! Performing quick stop..."
    docker compose down
    exit 0
}

COMMAND=${1:-"help"} # Default to help if no command provided

case "$COMMAND" in
  build)
    echo "🚀 Building and starting containers..."
    docker compose up --build -d
    ;;
  
  stop)
    stop_containers
    ;;

  clean)
    deep_clean
    ;;

  restart)
    echo "🔄 Restarting ecosystem..."
    stop_containers
    docker compose up --build -d
    ;;

  watch | up-watch)
    # Register trap ONLY for these interactive commands
    trap interactive_cleanup SIGINT SIGTERM
    
    if [[ "$COMMAND" == "watch" ]]; then
        echo "👀 Starting Watch Mode (Sync Focus)..."
        docker compose watch
    else
        echo "🚀 Starting All Services with Watch + Logs..."
        docker compose up --watch
    fi
    ;;

  *)
    echo "Usage: $0 {build|stop|clean|restart|watch|up-watch}"
    exit 1
    ;;
esac
