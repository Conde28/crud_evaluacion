<?php
header('Content-Type: application/json');

require '../models/usuarios.php';

$accion = $_REQUEST['accion'] ?? null;

switch ($accion) {
    case 'crear':
        $nombre = $_POST['nombre'] ?? null;
        $correo = $_POST['correo'] ?? null;
        $telefono = $_POST['telefono'] ?? null;
        if (!$nombre || !$correo || !$telefono) {
            echo json_encode(['resultado' => false, 'mensaje' => 'Datos incompletos']);
            exit;
        }
        $resultado = crearUsuario($nombre, $correo, $telefono);
        echo json_encode(['resultado' => $resultado]);
        break;
    
        case 'editar':
            $id = $_POST['id'] ?? null;
            $nombre = $_POST['nombre'] ?? null;
            $correo = $_POST['correo'] ?? null;
            $telefono = $_POST['telefono'] ?? null;
            if (!$nombre || !$correo || !$telefono || !$id) {
                echo json_encode(['resultado' => false, 'mensaje' => 'Datos incompletos']);
                exit;
            }
            $resultado = editarUsuario($id, $nombre, $correo, $telefono);
            echo json_encode(['resultado' => $resultado]);
            break;
        


    case 'eliminar':
        $id = $_POST['id'] ?? null;
        if (!$id) {
            echo json_encode(['resultado' => false, 'mensaje' => 'ID no proporcionado']);
            exit;
        }
        $resultado = eliminarUsuario($id);
        echo json_encode(['resultado' => $resultado]);
        break;

    case 'obtener':
        $usuarios = obtenerUsuarios();
        echo json_encode($usuarios);
        break;

    default:
        echo json_encode(['resultado' => false, 'mensaje' => 'Acción no reconocida']);
        break;

    
}
?>
