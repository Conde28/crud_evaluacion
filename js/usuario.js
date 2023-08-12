$(document).ready(function() {

    function cargarUsuarios() {
        $.ajax({
            type: "GET",
            url: "controllers/usuarioController.php?accion=obtener",
            dataType: "json",
            success: function(data) {
                let contenido = '<thead><tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Acciones</th></tr></thead><tbody>';
                data.forEach(usuario => {
                    contenido += `<tr>
                                    <td>${usuario.nombre}</td>
                                    <td>${usuario.correo}</td>
                                    <td>${usuario.telefono}</td>
                                    <td>
                                        <button data-id="${usuario.id}" class="btnEliminar">Eliminar</button>
                                        <button data-id="${usuario.id}" class="btnEditar">Editar</button>
                                    </td>
                                  </tr>`;
                });
                contenido += '</tbody>';
                $('#tablaUsuarios').html(contenido);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error al cargar usuarios: " + textStatus + " " + errorThrown);
            }
        });
    }

    cargarUsuarios();

    $("#usuarioForm").submit(function(e) {
        e.preventDefault();
        let formData = $(this).serialize();
        let accion = $('input[name="accion"]').val();
        let url = accion === 'editar' ? "controllers/usuarioController.php?accion=editar" : "controllers/usuarioController.php";

        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            dataType: "json",
            success: function(response) {
                if (response.resultado) {
                    cargarUsuarios();
                    $('#usuarioForm').trigger("reset");
                    $('input[name="accion"]').val('crear');
                    $('input[name="id"]').val(''); // Resetear el ID después de la edición
                    $('#usuarioForm button[type="submit"]').text('Agregar'); // Resetear el texto del botón
                } else {
                    alert(response.mensaje || "Hubo un error al procesar la solicitud.");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud de formulario: " + textStatus + " " + errorThrown);
            }
        });
    });

    $(document).on('click', '.btnEditar', function() {
        let id = $(this).data('id');
        let fila = $(this).closest('tr');
        let nombre = fila.find('td:eq(0)').text();
        let correo = fila.find('td:eq(1)').text();
        let telefono = fila.find('td:eq(2)').text();

        $('#usuarioForm input[name="nombre"]').val(nombre);
        $('#usuarioForm input[name="correo"]').val(correo);
        $('#usuarioForm input[name="telefono"]').val(telefono);
        $('#usuarioForm input[name="id"]').val(id);
        $('#usuarioForm input[name="accion"]').val('editar');
        $('#usuarioForm button[type="submit"]').text('Actualizar');
    });

    $(document).on('click', '.btnEliminar', function() {
        let id = $(this).data('id');
        $.ajax({
            type: "POST",
            url: "controllers/usuarioController.php?accion=eliminar",
            data: { id: id },
            dataType: "json",
            success: function(response) {
                if (response.resultado) {
                    cargarUsuarios();
                } else {
                    alert("Hubo un error al eliminar el usuario.");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud de eliminación: " + textStatus + " " + errorThrown);
            }
        });
    });
});
