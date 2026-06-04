# Authentication Controllers Documentation

This document describes the authentication controllers, middleware, and user model.

---

# User Schema

## Collection

```javascript
users
```

## Mongoose Schema

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

## Generated Fields

```javascript
createdAt
updatedAt
```

Because:

```javascript
{
  timestamps: true
}
```

---

# JWT Structure

Generated using:

```javascript
jwt.sign(
  { id },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRE || "7d"
  }
)
```

## JWT Payload

```json
{
  "id": "685cbf5f3a9f22c5f47e93c1",
  "iat": 1710000000,
  "exp": 1710604800
}
```

---

# Authentication Middleware

## Purpose

Verifies JWT tokens and protects private routes.

---

## Required Header

```http
Authorization: Bearer <token>
```

---

## Success Flow

```text
Request
 ↓
Read Authorization Header
 ↓
Extract JWT
 ↓
Verify JWT
 ↓
Attach User To req.user
 ↓
next()
```

---

## req.user Structure

After successful verification:

```javascript
req.user = {
  id: "685cbf5f3a9f22c5f47e93c1",
  iat: 1710000000,
  exp: 1710604800
}
```

---

## Error Response

### Missing Token

Status:

```http
401 Unauthorized
```

Response:

```json
{
  "message": "Unauthorized"
}
```

---

### Invalid Token

Status:

```http
401 Unauthorized
```

Response:

```json
{
  "message": "Invalid or expired token"
}
```

---

# register()

Creates a new user account.

---

## Route

```http
POST auth/register
```

---

## Authentication

Not Required

---

## Request Headers

```http
Content-Type: application/json
```

---

## Request Body

### Schema

```typescript
{
  username: string;
  email: string;
  password: string;
}
```

### Example

```json
{
  "username": "venkatesh",
  "email": "venkatesh@gmail.com",
  "password": "123456"
}
```

---

## Validation Rules

| Field    | Required |
| -------- | -------- |
| username | Yes      |
| email    | Yes      |
| password | Yes      |

---

## Possible Validations

Current controller validates:

```javascript
if(!username || !email || !password)
```

Returns:

```http
400 Bad Request
```

```json
{
  "message": "All fields are required"
}
```

---

## Database Operations

### Check Existing User

```javascript
User.findOne({ email })
```

---

### Hash Password

```javascript
bcrypt.hash(password, 10)
```

Example:

```text
123456

↓

$2b$10$7zG...
```

---

### Create User

```javascript
User.create({
 username,
 email,
 password: hashedPassword
})
```

---

### Generate JWT

```javascript
generateToken(user._id)
```

---

## Success Response

Status:

```http
201 Created
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "685cbf5f3a9f22c5f47e93c1",
      "username": "venkatesh",
      "email": "venkatesh@gmail.com",
      "profilePicture": "",
      "createdAt": "2026-06-03T10:00:00.000Z"
    },
    "token": "jwt_token"
  },
  "message": "User Registered Successfuly"
}
```

---

## Error Responses

### Email Already Exists

Status:

```http
400 Bad Request
```

Response:

```json
{
  "success": false,
  "message": "Email already in use"
}
```

---

### Missing Fields

Status:

```http
400 Bad Request
```

Response:

```json
{
  "message": "All fields are required"
}
```

---

# login()

Authenticates an existing user.

---

## Route

```http
POST auth/login
```

---

## Authentication

Not Required

---

## Request Headers

```http
Content-Type: application/json
```

---

## Request Body

### Schema

```typescript
{
  email: string;
  password: string;
}
```

### Example

```json
{
  "email": "venkatesh@gmail.com",
  "password": "123456"
}
```

---

## Database Operations

### Fetch User

```javascript
User.findOne({ email })
.select("+password")
```

Reason:

```javascript
password: {
 select:false
}
```

Password must be explicitly selected.

---

### Compare Password

```javascript
bcrypt.compare(
 password,
 user.password
)
```

---

### Generate Token

```javascript
generateToken(user._id)
```

---

## Success Response

Status:

```http
200 OK
```

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "685cbf5f3a9f22c5f47e93c1",
      "username": "venkatesh",
      "email": "venkatesh@gmail.com",
      "profilePicture": ""
    },
    "token": "jwt_token"
  },
  "message": "Login Successful"
}
```

---

## Error Responses

### Missing Fields

```http
400 Bad Request
```

```json
{
  "message": "All fields are required"
}
```

---

### User Not Found

```http
401 Unauthorized
```

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Incorrect Password

```http
401 Unauthorized
```

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

# getProfile()

Returns currently authenticated user.

---

## Route

```http
GET auth/profile
```

---

## Authentication

Required

```http
Authorization: Bearer <token>
```

---

## Request Body

None

---

## Database Operation

```javascript
User.findById(req.user.id)
```

---

## Success Response

```http
200 OK
```

```json
{
  "success": true,
  "data": {
    "id": "685cbf5f3a9f22c5f47e93c1",
    "username": "venkatesh",
    "email": "venkatesh@gmail.com",
    "profilePicture": "",
    "createdAt": "2026-06-03T10:00:00.000Z",
    "updatedAt": "2026-06-03T10:00:00.000Z"
  }
}
```

---

# updateProfile()

Updates user information.

---

## Route

```http
PUT auth/profile
```

---

## Authentication

Required

```http
Authorization: Bearer <token>
```

---

## Request Body

### Schema

```typescript
{
  username?: string;
  email?: string;
  profilePicture?: string;
}
```

All fields optional.

---

## Example Request

```json
{
  "username": "venkat",
  "profilePicture": "https://cdn.com/avatar.png"
}
```

---

## Database Operation

```javascript
const user =
 await User.findById(req.user.id);
```

Update only provided fields.

```javascript
if(username)
if(email)
if(profilePicture)
```

Save:

```javascript
await user.save();
```

---

## Success Response

```http
200 OK
```

```json
{
  "success": true,
  "data": {
    "id": "685cbf5f3a9f22c5f47e93c1",
    "username": "venkat",
    "email": "venkatesh@gmail.com",
    "profilePicture": "https://cdn.com/avatar.png"
  },
  "message": "Profile updated successfully"
}
```

---

# changePassword()

Changes authenticated user's password.

---

## Route

```http
PUT auth/change-password
```

---

## Authentication

Required

```http
Authorization: Bearer <token>
```

---

## Request Body

### Schema

```typescript
{
  currentPassword: string;
  newPassword: string;
}
```

---

## Example Request

```json
{
  "currentPassword": "123456",
  "newPassword": "abcdef"
}
```

---

## Validation

Both fields required.

```javascript
if(!currentPassword || !newPassword)
```

---

## Database Operations

### Fetch User

```javascript
User.findById(req.user.id)
.select("+password")
```

---

### Verify Current Password

```javascript
bcrypt.compare(
 currentPassword,
 user.password
)
```

---

### Update Password

```javascript
user.password = newPassword;
```

---

### Save User

```javascript
await user.save();
```

---

## Success Response

```http
200 OK
```

```json
{
  "success": true,
  "message": "Password changes successfully"
}
```

---

## Error Responses

### Missing Fields

```http
400 Bad Request
```

```json
{
  "success": false,
  "message": "Please provide current and new password"
}
```

---

### Incorrect Current Password

```http
401 Unauthorized
```

```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

---

# HTTP Status Codes Used

| Status | Meaning          |
| ------ | ---------------- |
| 200    | Success          |
| 201    | Resource Created |
| 400    | Invalid Request  |
| 401    | Unauthorized     |

---

# Security Notes

## Password Hashing

```javascript
bcrypt.hash(password, 10)
```

Passwords are stored as hashes.

---

## Password Hidden By Default

```javascript
select:false
```

Prevents accidental exposure.

---

## JWT Authentication

```javascript
jwt.sign()
jwt.verify()
```

Provides stateless authentication.

---

## Protected Routes

All profile-related operations require a valid JWT token.

---

# Document Management & PDF Processing Module

## Overview

This module handles PDF document uploads, storage, processing, and retrieval.

The uploaded PDF is:

1. Validated using Multer
2. Stored temporarily on the server
3. Uploaded to Cloudinary
4. Saved as a Document record in MongoDB
5. Parsed for text extraction
6. Split into chunks for AI/RAG processing
7. Marked as ready for downstream features such as:

   * Flashcards
   * Quiz Generation
   * Semantic Search
   * AI Interview Preparation

---

# Architecture

```text
Client
  │
  ▼
Upload PDF
  │
  ▼
Multer Validation
  │
  ▼
Temporary Local Storage
  │
  ▼
Cloudinary Upload
  │
  ▼
MongoDB Document Record
  │
  ▼
PDF Text Extraction
  │
  ▼
Chunk Generation
  │
  ▼
Store Chunks
  │
  ▼
Document Ready
```

---

# Route Structure

```text
/api/document

POST    /upload
GET     /
GET     /:id
DELETE  /:id
```

All routes require JWT authentication.

---

# Document Schema

## Collection

```javascript
documents
```

## Schema Structure

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
  uploadedDate: Date,
  lastAccessed: Date,
  status: String
}
```

---

## Status Values

| Value      | Description                         |
| ---------- | ----------------------------------- |
| processing | PDF uploaded and processing started |
| ready      | PDF processed successfully          |
| failed     | PDF processing failed               |

---

# Upload Pipeline

## Route

```http
POST /api/document/upload
```

## Authentication

Required

```http
Authorization: Bearer <token>
```

---

## Request Type

```http
multipart/form-data
```

---

## Request Body

| Field | Type   | Required |
| ----- | ------ | -------- |
| title | String | Yes      |
| file  | PDF    | Yes      |

---

## Example Request

```text
title = JavaScript Interview Notes

file = javascript.pdf
```

---

## Validation

### Missing File

Status

```http
400 Bad Request
```

Response

```json
{
  "success": false,
  "message": "Please upload pdf file"
}
```

---

### Missing Title

Status

```http
400 Bad Request
```

Response

```json
{
  "success": false,
  "message": "Please provide document title"
}
```

---

## Upload Processing Flow

### Step 1

Validate uploaded file.

Only PDF files are accepted.

### Step 2

Store file temporarily.

```text
/uploads/documents
```

### Step 3

Upload file to Cloudinary.

```javascript
uploadToCloudinary(
    localPath,
    "documents"
)
```

### Step 4

Create MongoDB document.

Initial status:

```json
{
  "status": "processing"
}
```

### Step 5

Start background PDF processing.

```javascript
processPdf(
    document._id,
    localPath
)
```

### Step 6

Remove temporary local file.

---

## Success Response

Status

```http
201 Created
```

Response

```json
{
  "success": true,
  "data": {
    "_id": "685f123456",
    "title": "JavaScript Notes",
    "filePath": "https://res.cloudinary.com/...",
    "fileSize": 245760,
    "status": "processing"
  },
  "message": "Document uploaded successfully"
}
```

---

# PDF Processing Pipeline

## processPdf()

Responsible for transforming PDF content into AI-ready text chunks.

---

## Processing Flow

```text
PDF
 │
 ▼
Extract Text
 │
 ▼
Generate Chunks
 │
 ▼
Store Chunks
 │
 ▼
Update Status
```

---

## Text Extraction

Uses:

```javascript
pdf-parse
```

Implementation:

```javascript
extractTextFromPdf(filePath)
```

Returns:

```javascript
{
  text,
  numPages,
  info
}
```

---

## Chunk Generation

Uses:

```javascript
chunkText(
    text,
    500,
    50
)
```

### Configuration

| Setting    | Value |
| ---------- | ----- |
| Chunk Size | 500   |
| Overlap    | 50    |

---

### Example

```text
Chunk 1
Words 1 - 500

Chunk 2
Words 451 - 950

Chunk 3
Words 901 - 1400
```

Overlap preserves context between chunks and improves downstream AI retrieval accuracy.

---

## Success Update

Document status becomes:

```json
{
  "status": "ready"
}
```

---

## Failure Update

Document status becomes:

```json
{
  "status": "failed"
}
```

---

# Multer Configuration

## Storage Strategy

Uses disk storage.

```javascript
multer.diskStorage()
```

Temporary upload location:

```text
/uploads/documents
```

---

## File Naming

Files receive unique names.

Example:

```text
1717770000-123456789-document.pdf
```

---

## Allowed File Types

```text
application/pdf
```

---

## Maximum File Size

```javascript
10 * 1024 * 1024
```

Maximum:

```text
10 MB
```

---

## Invalid File Type

Response

```json
{
  "message": "Only PDF files are allowed"
}
```

---

# Cloudinary Integration

## Purpose

Stores uploaded PDFs outside the application server.

Benefits:

* Persistent storage
* Scalability
* Reduced server disk usage

---

## Upload Method

```javascript
cloudinary.uploader.upload(
    filePath,
    {
        folder: "documents",
        resource_type: "raw"
    }
)
```

---

## Stored Value

```javascript
filePath
```

Example:

```text
https://res.cloudinary.com/project/raw/upload/document.pdf
```

---

# Get All Documents

## Route

```http
GET /api/document
```

---

## Authentication

Required

```http
Authorization: Bearer <token>
```

---

## Purpose

Returns all documents belonging to the authenticated user.

---

## Aggregation Pipeline

Uses:

```javascript
$match
$lookup
$lookup
$addFields
$project
$sort
```

---

## Additional Computed Fields

### flashcardCount

Number of flashcard sets linked to document.

### quizCount

Number of quizzes linked to document.

---

## Success Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "685f123",
      "title": "JavaScript Notes",
      "status": "ready",
      "flashcardCount": 12,
      "quizCount": 4
    }
  ],
  "message": "Documents fetched successfully"
}
```

---

# Get Document

## Route

```http
GET /api/document/:id
```

---

## Purpose

Returns a single document.

---

## Parameters

| Parameter | Type             |
| --------- | ---------------- |
| id        | MongoDB ObjectId |

---

## Additional Operations

Updates:

```javascript
lastAccessed
```

every time the document is viewed.

---

## Additional Fields Returned

```javascript
flashcardCount
quizCount
```

---

## Success Response

```json
{
  "success": true,
  "data": {
    "_id": "685f123",
    "title": "JavaScript Notes",
    "status": "ready",
    "flashcardCount": 12,
    "quizCount": 4
  }
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Document not found"
}
```

---

# Delete Document

## Route

```http
DELETE /api/document/:id
```

---

## Purpose

Deletes a document owned by the authenticated user.

---

## Deletion Flow


```text

Validate Document
        │
        ▼
Verify Ownership
        │
        ▼
Delete Cloudinary Asset
        │
        ▼
Delete MongoDB Document
        │
        ▼
Return Success
```

---

## Success Response

```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Document not found"
}
```

---

# Security Measures

## Authentication

All document routes are protected using JWT middleware.

---

## Ownership Validation

Documents are always queried using:

```javascript
{
  _id: id,
  userId: req.user.id
}
```

This prevents users from accessing another user's documents.

---

## File Validation

Only PDF files are accepted.

---

## Upload Limits

Maximum file size:

```text
10 MB
```

---

## Temporary File Cleanup

Temporary files are automatically deleted after upload and processing.

---

# Design Decisions

### Cloudinary Storage

Prevents long-term storage on the application server.

### Background Processing

PDF parsing runs asynchronously after upload.

Improves upload response time.

### Chunk-Based Storage

Documents are stored as chunks to support:

* RAG pipelines
* Semantic search
* Flashcard generation
* Quiz generation
* AI interview preparation

### Aggregation Pipeline

Computes flashcard and quiz statistics efficiently in a single query.

---

# Future Improvements

* Vector embeddings
* Semantic search
* Virus scanning
* Multi-file uploads

---
