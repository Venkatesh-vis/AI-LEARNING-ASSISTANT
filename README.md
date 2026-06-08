# AI Learning Platform

An AI-powered document learning platform that transforms PDFs into interactive study materials using Retrieval-Augmented Generation (RAG), Gemini AI, Flashcards, Quizzes, Summaries, and Context-Aware Chat.

The platform allows users to upload study materials, notes, documentation, resumes, or interview preparation content and convert them into AI-generated learning resources.

---

# Overview

The system combines document processing, retrieval techniques, and Large Language Models to create a personalized learning experience.

Users can:

* Upload PDF documents
* Generate AI Flashcards
* Generate AI Quizzes
* Generate AI Summaries
* Chat with uploaded documents
* Ask concept-based questions
* Track learning progress
* Review flashcards
* Maintain conversation history

The platform follows a lightweight Retrieval-Augmented Generation (RAG) architecture where relevant document chunks are retrieved using a custom keyword-based retrieval algorithm and provided as context before AI generation.

---

# Problem Statement

Traditional study materials such as PDFs, notes, documentation, and interview preparation guides are static and difficult to interact with.

Users often spend significant time manually:

* Creating flashcards
* Building quizzes
* Writing summaries
* Revising concepts
* Searching through lengthy documents

This platform automates the learning workflow by transforming uploaded PDF documents into interactive AI-powered learning resources.

The goal is to improve:

* Learning efficiency
* Knowledge retention
* Revision speed
* Concept understanding
* Interview preparation

through Retrieval-Augmented Generation (RAG) and Large Language Models.

---

# Backend Module Architecture

```text
Backend
│
├── Authentication Module
│   ├── Register
│   ├── Login
│   ├── Profile Management
│   └── Password Management
│
├── Document Module
│   ├── PDF Upload
│   ├── Processing Pipeline
│   ├── Retrieval
│   └── Document Management
│
├── Flashcard Module
│   ├── Flashcard Retrieval
│   ├── Review Tracking
│   ├── Starred Flashcards
│   └── Learning Analytics
│
├── Quiz Module
│   ├── Quiz Retrieval
│   ├── Quiz Submission
│   ├── Score Calculation
│   ├── Result Analytics
│   └── Quiz Management
│
├── AI Module
│   ├── Flashcard Generation
│   ├── Quiz Generation
│   ├── Summary Generation
│   ├── Concept Explanation
│   └── Context-Aware Chat
│
└── Retrieval Module
    ├── Chunk Search
    ├── Relevance Scoring
    └── Context Construction
```

---

# System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATION                      │
│                                                             │
│           React + TypeScript + Tailwind CSS + RTK           │
│                                                             │
│  • Authentication                                           │
│  • PDF Upload                                               │
│  • Flashcards                                               │
│  • Quizzes                                                  │
│  • AI Chat                                                  │
│  • Concept Learning                                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                     EXPRESS API SERVER                      │
│                                                             │
│                  Node.js + Express.js                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                     │
│                                                             │
│  JWT Authentication                                         │
│  HttpOnly Cookies                                           │
│  7 Day Expiration                                           │
│  Route Protection                                           │
│  Ownership Validation                                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION MODULES                      │
└───────┬──────────────┬──────────────┬──────────────┬────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼

   Documents      Flashcards       Quizzes      AI Learning
```

---

# End-to-End User Flow

```text
Register / Login
        │
        ▼
JWT Cookie Authentication
        │
        ▼
Upload PDF
        │
        ▼
Cloudinary Storage
        │
        ▼
PDF Text Extraction
        │
        ▼
Chunk Generation
        │
        ▼
MongoDB Storage
        │
        ▼

 ┌─────────────┬──────────────┬──────────────┬──────────────┐
 │             │              │              │
 ▼             ▼              ▼              ▼

Summary    Flashcards       Quiz         AI Chat
Generate   Generate      Generate      with RAG

 │             │              │              │
 └─────────────┴──────────────┴──────────────┘
                       │
                       ▼

            Personalized Learning
```

---

# Document Processing Architecture

```text
PDF Upload
    │
    ▼
Multer Validation
    │
    ▼
Temporary Storage
    │
    ▼
Cloudinary Upload
    │
    ▼
Store URL + Public ID
    │
    ▼
Create Document Record
    │
    ▼
Status = Processing
    │
    ▼
PDF Parsing
    │
    ▼
Text Extraction
    │
    ▼
Chunk Generation
    │
    ▼
Store Chunks
    │
    ▼
Status = Ready
```

---

# Retrieval-Augmented Generation (RAG) Architecture

```text
Document
    │
    ▼
Extracted Text
    │
    ▼
Chunks
    │
    ▼
MongoDB
    │
    ▼

User Question
    │
    ▼

findRelevantChunks()
    │
    ▼

Keyword Analysis
    │
    ▼

Chunk Scoring

 • Exact Match
 • Partial Match
 • Multi-word Match
 • Position Bonus
 • Length Normalization

    │
    ▼

Top Relevant Chunks
    │
    ▼

Context Construction
    │
    ▼

Gemini 2.5 Flash
    │
    ▼

Generated Response
```

---

# AI Learning Architecture

```text
Document Chunks
       │
       ▼

Gemini 2.5 Flash

       │
 ┌─────┼─────────────┬─────────────┬─────────────┐
 │     │             │             │             │
 ▼     ▼             ▼             ▼             ▼

Chat  Summary   Flashcards      Quiz     Explanations

       │             │             │
       ▼             ▼             ▼

 MongoDB       FlashCard DB    Quiz DB
```

---

# Quiz Architecture

```text
Generate Quiz
      │
      ▼

Store Quiz
      │
      ▼

User Takes Quiz
      │
      ▼

Submit Answers
      │
      ▼

Score Calculation
      │
      ▼

Store Results
      │
      ▼

View Analytics
```

Quiz capabilities include:

* Quiz generation using Gemini AI
* Quiz retrieval by document
* Quiz retrieval by ID
* Quiz submission
* Automatic scoring
* Answer validation
* Detailed result analytics
* Quiz deletion
* Learning progress tracking

---

# Database Architecture

```text
Users
 │
 │ 1:N
 ▼

Documents
 │
 ├───────────────┬───────────────┬───────────────┐
 │               │               │               │
 ▼               ▼               ▼               ▼

FlashCards     Quizzes      ChatHistory    AI Features
```

---

# Key Design Decisions

### JWT + HttpOnly Cookies

Authentication tokens are stored in HttpOnly cookies instead of local storage.

Benefits:

* Reduced XSS exposure
* Automatic browser handling
* Improved security

---

### Cloudinary Storage

PDFs are stored in Cloudinary rather than locally.

Benefits:

* Scalable storage
* Reduced server disk usage
* Easier file management

---

### Chunk-Based Processing

Documents are divided into chunks before AI processing.

Benefits:

* Lower token consumption
* Better retrieval accuracy
* Supports future vector search

---

### Retrieval Before Generation

Relevant chunks are retrieved before sending context to Gemini.

Benefits:

* Better answer quality
* Reduced hallucinations
* More accurate document chat

---

### Quiz Analytics Storage

Quiz submissions store:

* User answers
* Correctness
* Completion timestamps
* Final scores

Benefits:

* Learning analytics
* Progress tracking
* Performance review
* Future dashboard support

---

### Chat History Persistence

Conversations are stored in MongoDB.

Benefits:

* Persistent conversations
* Future memory support
* Better user experience

---

# Security Architecture

### Authentication

* JWT-based authentication
* HttpOnly cookie storage
* 7-day token expiration
* Route protection middleware

### Authorization

All resources are ownership-scoped.

```javascript
{
  userId: req.user.id
}
```

This prevents users from accessing documents, quizzes, flashcards, or chat history belonging to other users.

### Password Security

* Passwords are hashed using bcrypt
* Password field excluded using `select: false`

### File Validation

Uploads are restricted to:

* PDF files only
* Maximum size: 10 MB

---

# Scalability Considerations

### Asynchronous Document Processing

PDF uploads return immediately while extraction and chunk generation continue in the background.

Benefits:

* Faster API responses
* Better user experience
* Improved scalability

### Cloud Storage Separation

Files are stored in Cloudinary while metadata remains in MongoDB.

Benefits:

* Reduced server storage usage
* Independent file scaling

### Chunk-Based Retrieval

Benefits:

* Lower token consumption
* Better retrieval accuracy
* Improved context relevance

### Modular AI Services

Benefits:

* Easier maintenance
* Future model replacement
* Multi-model support

---

# Technology Stack

| Layer           | Technology                                     |
| --------------- | ---------------------------------------------- |
| Frontend        | React, TypeScript, Tailwind CSS, Redux Toolkit |
| Backend         | Node.js, Express.js                            |
| Database        | MongoDB, Mongoose                              |
| Authentication  | JWT, HttpOnly Cookies                          |
| File Upload     | Multer                                         |
| PDF Processing  | pdf-parse                                      |
| Cloud Storage   | Cloudinary                                     |
| AI Model        | Gemini 2.5 Flash                               |
| AI Pattern      | Retrieval-Augmented Generation (RAG)           |
| Version Control | Git, GitHub                                    |
| API Testing     | Postman                                        |

---

# Core Features

* JWT Authentication
* HttpOnly Cookie Sessions
* PDF Upload & Processing
* Cloudinary File Storage
* PDF Text Extraction
* Document Chunking
* Retrieval-Augmented Generation (RAG)
* AI Flashcard Generation
* AI Quiz Generation
* AI Summary Generation
* Context-Aware Document Chat
* AI Concept Explanations
* Flashcard Review Tracking
* Starred Flashcards
* Quiz Generation
* Quiz Submission
* Quiz Scoring
* Quiz Result Analytics
* Chat History Tracking
* Ownership-Based Access Control
* Learning Progress Tracking

```
```
