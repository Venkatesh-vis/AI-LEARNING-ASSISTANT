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
