CREATE TABLE notificaciones (
    ID_notificacion SERIAL PRIMARY KEY,
    ID_usuario INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    cuerpo TEXT NOT NULL,
    data JSONB, 
    leida BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (ID_usuario) REFERENCES usuario(ID_usuario) ON DELETE CASCADE
);
