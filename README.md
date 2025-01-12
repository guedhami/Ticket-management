# Ticket Management Project

## Overview
The Ticket Management project is a web-based application developed using the **MERN stack (MongoDB, Express, React, Node.js)**. The project demonstrates modern DevOps practices, including containerization, continuous integration, deployment, monitoring, and GitOps workflows.

This project aims to provide a scalable and maintainable system for managing tickets, incorporating best practices in software development and infrastructure automation.

---

## Features
- Create, update, and manage tickets
- Containerized using Docker
- Deployed on Kubernetes
- CI/CD pipeline using Jenkins
- Monitoring and observability with Prometheus and Grafana
- GitOps implementation with ArgoCD

---

## Technologies Used
- **MongoDB**: Database for storing ticket information
- **Express.js**: Backend framework
- **React.js**: Frontend framework
- **Node.js**: Runtime environment
- **Docker**: Containerization
- **Kubernetes**: Orchestration
- **Jenkins**: CI/CD automation
- **Prometheus**: Metrics collection
- **Grafana**: Data visualization
- **ArgoCD**: GitOps deployment

---

## Project Structure
The project is structured as follows:
```
project-directory/
├── backend/
│   └── Dockerfile
├── frontend/
│   └── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
└── k8S/
    ├── app-config.yaml
    ├── app-v1.yaml
    ├── backend-deployment.yml
    ├── backend-service.yaml
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── mongodb-deployment.yaml
    └── mongodb-service.yaml
```

---

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose
- Jenkins
- Kubernetes (Minikube)
- Prometheus
- Grafana
- ArgoCD

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/guedhami/Ticket-management
   cd Ticket-management
   ```

2. **Build Docker Images**
   ```bash
   docker-compose build
   ```

3. **Run Docker Compose**
   ```bash
   docker-compose up
   ```

4. **Set Up Kubernetes Cluster**
   - Use Minikube or Kind to create a local Kubernetes cluster.
   - Apply the Kubernetes manifests:
     ```bash
     kubectl apply -f k8S/
     ```

5. **Configure Jenkins for CI/CD**
   - Jenkins is used to automate the CI/CD pipeline by integrating Docker and Kubernetes. The pipeline pulls the latest code from GitHub, builds Docker images for the backend and frontend, and pushes them to a container registry before deploying to the Kubernetes cluster. It also includes automated tests to ensure code quality.

6. **Set Up Monitoring**
   - Prometheus is deployed to scrape metrics from the Kubernetes cluster and application pods. It collects data on resource usage, request latency, and error rates. Grafana visualizes these metrics through interactive dashboards, helping to monitor system health and performance.

7. **Implement GitOps with ArgoCD**
   - ArgoCD is used to implement GitOps, ensuring that the cluster state matches the desired state defined in the Git repository. ArgoCD continuously monitors the repository and applies changes automatically, reducing the need for manual interventions. It also provides a web interface to track the synchronization status and application health.

---

## Monitoring & Observability

### Prometheus
Prometheus is used to collect metrics from the application and Kubernetes cluster. It provides insights into the system's health and performance. Ensure that Prometheus is updated to scrape new metrics as the application evolves.

### Grafana
Grafana is used to visualize the metrics collected by Prometheus through customizable dashboards. Regularly review and update your dashboards to reflect current monitoring needs.

---

## CI/CD Pipeline
The project uses **Jenkins** to automate the CI/CD process, which includes:
- Building Docker images
- Running tests
- Deploying the application to Kubernetes

The pipeline integrates GitHub, Docker, and Kubernetes to ensure smooth code delivery. It builds the backend and frontend images using Docker, pushes them to a registry, and applies Kubernetes manifests to update the cluster.

---

## GitOps with ArgoCD
The project implements GitOps principles using **ArgoCD**. All application configurations are stored in Git, making it the single source of truth for deployments.

### ArgoCD Setup
- ArgoCD continuously monitors the Git repository and applies changes to the cluster automatically.
- The synchronization ensures that the Kubernetes cluster always reflects the latest configurations in Git, minimizing configuration drift.
- ArgoCD also provides a user-friendly dashboard to manage and monitor the deployments.

---

## Conclusion
The Ticket Management project showcases a practical application of DevOps practices, leveraging modern tools and frameworks to ensure scalability, reliability, and maintainability. With Jenkins, Prometheus, Grafana, and ArgoCD already in place, focus on maintaining these tools and adapting them to new project requirements as needed. By using containerization, CI/CD pipelines, and GitOps workflows, the project ensures a robust and automated development lifecycle.

