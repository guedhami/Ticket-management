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

- **MongoDB**: Database
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
   git clone https://github.com/yourusername/ticket-management.git
   cd ticket-management
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
     kubectl apply -f kubernetes/
     ```

5. **Configure Jenkins for CI/CD**

   - Set up a Jenkins pipeline to automate the build and deployment process.

6. **Set Up Monitoring**

   - Deploy Prometheus and Grafana to monitor the application and Kubernetes cluster.

7. **Implement GitOps with ArgoCD**

   - Install ArgoCD and sync it with your Git repository.

---

## Monitoring & Observability

### Prometheus

Prometheus is used to collect metrics from the application and Kubernetes cluster. It provides insights into the system's health and performance.

### Grafana

Grafana is used to visualize the metrics collected by Prometheus through customizable dashboards.

---

## CI/CD Pipeline

The project uses **Jenkins** to automate the CI/CD process, which includes:

- Building Docker images
- Running tests
- Deploying the application to Kubernetes

---

## GitOps with ArgoCD

The project implements GitOps principles using **ArgoCD**. All application configurations are stored in Git, making it the single source of truth for deployments.

### ArgoCD Setup

- Install ArgoCD on your Kubernetes cluster.
- Connect ArgoCD to your Git repository.
- Synchronize the cluster state with the repository.

---

## Conclusion

The Ticket Management project showcases a practical application of DevOps practices, leveraging modern tools and frameworks to ensure scalability, reliability, and maintainability.

