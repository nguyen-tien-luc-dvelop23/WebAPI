# Flutter Client App cho Restaurant Management

## Thông Tin
- **Sinh Viên**: Nguyễn Thị Thành Nhã
- **Mã Sinh Viên**: 1771020440
- **Dự Án**: Restaurant Management - Client App

## Hướng Dẫn Cài Đặt & Chạy

### 1. Yêu Cầu Hệ Thống
- Flutter SDK (Latest version)
- Dart SDK (Latest version)
- Android Studio hoặc Xcode

### 2. Cài Đặt Dependencies

```bash
cd flutter_restaurant_app
flutter pub get
```

### 3. Cấu Hình API
Chỉnh sửa file `lib/config/api_config.dart`:
```dart
const String API_BASE_URL = 'http://YOUR_SERVER_IP:5000/api';
```

### 4. Chạy App

**Android**:
```bash
flutter run
```

**iOS**:
```bash
flutter run -d all
```

### 5. Build Production

**Android APK**:
```bash
flutter build apk --release
```

**iOS**:
```bash
flutter build ios --release
```

## Màn Hình Ứng Dụng

### 1. Màn Hình Đăng Nhập (Login Screen)
- Form đăng nhập (email, password)
- Nút "Đăng Nhập" và "Đăng Ký"
- Xử lý lỗi login
- Lưu token vào SharedPreferences

### 2. Màn Hình Đăng Ký (Register Screen)
- Form: email, password, fullName, phoneNumber, address
- Validation basic
- Nút "Đăng Ký" và "Quay Lại"

### 3. Màn Hình Thực Đơn (Menu Screen)
- ListView/GridView hiển thị menu items
- Hiển thị: Hình ảnh, Tên, Giá, Rating
- Icons: Chay, Cay
- Badge: "Hết" nếu !isAvailable
- Filter: Category, Vegetarian, Spicy
- Search box

### 4. Màn Hình Chi Tiết Món (Item Detail Screen)
- Hiển thị đầy đủ thông tin:
  - Tên, mô tả, giá
  - Nguyên liệu
  - Thời gian chế biến
  - Rating
- Nút "Thêm vào đơn" (nếu available)
- Chọn số lượng

### 5. Màn Hình Đặt Bàn (Reservation Screen)
- DatePicker: Chọn ngày
- TimePicker: Chọn giờ
- NumberPicker: Số khách
- TextField: Yêu cầu đặc biệt
- Nút "Đặt Bàn"

### 6. Màn Hình Đơn Hàng (Order Details Screen)
- Danh sách món đã chọn
- Tăng/giảm số lượng
- Hiển thị tính toán:
  - Subtotal
  - Service charge (10%)
  - Total
- Nút "Xác Nhận Đặt Bàn"

### 7. Màn Hình Đặt Bàn Của Tôi (My Reservations Screen)
- ListView: Danh sách đặt bàn
- Mỗi item: Ngày, Số khách, Status (với color), Total
- Click để xem chi tiết
- Nút "Thanh Toán" (nếu seated)

### 8. Màn Hình Chi Tiết Đặt Bàn (Reservation Detail Screen)
- Hiển thị đầy đủ thông tin:
  - Mã đặt bàn
  - Ngày/giờ
  - Bàn số (nếu có)
  - Status
  - Danh sách món
- Hiển thị loyalty points
- Nút "Thanh Toán"

## Cấu Trúc Project

```
flutter_restaurant_app/
├── lib/
│   ├── main.dart
│   ├── config/
│   │   └── api_config.dart
│   ├── models/
│   │   ├── user_model.dart
│   │   ├── menu_item_model.dart
│   │   └── reservation_model.dart
│   ├── services/
│   │   ├── api_service.dart
│   │   └── storage_service.dart
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── login_screen.dart
│   │   │   └── register_screen.dart
│   │   ├── menu/
│   │   │   ├── menu_screen.dart
│   │   │   └── item_detail_screen.dart
│   │   ├── reservation/
│   │   │   ├── reservation_screen.dart
│   │   │   ├── order_details_screen.dart
│   │   │   └── my_reservations_screen.dart
│   │   └── profile/
│   │       └── profile_screen.dart
│   ├── widgets/
│   │   ├── menu_item_card.dart
│   │   ├── reservation_card.dart
│   │   └── custom_widgets.dart
│   └── providers/
│       ├── auth_provider.dart
│       ├── menu_provider.dart
│       └── reservation_provider.dart
├── pubspec.yaml
└── README.md
```

## Package Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  shared_preferences: ^2.2.2
  provider: ^6.0.0
  intl: ^0.19.0
```

## Features Implemented

✅ Màn hình đăng nhập
✅ Màn hình đăng ký  
✅ Danh sách menu items
✅ Tìm kiếm và lọc menu
✅ Chi tiết món ăn
✅ Đặt bàn
✅ Thêm món vào đơn
✅ Danh sách đặt bàn của tôi
✅ Chi tiết đặt bàn
✅ Thanh toán
✅ Quản lý token
✅ Error handling

## Notes

- Tất cả requests đều cần token (ngoại trừ login/register)
- Token được lưu trong SharedPreferences
- Hiển thị loading dialog khi chờ response
- Hiển thị error message khi có lỗi
- Automatic token refresh (nếu cần)

---

**Chúc các bạn làm bài tốt!** 🚀
