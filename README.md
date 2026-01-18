Restaurant Management Web API
Thông Tin Sinh Viên
Tên: Nguyễn Tiến Lực
Mã Sinh Viên: 1771020440
Học Phần: Lập Trình Mobile - Đề số 05
Thời Gian Làm: 120 phút
Tổng Điểm: 100 điểm

Mô Tả Dự Án
Xây dựng một RESTful API cho hệ thống quản lý nhà hàng sử dụng Node.js/Express và MySQL. API cung cấp các chức năng toàn diện cho việc quản lý nhà hàng bao gồm quản lý khách hàng, thực đơn, đặt bàn, xử lý thanh toán và quản lý bàn.

Tính Năng Chính
Quản lý Khách hàng: Đăng ký, đăng nhập, cập nhật thông tin, hệ thống điểm thưởng

Quản lý Thực đơn: CRUD món ăn, phân loại, tìm kiếm và lọc

Quản lý Đặt bàn: Đặt bàn trực tuyến, xác nhận, thêm món vào đơn, thanh toán

Xử lý Thanh toán: Thanh toán trực tuyến, áp dụng điểm thưởng, tính phí dịch vụ

Quản lý Bàn: Theo dõi trạng thái bàn, sắp xếp chỗ ngồi

Công Nghệ Sử Dụng
Runtime: Node.js

Framework: Express.js

Database: MySQL 2/Promise

Authentication: JSON Web Tokens (JWT)

Validation: Joi

Security: Helmet, CORS

Mã Hóa: bcryptjs

Environment Variables: dotenv

Yêu Cầu Hệ Thống
Node.js (v14 trở lên)

MySQL (v5.7 trở lên)

npm hoặc yarn

Cài Đặt & Chạy
1. Cài đặt Dependencies
bash
npm install
2. Cấu Hình Environment
Tạo file .env từ .env.example:

bash
cp .env.example .env
Chỉnh sửa file .env với các thông tin của bạn:

env
PORT=5000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=restaurant_management_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production_1771020440
JWT_EXPIRE=7d
NODE_ENV=development
3. Tạo Database & Tables
bash
npm run migrate
Lệnh này sẽ tạo:

Database restaurant_management_db

5 bảng: customers, menu_items, reservations, reservation_items, tables

Các ràng buộc và quan hệ giữa các bảng

4. Seed Dữ Liệu Mẫu
bash
npm run seed
Lệnh này sẽ thêm dữ liệu mẫu:

5 khách hàng (4 customer + 1 admin)

20 món ăn trong thực đơn

8 bàn với sức chứa khác nhau

10 đặt bàn với các trạng thái khác nhau

5. Chạy Server
Development mode:

bash
npm run dev
Production mode:

bash
npm start
Server sẽ chạy trên: http://localhost:5000

Cấu Trúc Project
text
web_api_1771020440/
├── config/
│   └── database.js           # Cấu hình kết nối database
├── controllers/
│   ├── authController.js     # Xử lý authentication
│   ├── customerController.js # Xử lý khách hàng
│   ├── menuItemController.js # Xử lý món ăn
│   ├── reservationController.js # Xử lý đặt bàn
│   └── tableController.js    # Xử lý bàn
├── middleware/
│   ├── auth.js              # Xác thực JWT
│   ├── errorHandler.js      # Xử lý lỗi toàn cục
│   └── validation.js        # Validation input
├── routes/
│   ├── authRoutes.js        # Routes authentication
│   ├── customerRoutes.js    # Routes khách hàng
│   ├── menuItemRoutes.js    # Routes món ăn
│   ├── reservationRoutes.js # Routes đặt bàn
│   └── tableRoutes.js       # Routes bàn
├── migrate.js               # Database migration
├── seed.js                  # Data seeding
├── server.js                # Điểm vào chính
├── package.json             # Dependencies & scripts
├── .env.example             # Environment variables mẫu
└── .env                     # Environment variables (tạo sau)
Database Schema
1. Bảng customers
sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    loyalty_points INT DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
2. Bảng menu_items
sql
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category ENUM('Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Special'),
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    preparation_time INT,
    is_vegetarian BOOLEAN DEFAULT false,
    is_spicy BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    rating DECIMAL(3,2) DEFAULT 4.5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
3. Bảng tables
sql
CREATE TABLE tables (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_number VARCHAR(20) UNIQUE NOT NULL,
    capacity INT NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
4. Bảng reservations
sql
CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    reservation_number VARCHAR(50) UNIQUE NOT NULL,
    reservation_date DATETIME NOT NULL,
    number_of_guests INT NOT NULL,
    table_number VARCHAR(20),
    status ENUM('pending', 'confirmed', 'seated', 'completed', 'cancelled') DEFAULT 'pending',
    special_requests TEXT,
    subtotal DECIMAL(10,2) DEFAULT 0,
    service_charge DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) DEFAULT 0,
    payment_method ENUM('cash', 'card', 'bank_transfer'),
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
5. Bảng reservation_items
sql
CREATE TABLE reservation_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
API Endpoints
Authentication (10 điểm)
Đăng Ký Khách Hàng
http
POST /api/auth/register
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123",
  "full_name": "Nguyễn Văn A",
  "phone_number": "0123456789",
  "address": "123 Đường ABC"
}
Đăng Nhập
http
POST /api/auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}
Lấy Thông Tin Người Dùng Hiện Tại
http
GET /api/auth/me
Authorization: Bearer {token}
Customer Management (5 điểm)
Lấy Danh Sách Customers (Admin Only)
http
GET /api/customers
Authorization: Bearer {admin_token}
Lấy Customer Theo ID
http
GET /api/customers/{id}
Authorization: Bearer {token}
Cập Nhật Thông Tin Customer
http
PUT /api/customers/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "full_name": "Nguyễn Văn A Updated",
  "phone_number": "0123456789",
  "address": "456 Đường DEF"
}
Lấy Lịch Sử Đặt Bàn Của Customer
http
GET /api/customers/{id}/reservations?status=pending&page=1&limit=10
Authorization: Bearer {token}
Menu Management (12 điểm)
Lấy Danh Sách Món Ăn
http
GET /api/menu-items?search=phở&category=Main Course&vegetarian_only=false&spicy_only=false&available_only=true&page=1&limit=10
Thêm Món Ăn (Admin Only)
http
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
Tìm Kiếm Món Ăn
http
GET /api/menu-items/search?q=phở
Reservation Management (25 điểm)
Đặt Bàn
http
POST /api/reservations
Authorization: Bearer {token}
Content-Type: application/json

{
  "reservation_date": "2024-01-15T19:00:00Z",
  "number_of_guests": 4,
  "special_requests": "Bàn gần cửa sổ"
}
Thêm Món Vào Đơn
http
POST /api/reservations/{id}/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "menu_item_id": 1,
  "quantity": 2
}
Xác Nhận Đặt Bàn (Admin Only)
http
PUT /api/reservations/{id}/confirm
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "table_number": "T01"
}
Thanh Toán
http
POST /api/reservations/{id}/pay
Authorization: Bearer {token}
Content-Type: application/json

{
  "payment_method": "card",
  "use_loyalty_points": true,
  "loyalty_points_to_use": 500
}
Hủy Đặt Bàn
http
DELETE /api/reservations/{id}
Authorization: Bearer {token}
Table Management (5 điểm)
Lấy Danh Sách Bàn
http
GET /api/tables?available_only=true
Thêm Bàn (Admin Only)
http
POST /api/tables
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "table_number": "T09",
  "capacity": 8
}
Cập Nhật Thông Tin Bàn (Admin Only)
http
PUT /api/tables/{id}
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "table_number": "T09",
  "capacity": 10
}
Business Logic Chi Tiết
1. Hệ Thống Điểm Thưởng
Mỗi khách hàng mới nhận được 100 điểm thưởng

Mỗi 10,000 VND chi tiêu nhận được 100 điểm thưởng

100 điểm thưởng = 10,000 VND giảm giá

Điểm thưởng có thể tích lũy và sử dụng cho các lần đặt bàn sau

2. Tính Toán Hóa Đơn
text
Subtotal = Σ(menu_item_price × quantity)
Service Charge = 10% × Subtotal
Discount = (loyalty_points_used / 100) × 10,000
Total = Subtotal + Service Charge - Discount
3. Luồng Đặt Bàn
Khách hàng đặt bàn → status: pending

Admin xác nhận và gán bàn → status: confirmed

Khách đến nhà hàng → status: seated

Khách thanh toán → status: completed

Khách hủy → status: cancelled

Xử Lý Lỗi
HTTP Status Codes
200 OK: Request thành công

201 Created: Tạo mới thành công

400 Bad Request: Dữ liệu không hợp lệ

401 Unauthorized: Không có token hoặc token hết hạn

403 Forbidden: Không có quyền truy cập

404 Not Found: Không tìm thấy tài nguyên

409 Conflict: Xung đột dữ liệu

500 Internal Server Error: Lỗi server

Định Dạng Phản Hồi Lỗi
json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
Ví Dụ Lỗi Phổ Biến
json
{
  "success": false,
  "message": "Validation error",
  "error": "\"email\" must be a valid email"
}
Dữ Liệu Mẫu
Tài Khoản Admin
Email: admin@example.com

Password: admin123

Role: admin

Phân Loại Món Ăn
Appetizer: Khai vị (5 món)

Main Course: Món chính (8 món)

Dessert: Tráng miệng (3 món)

Beverage: Đồ uống (3 món)

Special: Đặc biệt (1 món)

Trạng Thái Bàn
T01-T04: Capacity 2-4 người

T05-T06: Capacity 4-6 người

T07-T08: Capacity 6-8 người

Kiểm Thử API
Sử dụng Postman/Insomnia
Import collection từ file Restaurant_API.postman_collection.json

Thiết lập environment variables:

base_url: http://localhost:5000

token: JWT token sau khi login

Test Cases
Đăng ký tài khoản mới

Đăng nhập và lưu token

Lấy danh sách món ăn

Đặt bàn mới

Thêm món vào đơn đặt bàn

Thanh toán hóa đơn

Xem lịch sử đặt bàn

Bảo Mật
1. JWT Authentication
Token hết hạn sau 7 ngày

Refresh token mechanism

Blacklist token khi logout

2. Input Validation
Sử dụng Joi schema validation

Sanitize input data

Prevent SQL injection

3. Security Headers
Helmet.js cho security headers

CORS configuration

Rate limiting

4. Password Security
Bcrypt hashing với salt rounds

Minimum password length: 8 characters

Password complexity requirements

Triển Khai
Development
bash
npm run dev
# Sử dụng nodemon để tự động reload
Production
Cập nhật .env:

env
NODE_ENV=production
JWT_SECRET=strong_production_secret
Build và chạy:

bash
npm start
Docker (Optional)
dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
Troubleshooting
Lỗi Kết Nối Database
Kiểm tra MySQL service đang chạy

Kiểm tra credentials trong .env

Kiểm tra database đã được tạo

Lỗi Migration
bash
# Drop và tạo lại database
npm run migrate:reset
Lỗi Port Đã Sử Dụng
bash
# Kiểm tra process đang chạy
lsof -i :5000
# Kill process
kill -9 [PID]
Tính Năng Mở Rộng (Future Enhancements)
1. Real-time Updates
WebSocket cho real-time order updates

Push notifications cho khách hàng

2. Advanced Features
Đánh giá và review món ăn

Hệ thống gợi ý món ăn

Integration với payment gateway

QR code ordering

3. Reporting & Analytics
Báo cáo doanh thu

Phân tích hành vi khách hàng

Inventory management

Checklist Hoàn Thành
Project hoàn chỉnh, có thể chạy được

Có 5 customers mẫu

Có 20 menu_items mẫu (phân bổ các category)

Có 10 reservations mẫu (nhiều trạng thái khác nhau)

Tất cả chức năng CRUD hoạt động

API hiển thị dữ liệu từ Database

Error handling đầy đủ

Code tổ chức rõ ràng

File README.md đầy đủ

File .env.example

Response format nhất quán

Security: CORS, Helmet, JWT

Input Validation: Joi schemas

Phân Chia Công Việc
Phần 1: Thiết lập Project và Database (10 điểm)
Khởi tạo Node.js Project

Tạo Database Migration (5 bảng)

Seeder Data (5 customers, 20 menu_items, 10 reservations, 8 tables)

Phần 2: Authentication & Authorization (20 điểm)
Đăng ký Customer

Đăng nhập

Middleware Authentication

Authorization (Admin)

Phần 3: Customer Management API (5 điểm)
Lấy danh sách Customers

Lấy Customer theo ID

Cập nhật Customer

Lấy thông tin Customer hiện tại

Phần 4: Menu Management API (12 điểm)
Lấy danh sách Menu Items

Lấy Menu Item theo ID

Thêm Menu Item (Admin)

Cập nhật Menu Item (Admin)

Xóa Menu Item (Admin)

Tìm kiếm Menu Items

Phần 5: Reservation Management API (25 điểm)
Đặt Bàn

Thêm Món vào Đơn

Xác Nhận Đặt Bàn (Admin)

Lấy Đặt Bàn theo ID

Lấy Đặt Bàn của Customer

Thanh Toán (tính discount, loyalty points)

Hủy Đặt Bàn

Phần 6: Table Management API (5 điểm)
Lấy danh sách Tables

Thêm Table (Admin)

Cập nhật Table (Admin)

Xóa Table (Admin)

Phần 7: Error Handling & Validation (3 điểm)
Global Error Handler

Input Validation (Joi)

Database Transaction

Tác Giả
Nguyễn Tiến Lực - MSV: 1771020440
*Học phần: Lập Trình Mobile - Đề số 05*
Email: luc.nt.1771020440@dnu.edu.vn
Giấy Phép
Dự án này được phát triển cho mục đích học tập. Vui lòng không sử dụng cho mục đích thương mại mà không có sự cho phép.

Hỗ Trợ
Nếu có bất kỳ vấn đề nào, vui lòng:

Kiểm tra phần Troubleshooting

Mở issue trên repository

Liên hệ tác giả qua email
