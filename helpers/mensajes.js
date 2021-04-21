require('colors');

const mostrarMenu = () => {

    return new Promise( (resolve, reject) => {

        console.clear();
        console.log('========================='.magenta);
        console.log('  Seleccione una opción  '.yellow);
        console.log('=========================\n'.magenta);
    
        console.log(`${ '1.'.magenta } ${ 'Crear una tarea'.yellow }`);
        console.log(`${ '2.'.magenta } ${ 'Listar tareas'.yellow }`);
        console.log(`${ '3.'.magenta } ${ 'Listar tareas completadas'.yellow }`);
        console.log(`${ '4.'.magenta } ${ 'Listar tareas pendientes'.yellow }`);
        console.log(`${ '5.'.magenta } ${ 'Completar tarea(s)'.yellow }`);
        console.log(`${ '6.'.magenta } ${ 'Borrar tarea'.yellow }`);
        console.log(`${ '0.'.magenta } ${ 'Salir'.yellow }\n`);
    
        // Preparar interfaz para mostrar al usuario
        const readline = require('readline').createInterface({
            // Crear input de tipo process.stdin
            input: process.stdin,
            // Para mostrar un mensaje en consola cuando le pido algo al usuario
            output: process.stdout
        });
    
        // Si necesitamos el stdout, para mostrar la info al usuario con la pregunta
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });

    });
    

}

const pausa = () => {

    return new Promise( (resolve, reject) => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        });

    });

}

module.exports = {
    mostrarMenu,
    pausa
}