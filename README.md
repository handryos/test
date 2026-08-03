# Coffee Management Application

A full-stack coffee management application built to practice clean architecture principles across both frontend and backend, emphasizing scalability, maintainability, and separation of concerns. It features a React-based UI, a REST API, database persistence, and a complete CRUD workflow following modern software engineering best practices.

## Overview

This project is a full-stack application that manages a collection of coffees. It demonstrates how to structure a modern web application using clean architecture concepts while keeping the frontend and backend decoupled.

The repository contains separate frontend and backend applications that communicate through a REST API.

## Features

- Display a list of coffees fetched from the backend
- Add new coffees through a dedicated form
- Prevent duplicate coffee names
- Persist data in a relational database
- Database seeding support
- Responsive UI based on the provided design

## Project Structure

- **Frontend** – React/Next.js application
- **Backend** – REST API
- **Database** – Persistent relational database with seed support

Refer to the project-specific documentation:

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

## Architecture

This project focuses on applying software engineering best practices, including:

- Clean Architecture
- Separation of Concerns
- Reusable Components
- Layered Backend Design
- RESTful API Design
- Database Persistence
- Validation
- Maintainable and Scalable Code

## Core Functionality

### Coffee List

The application retrieves all coffees from the backend and displays them in the frontend.

Each coffee contains:

- id
- name
- description
- type
- price
- imageUrl

### Add Coffee

Users can create a new coffee through a form.

Before inserting a new record, the backend validates that another coffee with the same **name** does not already exist.

## Database

The application stores all data in a persistent database.

A seeding mechanism is provided to populate the database with sample data.

## Possible Improvements

Future enhancements could include:

- Automated tests
- Animations
- Authentication
- Pagination
- Search and filtering
- Image upload
- CI/CD pipeline
- Deployment
- SEO improvements

## Tech Stack

- React / Next.js
- Node.js
- REST API
- Relational Database
- TypeScript

## Goals

This project was developed as a practical exercise to improve knowledge of:

- Frontend architecture
- Backend architecture
- Clean Architecture
- API design
- Database modeling
- Full-stack application development
