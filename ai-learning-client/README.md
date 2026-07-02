# AI Study Platform - Frontend

An AI-powered study platform built using **React, TypeScript, Redux Toolkit, Tailwind CSS, React Router, and Axios**. The application allows users to upload study documents and leverage AI-powered features such as document chat, summaries, quizzes, and flashcards to make learning interactive.

---

# Tech Stack

- React 19
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Lucide React
- Vite

---

# Project Structure

```text
src
│
├── api/                
├── assets/
├── components/
│   ├── shared/
│   ├── dashboard/
│   ├── documents/
│   ├── quizzes/
│   ├── flashcards/
│   ├── summary/
│   └── chat/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── document/
│   ├── quiz/
│   ├── ai/
│   └── hooks/
│
├── pages/
├── routes/
├── utils/
└── App.tsx
```

---

# Frontend Architecture

The application follows a **feature-based architecture** where every business module is completely isolated.

Each feature contains:

```text
feature
│
├── featureSlice.ts
├── featureThunk.ts
├── featureService.ts
├── featureTypes.ts
```

### Responsibilities

**Slice**
- Stores application state
- Updates Redux store
- Handles loading and error states

**Thunk**
- Executes asynchronous business logic
- Calls service layer
- Handles API success/error

**Service**
- Contains API calls only
- Uses a shared Axios wrapper

**Types**
- Request models
- Response models
- Interfaces
- Shared types

This separation keeps presentation, business logic, and API communication independent.

---

# Data Flow

```text
User Action

      │

      ▼

React Component

      │

      ▼

Redux Dispatch

      │

      ▼

Async Thunk

      │

      ▼

Service Layer

      │

      ▼

Axios Wrapper

      │

      ▼

Backend API

      │

      ▼

Redux Store

      │

      ▼

Component Re-render
```

---

# Modules

## Authentication

- Register
- Login
- Persistent Authentication
- Protected Routes
- Profile Management

---

## Dashboard

Displays overall application analytics.

- Uploaded Documents
- Generated Quizzes
- Generated Flashcards
- Reviewed Flashcards
- AI Chats
- Summaries

Dashboard updates immediately after successful operations to reduce unnecessary API requests.

---

## Documents

- Upload document
- View documents
- Delete documents

Acts as the entry point for all AI-powered features.

---

## AI Chat

- Document-based AI assistant
- Chat history
- Context-aware responses
- Relevant chunk references

---

## AI Summary

- Generate document summary
- Explain concepts
- AI-powered explanations

---

## Quiz Module

Features:

- Generate quizzes
- Custom title
- Custom question count
- Input validation
- Quiz player
- Score calculation
- Results page
- Question review
- Delete quiz

The UI is divided into reusable components such as:

- Quiz Card
- Quiz Player
- Question
- Options
- Progress
- Pagination
- Results
- Score Card
- Summary
- Review

---

## Flashcards

Features:

- Generate flashcards
- Flashcard Library
- Study Mode
- Card Flip Animation
- Star Cards
- Review Tracking
- Navigation
- Progress Tracking

Library and study experience are built using reusable components to keep the UI modular.

---

## Profile

Displays

- Avatar
- Username
- Email
- Member Since
- Last Updated

Supports inline profile editing with local form state before API submission.

---

# UI Design Principles

- Feature-oriented components
- Reusable UI components
- Responsive layouts
- Loading states
- Error handling
- Empty states
- Confirmation dialogs
- Consistent spacing and typography
- Modern card-based design

---

# State Management

### Global State (Redux)

- Authentication
- Dashboard
- Documents
- Quizzes
- Flashcards
- AI Chat
- Summary

## Local State (React)

- Forms
- Dialogs
- Current Quiz Question
- Flashcard Flip State
- Pagination
- UI Animations

Keeping UI-specific state local avoids unnecessary global re-renders.

---

# API Layer

All network requests go through a centralized request wrapper.

Responsibilities:

- Base URL configuration
- Credentials
- Authorization
- Retry mechanism
- Common error handling

This prevents duplicated networking logic across the application.

---

# Performance Considerations

- Feature-based architecture
- Reusable components
- Minimal Redux state
- Local UI state whenever possible
- Optimistic updates for dashboard metrics
- Reduced unnecessary API calls
- Component composition for maintainability

---

This architecture will:

- Scales well as new features are added
- Separates business logic from UI
- Keeps components reusable
- Makes debugging easier
- Centralizes API communication
- Improves maintainability
- Provides strong TypeScript support
- Enables independent feature development

---

