# MathTrainer

## Introduction
Simple web application written in Angular 19 for basic mental arithmetic training.

Supports: addition, subtraction, multiplication and division in different difficulty levels (easy, medium, hard).
Each difficulty level increases the number of terms generated and the individual numeric values.
Each training session basic statistics are saved (# correct answers, # wrong answers).

## Requirements
- Docker

## Installation
1. Download the repo
2. Use `npm install` and build the project `npm run build`
3. Run docker-compose.yaml (this will install the MongoDB-Image and the application as an Image)
4. Make sure both images are running in container.
5. Navigate to `http://localhost:9999`

You can change the port settings that fit you best, as well as the configuration for the task generation in
- `aufgaben-generator.config.json`
