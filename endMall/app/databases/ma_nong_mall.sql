/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : ma_nong_mall

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 09/01/2024 23:31:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键唯一ID\n',
  `goods_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商品名称',
  `goods_classification` int NOT NULL COMMENT '商品分类\n',
  `inventory` int NOT NULL COMMENT '库存',
  `purchase_price` decimal(10,2) NOT NULL COMMENT '商品进价',
  `price` decimal(10,2) NOT NULL COMMENT '商品售价',
  `discount` decimal(10,2) DEFAULT '1.00' COMMENT '折扣开始时间',
  `discount_time_start` datetime DEFAULT NULL COMMENT '折扣开始时间',
  `discount_time_end` datetime DEFAULT NULL COMMENT '折扣结束时间',
  `listing_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '上架状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (1, '商品名称1', 4, 990, 1000.00, 2000.00, 1.00, NULL, NULL, 1, '2023-12-26 22:06:11', '2023-12-28 17:46:29');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (2, '商品名称6', 4, 9979, 12.00, 256.00, 0.50, '2023-12-26 22:09:41', '2023-12-31 22:19:41', 0, '2023-12-26 22:07:15', '2024-01-05 22:43:57');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (3, '商品名称3', 5, 9900, 100.00, 200.00, 1.00, NULL, NULL, 1, '2023-12-26 22:09:41', '2023-12-28 17:45:51');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (4, '商品名称4', 6, 178, 100.00, 200.00, 1.00, NULL, NULL, 1, '2023-12-26 22:10:35', '2024-01-03 23:24:19');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (5, '商品名称5', 5, 9999, 2111.00, 9865.00, 0.70, '2024-01-03 00:00:00', '2024-01-06 23:59:59', 1, '2023-12-26 22:29:18', '2024-01-04 23:19:08');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (7, '卫生纸', 6, 8, 2.00, 5.00, 1.00, '2024-01-17 00:00:00', '2024-02-22 23:59:59', 1, '2024-01-04 00:29:30', '2024-01-06 21:56:30');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (8, '牛奶', 7, 997, 30.00, 50.00, NULL, NULL, NULL, 1, '2024-01-04 21:18:21', '2024-01-06 21:58:20');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (11, '烤肠', 7, 9987, 1.00, 3.00, NULL, NULL, NULL, 1, '2024-01-06 21:53:11', '2024-01-07 11:35:59');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (12, '面包', 7, 189, 10.00, 40.00, 0.75, '2024-01-05 00:00:00', '2024-01-13 23:59:59', 1, '2024-01-06 21:53:39', '2024-01-06 21:58:13');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (13, '牙刷', 6, 80, 5.00, 30.00, NULL, NULL, NULL, 1, '2024-01-06 21:54:13', '2024-01-06 21:56:20');
INSERT INTO `goods` (`id`, `goods_name`, `goods_classification`, `inventory`, `purchase_price`, `price`, `discount`, `discount_time_start`, `discount_time_end`, `listing_status`, `create_time`, `update_time`) VALUES (14, '牙膏', 6, 198, 20.00, 30.00, 0.90, NULL, NULL, 1, '2024-01-06 21:54:36', '2024-01-06 21:56:15');
COMMIT;

-- ----------------------------
-- Table structure for goods_classification
-- ----------------------------
DROP TABLE IF EXISTS `goods_classification`;
CREATE TABLE `goods_classification` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键唯一ID',
  `classification_name` varchar(50) NOT NULL COMMENT '分类名称',
  `classification_remark` varchar(200) NOT NULL COMMENT '分类描述',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_classification_name` (`classification_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods_classification
-- ----------------------------
BEGIN;
INSERT INTO `goods_classification` (`id`, `classification_name`, `classification_remark`, `create_time`, `update_time`) VALUES (4, '分类1', '分类2的描述', '2023-12-26 11:43:06', '2024-01-08 22:48:25');
INSERT INTO `goods_classification` (`id`, `classification_name`, `classification_remark`, `create_time`, `update_time`) VALUES (5, '分类2', '分类2的描述', '2023-12-26 17:41:26', '2024-01-06 15:36:30');
INSERT INTO `goods_classification` (`id`, `classification_name`, `classification_remark`, `create_time`, `update_time`) VALUES (6, '生活用品', '纸抽，纸巾，洗发水，沐浴露', '2023-12-29 19:35:40', '2024-01-06 22:10:10');
INSERT INTO `goods_classification` (`id`, `classification_name`, `classification_remark`, `create_time`, `update_time`) VALUES (7, '食品专区', '蔬菜，水果，零食和饮料', '2024-01-02 22:07:01', '2024-01-06 23:35:48');
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `menu_name` varchar(10) NOT NULL COMMENT '菜单名称',
  `menu_path` varchar(30) NOT NULL COMMENT '菜单路径',
  `menu_parent` int DEFAULT NULL COMMENT '父级菜单id',
  `is_disabled` tinyint(1) DEFAULT '0' COMMENT '是否禁用此菜单：0不禁用，1禁用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_in_menu` tinyint(1) DEFAULT '1' COMMENT '是否在菜单栏中展示，默认是',
  PRIMARY KEY (`id`),
  UNIQUE KEY `menu_path` (`menu_path`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (14, '设置中心', '/settings', NULL, 0, '2023-12-24 16:03:57', '2023-12-24 16:03:57', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (15, '菜单管理', '/menu', 14, 0, '2023-12-24 16:04:13', '2023-12-24 16:04:13', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (16, '角色管理', '/role', 14, 0, '2023-12-24 16:04:31', '2023-12-24 16:04:31', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (17, '权限管理', '/permission', 14, 0, '2023-12-24 16:05:06', '2023-12-24 16:05:06', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (18, '员工管理', '/user', 14, 0, '2023-12-24 16:07:05', '2023-12-24 16:07:05', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (19, '角色详情', '/role-detail', 14, 0, '2023-12-24 16:37:09', '2023-12-24 16:45:17', 0);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (20, '测试不在菜单栏展示', '/test', 14, 0, '2023-12-24 16:45:50', '2023-12-24 17:26:00', 0);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (21, '商品中心', '/goods-manager', NULL, 0, '2024-01-01 16:02:21', '2024-01-01 16:05:57', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (22, '分类管理', '/classification-manager', 21, 0, '2024-01-01 16:06:41', '2024-01-01 16:07:52', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (23, '商品列表', '/goods-list', 21, 0, '2024-01-02 23:51:40', '2024-01-02 23:52:12', 1);
INSERT INTO `menu` (`id`, `menu_name`, `menu_path`, `menu_parent`, `is_disabled`, `create_time`, `update_time`, `is_in_menu`) VALUES (24, '订单列表', '/order-list', 21, 0, '2024-01-04 23:58:37', '2024-01-04 23:58:37', 1);
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键唯一ID',
  `goods_id` int NOT NULL COMMENT '商品id',
  `seller_id` int NOT NULL COMMENT '销售id',
  `sales_num` int NOT NULL COMMENT '售卖数量',
  `profit` decimal(11,2) NOT NULL COMMENT '获利',
  `transaction_volume` decimal(11,2) NOT NULL COMMENT '成交额',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (1, 2, 1, 10, 10000.00, 0.00, '2023-12-28 16:49:12', '2023-12-28 16:49:12');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (2, 2, 1, 10, 5000.00, 0.00, '2023-12-28 16:51:01', '2023-12-28 16:51:01');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (3, 3, 1, 10, 1000.00, 0.00, '2023-12-28 16:52:10', '2023-12-28 16:52:10');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (5, 3, 1, 10, 1000.00, 0.00, '2023-12-28 17:13:05', '2023-12-28 17:13:05');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (6, 3, 1, 0, 0.00, 0.00, '2023-12-28 17:39:24', '2023-12-28 17:39:24');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (7, 3, 1, 100, 10000.00, 20000.00, '2023-12-28 17:45:51', '2023-12-28 17:45:51');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (8, 1, 1, 10, 10000.00, 20000.00, '2023-12-28 17:46:29', '2023-12-28 17:46:29');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (9, 2, 1, 10, 5000.00, 15000.00, '2023-12-28 17:47:24', '2023-12-28 17:47:24');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (10, 4, 25, 10, 1000.00, 2000.00, '2023-12-29 19:33:57', '2023-12-29 19:33:57');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (11, 4, 1, 10, 1000.00, 2000.00, '2023-11-29 21:36:27', '2023-12-29 22:33:19');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (12, 4, 25, 1, 100.00, 200.00, '2023-12-30 00:07:09', '2023-12-30 00:07:25');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (13, 4, 1, 1, 100.00, 200.00, '2023-12-30 00:07:29', '2023-12-30 00:07:29');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (14, 7, 1, 1, 3.00, 5.00, '2024-01-05 22:35:37', '2024-01-05 22:35:37');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (15, 2, 1, 10, 2440.00, 2560.00, '2024-01-05 22:43:57', '2024-01-05 22:43:57');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (16, 14, 25, 2, 20.00, 60.00, '2024-01-06 21:56:15', '2024-01-06 21:56:15');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (17, 13, 25, 10, 250.00, 300.00, '2024-01-06 21:56:20', '2024-01-06 21:56:20');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (18, 7, 25, 1, 3.00, 5.00, '2024-01-06 21:56:30', '2024-01-06 21:56:30');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (19, 12, 26, 10, 200.00, 300.00, '2024-01-06 21:58:13', '2024-01-06 21:58:13');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (20, 11, 26, 2, 4.00, 6.00, '2024-01-06 21:58:17', '2024-01-06 21:58:17');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (21, 8, 26, 3, 60.00, 150.00, '2024-01-06 21:58:20', '2024-01-06 21:58:20');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (22, 11, 27, 10, 20.00, 30.00, '2024-01-07 11:35:50', '2024-01-07 11:35:50');
INSERT INTO `orders` (`id`, `goods_id`, `seller_id`, `sales_num`, `profit`, `transaction_volume`, `create_time`, `update_time`) VALUES (23, 11, 27, 1, 2.00, 3.00, '2024-01-07 11:35:59', '2024-01-07 11:35:59');
COMMIT;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `permission_name` varchar(10) NOT NULL COMMENT '权限名称',
  `permission_sign` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限标识',
  `permission_remark` varchar(100) NOT NULL COMMENT '权限描述',
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否禁用此权限：0不禁用，1禁用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `permission_sign` (`permission_sign`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of permission
-- ----------------------------
BEGIN;
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (30, '更新库存', 'UPDATE_INVENTORY', '更新库存的权限', 0, '2024-01-06 17:27:58', '2024-01-06 17:27:58');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (31, '编辑商品', 'UPDATE_GOODS', '编辑商品的权限', 0, '2024-01-06 17:54:48', '2024-01-06 17:54:48');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (32, '创建商品', 'CREATE_GOODS', '创建商品的权限', 0, '2024-01-06 17:55:23', '2024-01-06 17:55:23');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (33, '查看商品进价', 'SHOW_PURCHASE_PRICE', '查看商品进价的权限', 0, '2024-01-06 17:56:21', '2024-01-06 17:56:21');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (34, '查看售卖获利', 'SHOW_PROFIT', '查看售卖获利的权限', 0, '2024-01-06 17:57:44', '2024-01-06 17:57:44');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (35, '查看售卖详情', 'SHOW_SALES_DETAIL', '查看售卖详情的权限', 0, '2024-01-06 17:59:31', '2024-01-06 17:59:31');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (36, '创建商品分类', 'CREATE_GOODS_CLASSIFICATION', '创建商品分类的权限', 0, '2024-01-06 18:03:03', '2024-01-06 18:03:03');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (37, '创建订单', 'CREATE_ORDER', '创建订单的权限', 0, '2024-01-06 19:27:31', '2024-01-06 19:27:31');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (38, '更新商品分类', 'UPDATE_GOODS_CLASSIFICATION', '更新分类的权限', 0, '2024-01-06 19:32:29', '2024-01-06 19:32:29');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (39, '销售管理者', 'SALES_MANAGER', '销售的管理者，可查看所有销售的数据', 0, '2024-01-06 23:12:35', '2024-01-06 23:15:23');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (41, '查看所有商品分类', 'SHOW_ALL_CLASSIFICATION', '查看所有商品分类', 0, '2024-01-06 23:32:48', '2024-01-06 23:32:48');
INSERT INTO `permission` (`id`, `permission_name`, `permission_sign`, `permission_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (42, '商品上下架', 'GOODS_LISTING_STATUS', '控制商品的上下架状态', 0, '2024-01-07 10:55:41', '2024-01-07 10:55:41');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `role_name` varchar(10) NOT NULL COMMENT '角色名称',
  `role_sign` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色标识',
  `role_remark` varchar(100) NOT NULL COMMENT '角色描述',
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_sign` (`role_sign`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `role_name`, `role_sign`, `role_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (54, '生活用品销售员', 'DAY_USE_SALLER', '可以售卖生活用品的人', 0, '2023-12-23 01:21:40', '2024-01-06 20:48:29');
INSERT INTO `role` (`id`, `role_name`, `role_sign`, `role_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (55, '超级admin', 'SUPPER_ADMIN', '请勿更改，老板独有', 0, '2023-12-24 16:05:49', '2024-01-07 10:59:30');
INSERT INTO `role` (`id`, `role_name`, `role_sign`, `role_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (56, '食品专区售卖员', 'FOOD_ZOON_SALLER', '可以售卖果蔬饮品，牛奶零食的售卖员', 0, '2024-01-02 22:41:28', '2024-01-06 21:22:42');
INSERT INTO `role` (`id`, `role_name`, `role_sign`, `role_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (58, '商品管理员', 'GOODS_MANAGER', '管理商品的人', 0, '2024-01-06 21:24:41', '2024-01-07 11:00:02');
INSERT INTO `role` (`id`, `role_name`, `role_sign`, `role_remark`, `is_disabled`, `create_time`, `update_time`) VALUES (59, '销售负责人', 'SALES_MANAGER', '销售负责人', 0, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
COMMIT;

-- ----------------------------
-- Table structure for role_goods_classification
-- ----------------------------
DROP TABLE IF EXISTS `role_goods_classification`;
CREATE TABLE `role_goods_classification` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `goods_classification_id` int NOT NULL COMMENT '商品分类ID',
  `role_id` int NOT NULL COMMENT '角色ID\n',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role_goods_classification
-- ----------------------------
BEGIN;
INSERT INTO `role_goods_classification` (`id`, `goods_classification_id`, `role_id`, `create_time`, `update_time`) VALUES (43, 5, 55, '2024-01-06 15:36:30', '2024-01-06 15:36:30');
INSERT INTO `role_goods_classification` (`id`, `goods_classification_id`, `role_id`, `create_time`, `update_time`) VALUES (53, 6, 55, '2024-01-06 22:10:10', '2024-01-06 22:10:10');
INSERT INTO `role_goods_classification` (`id`, `goods_classification_id`, `role_id`, `create_time`, `update_time`) VALUES (54, 6, 54, '2024-01-06 22:10:10', '2024-01-06 22:10:10');
INSERT INTO `role_goods_classification` (`id`, `goods_classification_id`, `role_id`, `create_time`, `update_time`) VALUES (56, 7, 56, '2024-01-06 23:35:48', '2024-01-06 23:35:48');
INSERT INTO `role_goods_classification` (`id`, `goods_classification_id`, `role_id`, `create_time`, `update_time`) VALUES (57, 7, 58, '2024-01-06 23:35:48', '2024-01-06 23:35:48');
INSERT INTO `role_goods_classification` (`id`, `goods_classification_id`, `role_id`, `create_time`, `update_time`) VALUES (61, 4, 55, '2024-01-08 22:48:25', '2024-01-08 22:48:25');
COMMIT;

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `menu_id` int NOT NULL COMMENT '菜单表主键id',
  `role_id` int NOT NULL COMMENT '角色表主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=411 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
BEGIN;
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (359, 24, 54, '2024-01-06 20:48:29', '2024-01-06 20:48:29');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (360, 23, 54, '2024-01-06 20:48:29', '2024-01-06 20:48:29');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (361, 21, 54, '2024-01-06 20:48:29', '2024-01-06 20:48:29');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (364, 24, 56, '2024-01-06 21:22:42', '2024-01-06 21:22:42');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (365, 23, 56, '2024-01-06 21:22:42', '2024-01-06 21:22:42');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (366, 21, 56, '2024-01-06 21:22:42', '2024-01-06 21:22:42');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (394, 20, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (395, 19, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (396, 18, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (397, 17, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (398, 16, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (399, 15, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (400, 24, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (401, 23, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (402, 22, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (403, 14, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (404, 21, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (405, 23, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (406, 22, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (407, 21, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (408, 24, 59, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (409, 23, 59, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
INSERT INTO `role_menu` (`id`, `menu_id`, `role_id`, `create_time`, `update_time`) VALUES (410, 21, 59, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
COMMIT;

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `permission_id` int NOT NULL COMMENT '权限表主键id',
  `role_id` int NOT NULL COMMENT '角色表主键id',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
BEGIN;
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (186, 37, 54, '2024-01-06 20:48:29', '2024-01-06 20:48:29');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (187, 37, 56, '2024-01-06 21:22:42', '2024-01-06 21:22:42');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (218, 42, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (219, 41, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (220, 39, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (221, 38, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (222, 37, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (223, 36, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (224, 34, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (225, 33, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (226, 32, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (227, 31, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (228, 30, 55, '2024-01-07 10:59:30', '2024-01-07 10:59:30');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (229, 42, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (230, 41, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (231, 38, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (232, 36, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (233, 33, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (234, 32, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (235, 31, 58, '2024-01-07 11:00:02', '2024-01-07 11:00:02');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (236, 42, 59, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (237, 41, 59, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (238, 39, 59, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
INSERT INTO `role_permission` (`id`, `permission_id`, `role_id`, `create_time`, `update_time`) VALUES (239, 37, 59, '2024-01-07 11:34:25', '2024-01-07 11:34:25');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `username` varchar(10) NOT NULL COMMENT '姓名',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `account_number` varchar(36) NOT NULL COMMENT '账号',
  `password` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `id_number` varchar(18) NOT NULL COMMENT '身份证号',
  `is_depart` tinyint(1) DEFAULT '0' COMMENT '逻辑删除0:未离职，1已离职',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '逻辑删除0:未删除，1已删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_phone` (`phone`),
  UNIQUE KEY `unique_account_number` (`account_number`),
  UNIQUE KEY `unique_id_number` (`id_number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `phone`, `account_number`, `password`, `id_number`, `is_depart`, `is_delete`, `create_time`, `update_time`) VALUES (1, '老板', '15666666666', 'admin', '123456', '130666166612128888', 0, 0, '2023-12-09 11:38:59', '2023-12-09 18:21:57');
INSERT INTO `user` (`id`, `username`, `phone`, `account_number`, `password`, `id_number`, `is_depart`, `is_delete`, `create_time`, `update_time`) VALUES (22, '商品管理员1', '15633572833', 'goodsManager@qq.com', '123456', '130500000000000003', 0, 0, '2023-12-25 11:17:08', '2024-01-06 21:37:12');
INSERT INTO `user` (`id`, `username`, `phone`, `account_number`, `password`, `id_number`, `is_depart`, `is_delete`, `create_time`, `update_time`) VALUES (25, '生活用品员工1', '12222222222', 'dailyNecessities@qq.com', '123456', '133333333333333333', 0, 0, '2023-12-25 11:34:11', '2024-01-06 21:36:56');
INSERT INTO `user` (`id`, `username`, `phone`, `account_number`, `password`, `id_number`, `is_depart`, `is_delete`, `create_time`, `update_time`) VALUES (26, '食品销售员', '15888888888', 'foodsSalller@qq.com', '123456', '130888888888889999', 0, 0, '2024-01-06 21:19:55', '2024-01-06 21:19:55');
INSERT INTO `user` (`id`, `username`, `phone`, `account_number`, `password`, `id_number`, `is_depart`, `is_delete`, `create_time`, `update_time`) VALUES (27, '销售负责人', '18766789987', 'salesManager@qq.com', '123456', '1768779887655561', 0, 0, '2024-01-07 11:34:58', '2024-01-07 11:34:58');
COMMIT;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` int NOT NULL COMMENT '用户表主键id',
  `role_id` int NOT NULL COMMENT '角色表主键id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_role
-- ----------------------------
BEGIN;
INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`) VALUES (53, 1, 54, '2023-12-26 17:42:31', '2023-12-26 17:42:31');
INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`) VALUES (54, 1, 55, '2023-12-26 17:42:31', '2023-12-26 17:42:31');
INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`) VALUES (62, 25, 54, '2024-01-03 00:11:28', '2024-01-03 00:11:28');
INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`) VALUES (64, 26, 56, '2024-01-06 21:19:55', '2024-01-06 21:19:55');
INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`) VALUES (65, 22, 58, '2024-01-06 21:39:49', '2024-01-06 21:39:49');
INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `create_time`, `update_time`) VALUES (66, 27, 59, '2024-01-07 11:34:58', '2024-01-07 11:34:58');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
