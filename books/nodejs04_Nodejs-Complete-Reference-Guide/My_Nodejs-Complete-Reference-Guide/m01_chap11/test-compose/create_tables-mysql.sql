CREATE TABLE `Users` (
                         `id` int(11) NOT NULL AUTO_INCREMENT,
                         `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `familyName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `givenName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `middleName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `emails` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `photos` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                         `createdAt` datetime NOT NULL,
                         `updatedAt` datetime NOT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;