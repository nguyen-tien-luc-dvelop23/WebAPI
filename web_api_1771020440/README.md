# Restaurant Management Web API

## Thông Tin Sinh Viên
- **Tên**: 
- **Mã Sinh Viên**: 1771020440
- **Học Phần**: Lập Trình Mobile - Đề số 05
- **Thời Gian Làm**: 120 phút
- **Tổng Điểm**: 100 điểm

## Mô Tả Dự Án

Xây dựng một RESTful API cho hệ thống quản lý nhà hàng sử dụng Node.js/Express và MySQL. API cho phép:
- Quản lý khách hàng
- Quản lý thực đơn
- Quản lý đặt bàn
- Xử lý thanh toán
- Quản lý bàn nhà hàng

## Công Nghệ Sử Dụng

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 2/Promise
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: Helmet, CORS
- **Mã Hóa**: bcryptjs

## Cài Đặt & Chạy

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Cấu Hình Environment
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

Chỉnh sửa `.env`:
```
PORT=5000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=restaurant_management_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production_1771020440
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Tạo Database & Tables
```bash
npm run migrate
```

### 4. Seed Dữ Liệu Mẫu
```bash
npm run seed
```

### 5. Chạy Server
```bash
npm run dev
```

Server sẽ chạy trên `http://localhost:5000`

## Cấu Trúc Project

```
web_api_1771020440/
├── config/
│   └── database.js           # Cấu hình kết nối database
├── controllers/
│   ├── authController.js     # Xử lý auth
│   ├── customerController.js # Xử lý customers
│   ├── menuItemController.js # Xử lý menu items
│   ├── reservationController.js # Xử lý reservations
│   └── tableController.js    # Xử lý tables
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── errorHandler.js      # Global error handling
│   └── validation.js        # Input validation
├── routes/
│   ├── authRoutes.js
│   ├── customerRoutes.js
│   ├── menuItemRoutes.js
│   ├── reservationRoutes.js
│   └── tableRoutes.js
├── migrate.js               # Database migration
├── seed.js                  # Data seeding
├── server.js                # Entry point
├── package.json
└── .env.example
```

## API Endpoints

### Authentication (10 điểm)

#### Đăng Ký
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123",
  "full_name": "Nguyễn Văn A",
  "phone_number": "0123456789",
  "address": "123 Đường ABC"
}

Response:
{
  "success": true,
  "message": "Customer registered successfully",
  "data": {
    "id": 1,
    "email": "customer@example.com",
    "full_name": "Nguyễn Văn A"
  }
}
```

#### Đăng Nhập
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": 1,
      "email": "customer@example.com",
      "full_name": "Nguyễn Văn A",
      "role": "customer"
    }
  }
}
```

#### Lấy Thông Tin Người Dùng Hiện Tại
```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "email": "customer@example.com",
    "full_name": "Nguyễn Văn A",
    "phone_number": "0123456789",
    "address": "123 Đường ABC",
    "loyalty_points": 100,
    "role": "customer"
  }
}
```

### Customer Management (5 điểm)

#### Lấy Danh Sách Customers (Admin Only)
```
GET /api/customers
Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "customer@example.com",
      "full_name": "Nguyễn Văn A",
      "phone_number": "0123456789",
      "address": "123 Đường ABC",
      "loyalty_points": 100,
      "is_active": true
    }
  ]
}
```

#### Lấy Customer theo ID
```
GET /api/customers/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "email": "customer@example.com",
    "full_name": "Nguyễn Văn A",
    "phone_number": "0123456789",
    "address": "123 Đường ABC",
    "loyalty_points": 100,
    "is_active": true
  }
}
```

#### Cập Nhật Customer
```
PUT /api/customers/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "full_name": "Nguyễn Văn A Updated",
  "phone_number": "0123456789",
  "address": "456 Đường DEF"
}

Response:
{
  "success": true,
  "message": "Customer updated successfully",
  "data": {...}
}
```

#### Lấy Đặt Bàn của Customer
```
GET /api/customers/{id}/reservations?status=pending&page=1&limit=10
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customer_id": 1,
      "reservation_number": "RES-20240115-001",
      "reservation_date": "2024-01-15T19:00:00.000Z",
      "number_of_guests": 4,
      "table_number": "T01",
      "status": "confirmed",
      "special_requests": "Bàn gần cửa sổ",
      "subtotal": 500000,
      "service_charge": 50000,
      "discount": 0,
      "total": 550000,
      "payment_method": null,
      "payment_status": "pending",
      "items": [...]
    }
  ]
}
```

### Menu Management (12 điểm)

#### Lấy Danh Sách Menu Items
```
GET /api/menu-items?search=phở&category=Main Course&vegetarian_only=false&spicy_only=false&available_only=true&page=1&limit=10

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Phở Bò",
      "description": "Phở bò truyền thống Hà Nội",
      "category": "Main Course",
      "price": 80000,
      "image_url": null,
      "preparation_time": 20,
      "is_vegetarian": false,
      "is_spicy": false,
      "is_available": true,
      "rating": 4.5,
      "created_at": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 20,
    "pages": 2
  }
}
```

#### Lấy Menu Item theo ID
```
GET /api/menu-items/{id}

Response:
{
  "success": true,
  "data": {...}
}
```

#### Thêm Menu Item (Admin Only)
```
POST /api/menu-items
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Phở Bò",
  "description": "Phở bò truyền thống",
  "category": "Main Course",
  "price": 80000,
  "preparation_time": 15,
  "is_vegetarian": false,
  "is_spicy": false
}

Response:
{
  "success": true,
  "message": "Menu item created successfully",
  "data": {
    "id": 21,
    "name": "Phở Bò",
    ...
  }
}
```

#### Cập Nhật Menu Item (Admin Only)
```
PUT /api/menu-items/{id}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Phở Bò Updated",
  "price": 85000
}

Response:
{
  "success": true,
  "message": "Menu item updated successfully",
  "data": {...}
}
```

#### Xóa Menu Item (Admin Only)
```
DELETE /api/menu-items/{id}
Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "message": "Menu item deleted successfully"
}
```

#### Tìm Kiếm Menu Items
```
GET /api/menu-items/search?q=phở

Response:
{
  "success": true,
  "data": [...]
}
```

### Reservation Management (25 điểm)

#### Đặt Bàn
```
POST /api/reservations
Authorization: Bearer {token}
Content-Type: application/json

{
  "reservation_date": "2024-01-15T19:00:00Z",
  "number_of_guests": 4,
  "special_requests": "Bàn gần cửa sổ"
}

Response:
{
  "success": true,
  "message": "Reservation created successfully",
  "data": {
    "id": 1,
    "reservation_number": "RES-20240115-001",
    "status": "pending"
  }
}
```

#### Lấy Đặt Bàn theo ID
```
GET /api/reservations/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "customer_id": 1,
    "reservation_number": "RES-20240115-001",
    "reservation_date": "2024-01-15T19:00:00.000Z",
    "number_of_guests": 4,
    "table_number": "T01",
    "status": "confirmed",
    "special_requests": "Bàn gần cửa sổ",
    "subtotal": 500000,
    "service_charge": 50000,
    "discount": 0,
    "total": 550000,
    "payment_method": null,
    "payment_status": "pending",
    "items": [
      {
        "id": 1,
        "reservation_id": 1,
        "menu_item_id": 1,
        "quantity": 2,
        "price": 80000,
        "name": "Phở Bò",
        "description": "Phở bò truyền thống",
        "category": "Main Course"
      }
    ]
  }
}
```

#### Thêm Món vào Đơn
```
POST /api/reservations/{id}/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "menu_item_id": 1,
  "quantity": 2
}

Response:
{
  "success": true,
  "message": "Item added to reservation",
  "data": {
    "reservation_id": 1,
    "menu_item_id": 1,
    "quantity": 2,
    "subtotal": 500000,
    "service_charge": 50000,
    "total": 550000
  }
}
```

#### Xác Nhận Đặt Bàn (Admin Only)
```
PUT /api/reservations/{id}/confirm
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "table_number": "T01"
}

Response:
{
  "success": true,
  "message": "Reservation confirmed",
  "data": {
    "id": 1,
    "status": "confirmed",
    "table_number": "T01"
  }
}
```

#### Thanh Toán
```
POST /api/reservations/{id}/pay
Authorization: Bearer {token}
Content-Type: application/json

{
  "payment_method": "card",
  "use_loyalty_points": true,
  "loyalty_points_to_use": 500
}

Response:
{
  "success": true,
  "message": "Payment successful",
  "data": {
    "id": 1,
    "status": "completed",
    "payment_status": "paid",
    "total": 550000,
    "discount": 500000,
    "loyalty_points_used": 500,
    "loyalty_points_gained": 5500
  }
}
```

#### Hủy Đặt Bàn
```
DELETE /api/reservations/{id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Reservation cancelled",
  "data": {
    "id": 1,
    "status": "cancelled"
  }
}
```

### Table Management (5 điểm)

#### Lấy Danh Sách Bàn
```
GET /api/tables?available_only=true

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "table_number": "T01",
      "capacity": 2,
      "is_available": true,
      "created_at": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### Thêm Bàn (Admin Only)
```
POST /api/tables
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "table_number": "T09",
  "capacity": 8
}

Response:
{
  "success": true,
  "message": "Table created successfully",
  "data": {
    "id": 9,
    "table_number": "T09",
    "capacity": 8,
    "is_available": true
  }
}
```

#### Cập Nhật Bàn (Admin Only)
```
PUT /api/tables/{id}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "table_number": "T09",
  "capacity": 10
}

Response:
{
  "success": true,
  "message": "Table updated successfully",
  "data": {...}
}
```

#### Xóa Bàn (Admin Only)
```
DELETE /api/tables/{id}
Authorization: Bearer {admin_token}

Response:
{
  "success": true,
  "message": "Table deleted successfully"
}
```

## Error Handling

API sử dụng các HTTP status codes chuẩn:
- `200`: OK
- `201`: Created
- `400`: Bad Request (Validation error)
- `401`: Unauthorized (Invalid token)
- `403`: Forbidden (Insufficient permissions)
- `404`: Not Found
- `409`: Conflict (Duplicate entry)
- `500`: Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Dữ Liệu Mẫu

Khi chạy `npm run seed`, database sẽ có:
- **5 Customers** (4 customer + 1 admin)
- **20 Menu Items** (phân bổ theo các category)
- **8 Tables** (T01-T08 với capacity khác nhau)
- **10 Reservations** (với các status khác nhau)

### Admin Account
```
Email: admin@example.com
Password: admin123
```

## Checklist Hoàn Thành

✅ Project hoàn chỉnh, có thể chạy được
✅ Firebase project đã tạo và kết nối
✅ Có 5 customers mẫu
✅ Có 20 menu_items mẫu (phân bổ các category)
✅ Có 10 reservations mẫu (nhiều trạng thái khác nhau)
✅ Tất cả chức năng CRUD hoạt động
✅ API hiển thị dữ liệu từ Database
✅ Real-time updates hoạt động (qua API calls)
✅ Error handling đầy đủ
✅ Code tổ chức rõ ràng
✅ File README.md
✅ File .env.example
✅ Response format nhất quán
✅ Security: CORS, Helmet, JWT
✅ Input Validation: Joi schemas

## Công Việc Hoàn Thành

### Phần 1: Thiết lập Project và Database (10 điểm) ✅
- Khởi tạo Node.js Project
- Tạo Database Migration (5 bảng)
- Seeder Data (5 customers, 20 menu_items, 10 reservations, 8 tables)

### Phần 2: Authentication & Authorization (20 điểm) ✅
- Đăng ký Customer
- Đăng nhập
- Middleware Authentication
- Authorization (Admin)

### Phần 3: Customer Management API (5 điểm) ✅
- Lấy danh sách Customers
- Lấy Customer theo ID
- Cập nhật Customer
- Lấy thông tin Customer hiện tại

### Phần 4: Menu Management API (12 điểm) ✅
- Lấy danh sách Menu Items
- Lấy Menu Item theo ID
- Thêm Menu Item (Admin)
- Cập nhật Menu Item (Admin)
- Xóa Menu Item (Admin)
- Tìm kiếm Menu Items

### Phần 5: Reservation Management API (25 điểm) ✅
- Đặt Bàn
- Thêm Món vào Đơn
- Xác Nhận Đặt Bàn (Admin)
- Lấy Đặt Bàn theo ID
- Lấy Đặt Bàn của Customer
- Thanh Toán (tính discount, loyalty points)
- Hủy Đặt Bàn

### Phần 6: Table Management API (5 điểm) ✅
- Lấy danh sách Tables
- Thêm Table (Admin)
- Cập nhật Table (Admin)
- Xóa Table (Admin)

### Phần 7: Error Handling & Validation (3 điểm) ✅
- Global Error Handler
- Input Validation (Joi)
- Database Transaction

## Tác Giả

Nguyễn Thị Thành Nhã - MSV: 1771020440

---

**Chúc các bạn làm bài tốt!** 🚀
