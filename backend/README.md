
# 1. Authentication System

## Overview

This system uses **JWT-based cookie authentication** for secure user authentication and authorization.

Authentication tokens are stored in **HttpOnly cookies** with a **7-day expiration period**.

The authentication architecture emphasizes:

* Secure credential handling
* JWT-based authentication
* Cookie-based session management
* Ownership-based access control
* Stateless server architecture

---

## User Model

```javascript
{
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  profilePicture: {
    type: String,
    default: ''
  }
}
```

### Key Decisions

* `select: false` prevents password hashes from being returned accidentally
* Unique email ensures account uniqueness
* Unique username prevents identity conflicts
* `timestamps: true` provides auditability

---

## JWT Strategy

Authentication tokens are generated using JWT.

```javascript
jwt.sign(
  { id },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRE || "7d"
  }
)
```

### JWT Payload

```javascript
{
  id: "687abc123"
}
```

### Design Notes

* Minimal payload reduces token size
* No sensitive user data stored in token
* Tokens expire automatically
* Stateless authentication
* No server-side session storage required

---

## Cookie-Based Authentication

After successful login or registration, JWT tokens are stored inside an HttpOnly cookie.

### Cookie Configuration

```javascript
res.cookie(
  "token",
  token,
  {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
)
```

### Cookie Expiration

```text
7 Days
```

### Benefits

* Token inaccessible from JavaScript
* Reduced XSS attack surface
* Automatic browser storage
* Automatic request inclusion
* Improved security compared to localStorage

---

## Authentication Flow

```text
Register / Login
        │
        ▼
Generate JWT
        │
        ▼
Store JWT In HttpOnly Cookie
        │
        ▼
Browser Stores Cookie
        │
        ▼
Subsequent Requests
        │
        ▼
Authentication Middleware
        │
        ▼
Verify JWT
        │
        ▼
Attach req.user
```

---

## Authentication Middleware

### Purpose

Protects private routes by validating JWT tokens stored in cookies.

### Processing Flow

```text
Read Cookie
    │
    ▼
Extract JWT
    │
    ▼
Verify Signature
    │
    ▼
Validate Expiration
    │
    ▼
Attach User Context
    │
    ▼
Continue Request
```

### Injected Context

```javascript
req.user = {
  id,
  iat,
  exp
}
```

---

# Authentication APIs

---

## Register User

### Route

```http
POST /api/auth/register
```

### Authentication

Not Required

### Request Body

```json
{
  "username": "venkatesh",
  "email": "venkatesh@gmail.com",
  "password": "password123"
}
```

### Processing Flow

```text
Validate Input
      │
      ▼
Check Existing User
      │
      ▼
Hash Password
      │
      ▼
Create User
      │
      ▼
Generate JWT
      │
      ▼
Store Cookie
      │
      ▼
Return User
```

### Success Response

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "687abc123",
      "username": "venkatesh",
      "email": "venkatesh@gmail.com",
      "profilePicture": ""
    }
  },
  "message": "User Registered Successfully"
}
```

### Notes

JWT is stored in an HttpOnly cookie.

No token is returned in the response body.

---

## Login User

### Route

```http
POST /api/auth/login
```

### Authentication

Not Required

### Request Body

```json
{
  "email": "venkatesh@gmail.com",
  "password": "password123"
}
```

### Processing Flow

```text
Validate Input
      │
      ▼
Find User
      │
      ▼
Compare Password
      │
      ▼
Generate JWT
      │
      ▼
Store Cookie
      │
      ▼
Return User
```

### Success Response

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "687abc123",
      "username": "venkatesh",
      "email": "venkatesh@gmail.com",
      "profilePicture": ""
    }
  },
  "message": "Login Successful"
}
```

### Notes

JWT is stored in an HttpOnly cookie.

No token is returned in the response body.

---

## Get Profile

### Route

```http
GET /api/auth/profile
```

### Authentication

Required

### Purpose

Returns the currently authenticated user.

### Success Response

```json
{
  "success": true,
  "data": {
    "_id": "687abc123",
    "username": "venkatesh",
    "email": "venkatesh@gmail.com",
    "profilePicture": ""
  }
}
```

---

## Update Profile

### Route

```http
PUT /api/auth/profile
```

### Authentication

Required

### Request Body

```json
{
  "username": "venkatesh",
  "email": "venkatesh@gmail.com",
  "profilePicture": "https://image-url.com/profile.png"
}
```

### Purpose

Supports partial updates of user information.

---

## Change Password

### Route

```http
PUT /api/auth/change-password
```

### Authentication

Required

### Request Body

```json
{
  "currentPassword": "oldPassword",
  "newPassword": "newPassword"
}
```

### Processing Flow

```text
Verify User
     │
     ▼
Validate Current Password
     │
     ▼
Update Password
     │
     ▼
Save User
```

---

## Security Considerations

### Password Hashing

```javascript
bcrypt.hash(password, 10)
```

Passwords are never stored in plain text.

---

### Hidden Password Field

```javascript
select: false
```

Prevents accidental exposure.

---

### HttpOnly Cookies

JWT tokens cannot be accessed through:

```javascript
document.cookie
```

Reducing XSS attack exposure.

---

### JWT Expiration

Tokens expire automatically after:

```text
7 Days
```

---

### Ownership Validation

All protected resources are scoped using:

```javascript
{
  userId: req.user.id
}
```

Preventing cross-user access.

---

### Minimal JWT Payload

Only the user identifier is stored in the token.

```javascript
{
  id
}
```

This minimizes payload size and exposure.

---


# 2. Document Processing Module

## Purpose

Handles **PDF ingestion → transformation → AI-ready structuring**

Supports:

* Keyword-Based Retrieval-Augmented Generation (RAG)
* Keyword-Based Retrieval / Context Retrieval
* Flashcards & quiz generation

---

## High-Level Pipeline

```
Upload → Validate → Store → Extract → Chunk → Persist → Ready
```

---

## Document Model

```javascript
{
  userId: ObjectId,
  title: String,
  filePath: String,
  fileSize: Number,
  extractedText: String,
  cloudinaryPublicId: String,
  chunks: [
    {
      content: String,
      pageNumber: Number,
      chunkIndex: Number
    }
  ],
  status: "processing" | "ready" | "failed",
  uploadedDate: Date,
  lastAccessed: Date
}
```

---

## Upload Flow

### Endpoint

```
POST /api/document/upload
```

### Steps

1. Validate PDF (type + size)
2. Store temporarily (disk)
3. Upload to Cloudinary (persistent storage)
4. Create DB record (`status: processing`)
5. Trigger async processing
6. Cleanup local file

---

## PDF Processing Pipeline

### 1. Text Extraction

```javascript
pdf-parse
```

Returns:

* Raw text
* Metadata
* Page count

---

### 2. Chunking Strategy

```javascript
chunkText(text, 500, 50)
```

* Chunk size: 500 words
* Overlap: 50 words

**Why overlap?**
Preserves semantic continuity → improves retrieval quality in RAG systems

---

### 3. Storage

* Chunks stored inside document
* Enables:

  * Vector indexing (future)
  * Context-aware querying

---

### 4. Status Lifecycle

| Status     | Meaning                   |
| ---------- | ------------------------- |
| processing | Upload completed          |
| ready      | Fully processed           |
| failed     | Processing error occurred |

---

## Document APIs

### Get All Documents

```
GET /api/document
```

* Aggregation pipeline:

  * `$match` (user scope)
  * `$lookup` (flashcards, quizzes)
  * `$addFields` (counts)
  * `$sort`

---

### Get Single Document

```
GET /api/document/:id
```

* Updates `lastAccessed`
* Returns computed metadata

---

### Delete Document

```
DELETE /api/document/:id
```

**Flow**

```
Validate → Verify Ownership → Delete Cloudinary → Delete DB Record
```

---

## File Handling

### Multer Configuration

* Storage: disk
* Max size: 10MB
* MIME: `application/pdf`

### Naming Strategy

```
<timestamp>-<random>-document.pdf
```

---

## Cloud Storage

```javascript
cloudinary.uploader.upload(filePath, {
  folder: "documents",
  resource_type: "raw"
})
```

**Why Cloudinary?**

* Offloads storage from backend
* Scales independently
* Provides reliable file access

---

# 3. System Design Highlights

## Asynchronous Processing

* Upload is non-blocking
* Improves API responsiveness
* Enables background scaling

---

## Chunk-Based Architecture

* Core for AI features
* Enables:

  * Semantic retrieval
  * Embedding pipelines
  * Context-aware generation

---

## Ownership Enforcement

```javascript
{ _id: id, userId: req.user.id }
```

Prevents cross-user data access.

---

## Aggregation-Driven Insights

* Computes flashcard/quiz counts in DB layer
* Avoids multiple queries
* Improves performance

---


# 4. Flashcard Management Module

## Purpose

The Flashcard Module provides a structured learning system built on top of processed documents.

After a document has been uploaded and transformed into AI-ready chunks, flashcards can be generated and stored for active recall learning.

The module supports:

* Flashcard retrieval
* Flashcard set management
* Review tracking
* Learning analytics
* Starred flashcards
* Flashcard deletion

---

# Architecture

```text
PDF Upload
     │
     ▼
Text Extraction
     │
     ▼
Chunk Generation
     │
     ▼
Flashcard Generation
     │
     ▼
Flashcard Storage
     │
     ▼
Review / Learning
```

---

# Flashcard Schema

## Collection

```javascript
flashcards
```

---

## Schema Structure

```javascript
{
  userId: ObjectId,

  documentId: ObjectId,

  cards: [
    {
      question: String,

      answer: String,

      difficulty: String,

      lastReviewed: Date,

      reviewCount: Number
    }
  ]
}
```

---

## Field Definitions

### userId

References the owner of the flashcard set.

```javascript
{
  type: ObjectId,
  ref: "User"
}
```

---

### documentId

Links flashcards to a specific uploaded document.

```javascript
{
  type: ObjectId,
  ref: "Document"
}
```

---

### cards

Stores individual flashcards.

Each card contains:

```javascript
{
  question,
  answer,
  difficulty,
  lastReviewed,
  reviewCount
}
```

---

### question

Question displayed to the learner.

Example:

```text
What is a Closure in JavaScript?
```

---

### answer

Expected answer.

Example:

```text
A closure is a function that retains access
to variables from its lexical scope.
```

---

### difficulty

Difficulty level assigned to the card.

Allowed values:

```text
easy
medium
hard
```

Default:

```text
medium
```

---

### lastReviewed

Tracks when a card was last studied.

Example:

```javascript
2026-07-12T14:30:00.000Z
```

---

### reviewCount

Tracks total review attempts.

Example:

```javascript
15
```

---

# Database Indexing

```javascript
flashCardSchema.index({
  userId: 1,
  documentId: 1
});
```

Purpose:

* Faster document flashcard lookups
* Faster user-based filtering
* Reduced query execution time

---

# Route Structure

```text
/api/flashcards

GET     /
GET     /:id
POST    /:cardId/review
PUT     /:cardId/star
DELETE  /:id
```

All routes require authentication.

---

# Get All Flashcard Sets

## Route

```http
GET /api/flashcards
```

---

## Authentication

Required

```http
Authentication: Required (JWT HttpOnly Cookie)
```

---

## Purpose

Returns all flashcard sets belonging to the authenticated user.

---

## Additional Data

Document information is populated.

```javascript
.populate(
  "documentId",
  "title"
)
```

---

## Success Response

```json
{
  "success": true,
  "message": "flashCardSets fetched successfully",
  "data": [
    {
      "_id": "687abc123",
      "documentId": {
        "_id": "687doc123",
        "title": "JavaScript Notes"
      },
      "cards": []
    }
  ]
}
```

---

# Get Flashcards By Document

## Route

```http
GET /api/flashcards/:id
```

---

## Parameters

| Parameter | Type              |
| --------- | ----------------- |
| id        | Document ObjectId |

---

## Purpose

Returns all flashcards associated with a specific document.

---

## Additional Data

Document metadata is populated.

```javascript
.populate(
  "documentId",
  "title fileName"
)
```

---

## Success Response

```json
{
  "success": true,
  "message": "flashCards fetched successfully",
  "data": {
    "_id": "687abc123",
    "documentId": {
      "_id": "687doc123",
      "title": "JavaScript Notes",
      "fileName": "javascript.pdf"
    },
    "cards": [
      {
        "question": "What is a closure?",
        "answer": "A function with access to its lexical scope.",
        "difficulty": "medium",
        "reviewCount": 3
      }
    ]
  }
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Please provide Id"
}
```

---

# Review Flashcard

## Route

```http
POST /api/flashcards/:cardId/review
```

---

## Purpose

Marks a flashcard as reviewed.

---

## Internal Operations

Updates:

```javascript
lastReviewed
```

and

```javascript
reviewCount
```

---

## Processing Flow

```text
Find Flashcard
      │
      ▼
Find Card
      │
      ▼
Update Review Date
      │
      ▼
Increment Review Count
      │
      ▼
Save Changes
```

---

## Example Update

Before:

```json
{
  "reviewCount": 5
}
```

After:

```json
{
  "reviewCount": 6
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "FlashCard reviewed successfully"
}
```

---

# Star / Unstar Flashcard

## Route

```http
PUT /api/flashcards/:cardId/star
```

---

## Purpose

Allows users to bookmark important flashcards.

---

## Behavior

If card is not starred:

```text
false → true
```

If card is starred:

```text
true → false
```

---

## Processing Flow

```text
Locate Card
     │
     ▼
Toggle Star State
     │
     ▼
Persist Changes
```

---

## Success Response

```json
{
  "success": true,
  "message": "FlashCard started"
}
```

or

```json
{
  "success": true,
  "message": "FlashCard unstarted"
}
```

---

# Delete Flashcard Set

## Route

```http
DELETE /api/flashcards/:id
```

---

## Purpose

Deletes an entire flashcard collection associated with a document.

---

## Processing Flow

```text
Validate Ownership
        │
        ▼
Locate Flashcard Set
        │
        ▼
Delete Record
        │
        ▼
Return Success
```

---

## Success Response

```json
{
  "success": true,
  "message": "FlashCard set deleted successfully"
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "FlashCard Set not found"
}
```

---

# Learning Analytics

The module tracks user learning activity through:

## Review Count

```javascript
reviewCount
```

Used to determine:

* Study frequency
* Learning progress
* Most reviewed topics

---

## Last Reviewed

```javascript
lastReviewed
```

Used to determine:

* Recently studied cards
* Review schedules
* Future spaced repetition support

---

# Design Decisions

## Document-Centric Organization

Flashcards are grouped by document.

Benefits:

* Easier management
* Better organization
* Supports document-level analytics

---

## Embedded Card Storage

Cards are stored inside a Flashcard document.

Benefits:

* Faster retrieval
* Fewer joins
* Simpler updates

---

## Review Tracking

Review history is stored per card.

Benefits:

* Progress measurement
* Learning analytics
* Future spaced repetition implementation

---

# 5. AI Learning & RAG Module

## Purpose

The AI Module transforms uploaded documents into interactive learning experiences using Google's Gemini models.

It provides:

* AI-generated Flashcards
* AI-generated Quizzes
* AI-generated Summaries
* Context-aware Document Chat
* Concept Explanations
* Chat History Tracking
* Lightweight Retrieval-Augmented Generation (RAG)

---

# Architecture

```text
User Uploads PDF
        │
        ▼
Text Extraction
        │
        ▼
Chunk Generation
        │
        ▼
Document Storage
        │
        ▼
AI Services
        │
 ┌──────┼─────────────┬─────────────┬─────────────┐
 ▼      ▼             ▼             ▼             ▼
Flashcards  Quiz   Summary   Document Chat   Explain Concept
```

---

# AI Provider

## Gemini Integration

The system uses Google Gemini through the official SDK.

```javascript
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
```

---

## Used Model

```javascript
gemini-2.5-flash
```

# Route Structure

```text
/api/ai

POST /generate-flashcards
POST /generate-quiz
POST /generate-summary
POST /chat
POST /explain-concept
GET  /chat-history/:documentId
```

All routes require authentication.

---

# Retrieval-Augmented Generation (RAG)

## Purpose

Instead of sending an entire document to the LLM, the system retrieves the most relevant document chunks before generation.

This improves:

* Accuracy
* Context awareness
* Token efficiency
* Response quality

---

## Retrieval Pipeline

```text
User Question
      │
      ▼
Keyword Extraction
      │
      ▼
Chunk Scoring
      │
      ▼
Top Relevant Chunks
      │
      ▼
Gemini Prompt
      │
      ▼
AI Response
```

---

# Relevant Chunk Search

## Utility

```javascript
findRelevantChunks()
```

---

## Scoring Strategy

The retrieval system uses:

### Exact Match Scoring

```text
Higher Weight
```

Exact keyword matches receive the highest score.

---

### Partial Match Scoring

```text
Lower Weight
```

Partial keyword matches receive lower scores.

---

### Multi-Keyword Bonus

Chunks matching multiple query terms receive additional scoring.

---

### Length Normalization

Long chunks are normalized to avoid unfair scoring.

---

### Position Bonus

Earlier chunks receive a slight priority boost.

---

## Stop Word Removal

Common words are ignored.

Examples:

```text
the
is
at
which
on
a
an
and
or
but
```

This improves retrieval relevance.

---

# Document Chat

## Route

```http
POST /api/ai/chat
```

---

## Purpose

Allows users to ask questions about an uploaded document.

---

## Request Body

```json
{
  "documentId": "687abc123",
  "question": "What is a closure?"
}
```

---

## Processing Flow

```text
User Question
      │
      ▼
Retrieve Relevant Chunks
      │
      ▼
Build Context
      │
      ▼
Gemini Generation
      │
      ▼
Store Chat History
      │
      ▼
Return Response
```

---

## Prompt Structure

```text
Context
+
Question
+
Answer Instruction
```

Gemini is instructed to answer only from the provided context.

---

## Success Response

```json
{
  "success": true,
  "data": {
    "answer": "A closure is a function..."
  }
}
```

---

# Explain Concept

## Route

```http
POST /api/ai/explain-concept
```

---

## Purpose

Provides educational explanations for concepts found within a document.

---

## Request Body

```json
{
  "documentId": "687abc123",
  "concept": "Closures"
}
```

---

## Processing Flow

```text
Locate Document
       │
       ▼
Extract Context
       │
       ▼
Generate Explanation
       │
       ▼
Return Educational Response
```

---

## Prompt Features

The model is instructed to:

* Explain clearly
* Use simple language
* Include examples
* Stay grounded in document context

---

## Success Response

```json
{
  "success": true,
  "data": {
    "explanation": "Closures allow functions..."
  }
}
```

---

# AI Summary Generation

## Route

```http
POST /api/ai/generate-summary
```

---

## Purpose

Creates concise summaries from uploaded documents.

---

## Request Body

```json
{
  "documentId": "687abc123"
}
```

---

## Processing Flow

```text
Extract Text
      │
      ▼
Build Prompt
      │
      ▼
Gemini Summary
      │
      ▼
Return Summary
```

---

## Prompt Goals

The summary focuses on:

* Main ideas
* Key concepts
* Important takeaways
* Structured learning content

---

## Success Response

```json
{
  "success": true,
  "data": {
    "summary": "JavaScript closures are..."
  }
}
```

---

# AI Flashcard Generation

## Route

```http
POST /api/ai/generate-flashcards
```

---

## Purpose

Automatically creates study flashcards from document content.

---

## Request Body

```json
{
  "documentId": "687abc123",
  "count": 10
}
```

---

## Flashcard Format

Gemini is instructed to generate:

```text
Q: Question
A: Answer
D: Difficulty
```

---

## Generated Structure

```javascript
{
  question,
  answer,
  difficulty
}
```

---

## Difficulty Levels

```text
easy
medium
hard
```

---

## Processing Flow

```text
Extract Text
      │
      ▼
Generate Flashcards
      │
      ▼
Parse AI Output
      │
      ▼
Store Flashcards
```

---

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "question": "What is a closure?",
      "answer": "A closure is...",
      "difficulty": "medium"
    }
  ]
}
```

---

# AI Quiz Generation

## Route

```http
POST /api/ai/generate-quiz
```

---

## Purpose

Creates multiple-choice quizzes from uploaded documents.

---

## Request Body

```json
{
  "documentId": "687abc123",
  "numQuestions": 5
}
```

---

## Quiz Format

Gemini generates:

```text
Q: Question
O1: Option 1
O2: Option 2
O3: Option 3
O4: Option 4
C: Correct Answer
E: Explanation
D: Difficulty
```

---

## Generated Structure

```javascript
{
  question,
  options,
  correctAnswer,
  explanation,
  difficulty
}
```

---

## Processing Flow

```text
Extract Text
      │
      ▼
Generate Questions
      │
      ▼
Parse Response
      │
      ▼
Store Quiz
```

---

## Success Response

```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "What is a closure?",
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "correctAnswer": "A",
        "difficulty": "medium"
      }
    ]
  }
}
```

---

# Chat History Management

## Purpose

Maintains conversational context between users and documents.

---

# Chat History Schema

```javascript
{
  userId: ObjectId,

  documentId: ObjectId,

  messages: [
    {
      role,
      content,
      timestamp,
      relevantChunks
    }
  ]
}
```

---

## Message Structure

```javascript
{
  role: "user" | "assistant",

  content: String,

  timestamp: Date,

  relevantChunks: [Number]
}
```

---

## Database Index

```javascript
chatHistorySchema.index({
  userId: 1,
  documentId: 1
});
```

Purpose:

* Faster chat retrieval
* Efficient document conversations
* User isolation

---

## Get Chat History

### Route

```http
GET /api/ai/chat-history/:documentId
```

---

## Purpose

Returns previous conversations for a specific document.

---

## Success Response

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "role": "user",
        "content": "What is a closure?"
      },
      {
        "role": "assistant",
        "content": "A closure is..."
      }
    ]
  }
}
```

---

# Quiz Schema

## Collection

```javascript
quizzes
```

---

## Schema Structure

```javascript
{
  userId: ObjectId,

  documentId: ObjectId,

  title: String,

  questions: [],

  userAnswers: [],

  score: Number,

  totalQuestions: Number,

  completedAt: Date
}
```

---

## Stored Analytics

### User Answers

Tracks:

* Selected answer
* Correctness
* Timestamp

---

### Score

Tracks:

```javascript
score
```

for completed quizzes.

---

### Completion Date

Tracks:

```javascript
completedAt
```

for learning progress analytics.

---

# AI Design Decisions

## Prompt Engineering

Structured prompt formats are used to ensure predictable AI responses.

Benefits:

* Easier parsing
* Consistent output
* Reduced hallucinations

---

## Context Limiting

Document content is truncated before sending to Gemini.

Examples:

```javascript
text.substring(0, 15000)
text.substring(0, 20000)
text.substring(0, 10000)
```

Benefits:

* Lower token usage
* Faster responses
* Predictable costs

---

## Retrieval Before Generation

The system retrieves relevant chunks before generation.

Benefits:

* Better answer quality
* Reduced hallucinations
* Improved contextual accuracy

---

## Chat History Persistence

Conversations are stored in MongoDB.

Benefits:

* Persistent conversations
* Future memory support
* Personalized learning experiences

---


