-- Banco da Euna3D (vitrine-web)
CREATE DATABASE IF NOT EXISTS euna3d CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE euna3d;

CREATE TABLE IF NOT EXISTS produtos (
  id         VARCHAR(80)  NOT NULL PRIMARY KEY,
  titulo     VARCHAR(160) NOT NULL,
  preco      DECIMAL(10,2) NOT NULL,
  status     ENUM('pronta','encomenda') NOT NULL,
  imagem     VARCHAR(255) NOT NULL,
  ordem      INT NOT NULL DEFAULT 0,
  criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produto_categorias (
  produto_id VARCHAR(80) NOT NULL,
  categoria  VARCHAR(40) NOT NULL,
  PRIMARY KEY (produto_id, categoria),
  FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
) ENGINE=InnoDB;
