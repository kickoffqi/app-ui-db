# Events app stack

Structure:
- apps/api: FastAPI CRUD service with health checks
- apps/frontend: Next.js UI (list/detail/create)
- infra/k8s: Kustomize base + overlays

Quick start (local):
- API: `uvicorn apps.api.main:app --reload --port 8000`
- Frontend: `cd apps/frontend && npm install && npm run dev`

Kubernetes:
- Base: `kustomize build infra/k8s/base`
- Dev: `kustomize build infra/k8s/overlays/dev`

Install Ingress-nginx
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace
