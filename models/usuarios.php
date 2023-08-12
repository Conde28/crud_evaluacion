<?php
require 'db.php';

function crearUsuario($nombre, $correo, $telefono) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, correo, telefono) VALUES (?, ?, ?)");
    return $stmt->execute([$nombre, $correo, $telefono]);
}

function editarUsuario($id, $nombre, $correo, $telefono) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE usuarios SET nombre = ?, correo = ?, telefono = ? WHERE id = ?");
    return $stmt->execute([$nombre, $correo, $telefono, $id]);
}


function obtenerUsuarios() {
    global $pdo;
    return $pdo->query("SELECT * FROM usuarios")->fetchAll(PDO::FETCH_ASSOC);
}

function eliminarUsuario($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
    return $stmt->execute([$id]);
}
?>
