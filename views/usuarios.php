<form id="usuarioForm">
    <input type="text" name="nombre" placeholder="Nombre" required>
    <input type="email" name="correo" placeholder="Correo" required>
    <input type="text" name="telefono" placeholder="Teléfono" required>
    <input type="hidden" name="id"> 
    <input type="hidden" name="accion" value="crear">
    <button type="submit">Agregar</button>
</form>

<table border="1" id="tablaUsuarios"></table>

<script src="js/usuario.js"></script>

