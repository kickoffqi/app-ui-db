# app-ui-db Docker templates

These are drop-in Dockerfiles for your repo:
- `apps/api/Dockerfile`
- `apps/frontend/Dockerfile`

## API build/run
From repo root:
```bash
docker build -t events-api:dev ./apps/api
docker run --rm -p 8000:8000 events-api:dev
curl http://localhost:8000/healthz
```

## Frontend build/run
From repo root:
```bash
docker build -t events-frontend:dev ./apps/frontend
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 \
  -e API_BASE_URL=http://localhost:8000 \
  events-frontend:dev
```
For Events-API running on other docker image:
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=http://host.docker.internal:8000 \
  events-frontend:dev

## IMPORTANT
The frontend Dockerfile expects **Next.js standalone output**.
In `apps/frontend/next.config.js`, set:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}
module.exports = nextConfig
```

## Next step (AKS)
- Push both images to GHCR (recommended)
- Update `infra/k8s/overlays/dev/kustomization.yaml` image names to match
