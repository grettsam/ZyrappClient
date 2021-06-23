CREATE TABLE productos(
    producto_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT false,
    stock INT(11) NOT NULL DEFAULT 0,
    valor INT(11) NOT NULL DEFAULT 0,
    total_ventas INT(11) NOT NULL DEFAULT 0,
    creacion TIMESTAMP NOT NULL DEFAULT NOW(),
    descripcion TEXT NOT NULL,
    pic1_producto TEXT NOT NULL DEFAULT 'assets/img/sinFoto.jpg',
    pic2_producto TEXT DEFAULT 'assets/img/sinFoto.jpg',
    clients_id INT(11) NOT NULL ,
    CONSTRAINT fk_producto_cliente FOREIGN KEY (clients_id) REFERENCES clients(clients_id)
);
