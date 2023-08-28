-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 05, 2023 lúc 01:28 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hotel_booking3`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `room_id` int(10) UNSIGNED NOT NULL,
  `booking_date` date NOT NULL,
  `checkin_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Phòng Đơn', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(2, 'Phòng Đôi', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(3, 'Phòng Hai Giường Đơn', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(4, 'Phòng Gia Đình', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(5, 'Phòng Hội Nghị', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(6, 'Phòng Luxury', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(7, 'Phòng Cao Cấp', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(8, 'Phòng Suite', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(9, 'Phòng Penthouse', '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(10, 'Phòng Bungalow', '2023-07-05 03:56:28', '2023-07-05 03:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `room_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel_images`
--

CREATE TABLE `hotel_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2023_06_04_154300_create_users_table', 1),
(5, '2023_06_25_011326_create_categories_table', 1),
(6, '2023_06_25_013144_create_services_table', 1),
(7, '2023_06_25_015541_rooms', 1),
(8, '2023_06_25_065928_rooms_services', 1),
(9, '2023_06_25_070211_hotel_images', 1),
(10, '2023_06_25_070422_roomimages', 1),
(11, '2023_06_25_071043_bookings', 1),
(12, '2023_06_25_071534_comments', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Users', 2, 'authToken', '59345d37b228f713385de4bb6895cc1e1d209bf321a344c32725cbcdd0a033b5', '[\"*\"]', NULL, NULL, '2023-07-05 04:02:06', '2023-07-05 04:02:06'),
(2, 'App\\Models\\Users', 1, 'authToken', 'df01003150970dff0b6ac23dd3122bdf6d07b2cdad338c8b673406f7c9e432d5', '[\"*\"]', NULL, NULL, '2023-07-05 04:28:03', '2023-07-05 04:28:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `price` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `desc` text DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`id`, `category_id`, `price`, `name`, `desc`, `star`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 50000, 'Phòng Standard', 'hạng phòng phổ thông, thấp nhất với những tiện nghi cơ bản cho nhu cầu nghỉ ngơi lưu trú của khách hàn', 0, 0, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(2, 2, 6000, 'Phòng Superior', 'Có diện tích lớn hơn từ 20m2 trở lên và thường có view đẹp có ban công, cửa sổ cùng nhiều thiết bị hiện đại', 0, 0, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(3, 6, 50000, 'Phòng Deluxe', 'Tầng cao, diện tích rộng, hướng nhìn đẹp và trang bị những vật dụng, trang thiết bị cao cấp', 0, 0, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(4, 7, 70000, 'Phòng Suite', 'Phòng Suite (SUT) là hạng phòng cao cấp nhất trong các khách sạn, resort tiêu chuẩn 4 - 5 sao.', 0, 0, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(5, 2, 50000, 'Phòng Standard', 'Phòng Suite thường được bố trí ở khu vực có tầm nhìn ngắm cảnh đẹp nhất (những tầng cao nhất khách sạn hay phía biển có thể ngắm bình minh/ hoàng hôn của resort)', 0, 0, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(6, 2, 60000, 'Phòng Standard', 'Phòng Suite thường được bố trí ở khu vực có tầm nhìn ngắm cảnh đẹp nhất (những tầng cao nhất khách sạn hay phía biển có thể ngắm bình minh/ hoàng hôn của resort)', 0, 0, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(7, 7, 70000, 'Phòng Deluxe', 'phòng cao cấp nhất trong các khách sạn, resort tiêu chuẩn 4 - 5 sao.', 0, 0, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(8, 3, 50000, 'Phòng Superior', 'phòng 2 giường cho 2 khách ngủ', 0, 0, '2023-07-05 04:26:27', '2023-07-05 04:26:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms_services`
--

CREATE TABLE `rooms_services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_id` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms_services`
--

INSERT INTO `rooms_services` (`id`, `room_id`, `service_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(2, 1, 4, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(3, 1, 6, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(4, 2, 1, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(5, 2, 4, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(6, 2, 6, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(7, 2, 8, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(8, 3, 1, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(9, 3, 2, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(10, 3, 3, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(11, 3, 5, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(12, 3, 8, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(13, 4, 1, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(14, 4, 3, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(15, 4, 2, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(16, 4, 4, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(17, 4, 5, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(18, 5, 1, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(19, 5, 4, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(20, 5, 7, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(21, 5, 6, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(22, 5, 2, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(23, 6, 3, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(24, 6, 6, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(25, 6, 7, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(26, 7, 1, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(27, 7, 2, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(28, 7, 3, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(29, 7, 8, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(30, 7, 7, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(31, 7, 6, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(32, 7, 5, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(33, 8, 1, '2023-07-05 04:26:27', '2023-07-05 04:26:27'),
(34, 8, 3, '2023-07-05 04:26:27', '2023-07-05 04:26:27'),
(35, 8, 2, '2023-07-05 04:26:27', '2023-07-05 04:26:27'),
(36, 8, 8, '2023-07-05 04:26:27', '2023-07-05 04:26:27'),
(37, 8, 7, '2023-07-05 04:26:27', '2023-07-05 04:26:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_images`
--

CREATE TABLE `room_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_id` int(10) UNSIGNED NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `room_images`
--

INSERT INTO `room_images` (`id`, `room_id`, `image_path`, `desc`, `created_at`, `updated_at`) VALUES
(1, 1, 'r1.jfif', NULL, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(2, 1, 'r11.jfif', NULL, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(3, 1, 'r12.jfif', NULL, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(4, 1, 'r13.jfif', NULL, '2023-07-05 04:04:01', '2023-07-05 04:04:01'),
(5, 2, 'r2.jpg', NULL, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(6, 2, 'r21.jpg', NULL, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(7, 2, 'r2.2.jpg', NULL, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(8, 2, 'r21.jpg', NULL, '2023-07-05 04:08:46', '2023-07-05 04:08:46'),
(9, 3, 'r3.jpg', NULL, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(10, 3, 'r3.1.jpg', NULL, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(11, 3, 'r3.2.png', NULL, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(12, 3, 'r3.3.jpg', NULL, '2023-07-05 04:11:57', '2023-07-05 04:11:57'),
(13, 4, 'r4.jpg', NULL, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(14, 4, 'r4.1.jpg', NULL, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(15, 4, 'r4.2.jpg', NULL, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(16, 4, 'r4.3.jpg', NULL, '2023-07-05 04:18:54', '2023-07-05 04:18:54'),
(17, 5, 'r4.jpg', NULL, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(18, 5, 'r4.2.jpg', NULL, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(19, 5, 'r4.3.jpg', NULL, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(20, 5, 'r4.jpg', NULL, '2023-07-05 04:23:22', '2023-07-05 04:23:22'),
(21, 6, 'r3.3.jpg', NULL, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(22, 6, 'r3.2.png', NULL, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(23, 6, 'r3.1.jpg', NULL, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(24, 6, 'r3.jpg', NULL, '2023-07-05 04:24:19', '2023-07-05 04:24:19'),
(25, 7, 'r4.jpg', NULL, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(26, 7, 'r4.1.jpg', NULL, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(27, 7, 'r4.2.jpg', NULL, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(28, 7, 'r4.3.jpg', NULL, '2023-07-05 04:25:34', '2023-07-05 04:25:34'),
(29, 8, 'r3.3.jpg', NULL, '2023-07-05 04:26:27', '2023-07-05 04:26:27'),
(30, 8, 'r3.2.png', NULL, '2023-07-05 04:26:27', '2023-07-05 04:26:27'),
(31, 8, 'r3.1.jpg', NULL, '2023-07-05 04:26:27', '2023-07-05 04:26:27'),
(32, 8, 'r3.jpg', NULL, '2023-07-05 04:26:27', '2023-07-05 04:26:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id`, `name`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Dịch vụ phòng', 177, '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(2, 'Nhà hàng và quầy bar', 81, '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(3, 'Dịch vụ đặt vé và tour du lịch', 173, '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(4, 'Dịch vụ xe đưa đón', 82, '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(5, 'Trung tâm thể dục và spa', 117, '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(6, 'Internet Wi-Fi', 57, '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(7, 'Dịch vụ giữ trẻ', 86, '2023-07-05 03:56:28', '2023-07-05 03:56:28'),
(8, 'Dịch vụ xe đạp, xe máy', 183, '2023-07-05 03:56:28', '2023-07-05 03:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `image`, `address`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(1, 'son', 'sondinh@gmail.com', '$2y$10$KHojN1aV4e95yaSsjRfoY.jyG6tcky8aSnWBwhc8RuGmFsAEqYsQO', NULL, 'abcdef', '0932307024', NULL, '2023-07-05 04:01:30', '2023-07-05 04:01:30'),
(2, 'admin', 'admin@gmail.com', '$2y$10$8HKlGhtL.7Y2Rukhuop.cuQurq7ZBLpC3n/E6IOcHYe2OACEs/NNG', NULL, 'ádfgggg', '0932307024', NULL, '2023-07-05 04:01:54', '2023-07-05 04:01:54');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_user_id_foreign` (`user_id`),
  ADD KEY `bookings_room_id_foreign` (`room_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_room_id_foreign` (`room_id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_category_id_foreign` (`category_id`);

--
-- Chỉ mục cho bảng `rooms_services`
--
ALTER TABLE `rooms_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_services_room_id_foreign` (`room_id`),
  ADD KEY `rooms_services_service_id_foreign` (`service_id`);

--
-- Chỉ mục cho bảng `room_images`
--
ALTER TABLE `room_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_images_room_id_foreign` (`room_id`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_name_unique` (`name`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `hotel_images`
--
ALTER TABLE `hotel_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `rooms_services`
--
ALTER TABLE `rooms_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `room_images`
--
ALTER TABLE `room_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `rooms_services`
--
ALTER TABLE `rooms_services`
  ADD CONSTRAINT `rooms_services_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rooms_services_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `room_images`
--
ALTER TABLE `room_images`
  ADD CONSTRAINT `room_images_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
