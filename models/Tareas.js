const Tarea = require('./Tarea');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id ) {

        if( this._listado[id] ){
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '' ) {
        
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        this.listadoArr.forEach( ( tarea, index ) => {
            const { desc, completadoEn } = tarea;
            const indice = `${index + 1}.`.magenta;
            ( completadoEn )
                ? console.log(`\n${ indice } ${ desc } :: ${ 'Completada'.green }`)
                : console.log(`\n${ indice } ${ desc } :: ${ 'Pendiente'.red }`);
        });
    }

    listarPendientesCompletadas( completadas = true ) {

        this.listadoArr.forEach( ( tarea, index ) => {

            const { desc, completadoEn } = tarea;
            const indice = `${index + 1}.`.magenta;

            if( completadas ){
                if( completadoEn ) {
                    console.log(`\n${ indice } ${ desc } :: ${ completadoEn.green }`);
                } 
            } else {
                if ( !completadoEn) {
                    console.log(`\n${ indice } ${ desc } :: ${ 'Pendiente'.red }`)
                }
            }
        });

    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}

module.exports = Tareas;