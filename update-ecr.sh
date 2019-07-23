$(aws ecr get-login --no-include-email --region ca-central-1)
docker build -t liangzi-dashboard-backend .
docker tag liangzi-dashboard-backend:latest 823715915892.dkr.ecr.ca-central-1.amazonaws.com/liangzi-dashboard-backend:latest
docker push 823715915892.dkr.ecr.ca-central-1.amazonaws.com/liangzi-dashboard-backend:latest