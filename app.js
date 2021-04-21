require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/Tareas');

const main = async() => {

    let opt;
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) { // Cargar tareas
        // Establecer las tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprime el menú
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
                break;

            case 2:
                tareas.listadoCompleto();
                break;

            case 3:
                tareas.listarPendientesCompletadas();
                break;

            case 4:
                tareas.listarPendientesCompletadas( false );
                break;

            case 5:
                // Completado o pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;

            case 6:
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== 0 ) {
                    // Preguntar si esta seguro
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('\nTarea borrada exitosamente'.green);
                    }
                    break;
                }
        }

        guardarDB( tareas.listadoArr );

        await pausa();
        
    } while ( opt !== 0 );

}

main();