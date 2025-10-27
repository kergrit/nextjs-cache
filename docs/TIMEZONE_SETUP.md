# Timezone Setup - Asia/Bangkok

## Changes Made

### 1. Dockerfile
Added timezone data package installation:
```dockerfile
RUN apk add --no-cache tzdata
```

### 2. docker-compose.yml
Added timezone environment variable:
```yaml
environment:
  - TZ=Asia/Bangkok
```

## How to Apply Changes

Since the timezone packages need to be installed in the Docker image, you need to rebuild:

```bash
# Stop and remove containers
docker-compose down

# Rebuild with timezone support
docker-compose build --no-cache

# Start containers
docker-compose up -d

# Verify timezone
docker exec nextjs-cache-app date
```

## Expected Output

After rebuilding, the container should show Bangkok timezone (UTC+7):

```
# Check timezone
docker exec nextjs-cache-app date
# Should show: Mon Oct 27 17:00:00 +07 2024

# Check timezone in logs
docker-compose logs nextjs-cache | grep -i "time"
```

## Verification

You can verify the timezone is working by:
1. Checking Docker logs with timestamps
2. Checking application logs
3. Using `date` command inside container

```bash
# Interactive check
docker exec -it nextjs-cache-app sh
date
# Should show: Mon Oct 27 17:00:00 ICT 2024
```
