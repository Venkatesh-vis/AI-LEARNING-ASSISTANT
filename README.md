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

The platform follows a Retrieval-Augmented Generation (RAG) architecture where relevant document chunks are retrieved and provided as context before AI generation.

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
└───────┬─────────────────┬──────────────────┬───────────────┘
        │                 │                  │
        ▼                 ▼                  ▼

   Documents       Flashcards         AI Learning
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

# Database Architecture

```text
Users
 │
 │ 1:N
 ▼

Documents
 │
 ├───────────────┐
 │               │
 ▼               ▼

FlashCards     Quizzes

 │
 ▼

ChatHistory
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

### Chat History Persistence

Conversations are stored in MongoDB.

Benefits:

* Persistent conversations
* Future memory support
* Better user experience

---

# Technology Stack

| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| Frontend        | React, TypeScript, Tailwind CSS, Redux Tool Kit |
| Backend         | Node.js, Express.js                             |
| Database        | MongoDB, Mongoose                               |
| Authentication  | JWT, HttpOnly Cookies                           |
| File Upload     | Multer                                          |
| PDF Processing  | pdf-parse                                       |
| Cloud Storage   | Cloudinary                                      |
| AI Model        | Gemini 2.5 Flash                                |
| AI Pattern      | Retrieval-Augmented Generation (RAG)            |
| Version Control | Git, GitHub                                     |
| API Testing     | Postman                                         |

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
* Quiz Performance Tracking
* Chat History Tracking
* Ownership-Based Access Control

```
```
