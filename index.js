// Variables
const form = document.getElementById('turnoForm');
const container = document.getElementById('turnosContainer');
const btnLimpiar = document.getElementById('limpiarBtn');

// Cargar turnos desde localStorage o inicializar array
let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

// Función para mostrar los turnos
function mostrarTurnos() {
    container.innerHTML='';
    if(turnos.length===0){
        container.innerHTML='<p>No hay turnos programados.</p>';
        return;
    }
    turnos.forEach((t,i)=>{
        const card=document.createElement('div');
        card.className='turno-card';

        const infoDiv=document.createElement('div');
        infoDiv.className='turno-info';

        infoDiv.innerHTML= `
            <div class='turno-nombre'>${t.nombre}</div>
            <div class='turno-servicio'>Servicio: ${t.servicio}</div>
            <div class='turno-fecha'>Fecha: ${t.fecha} Hora:${t.hora}</div>`;

        const btnEliminar=document.createElement('button');
        btnEliminar.textContent='Eliminar';
        btnEliminar.onclick=()=>eliminarTurno(i);

        card.appendChild(infoDiv);
        card.appendChild(btnEliminar);
        container.appendChild(card);
    });
}

// Función para agregar turno
form.onsubmit=function(e){
 e.preventDefault();
 const nombre=document.getElementById('nombre').value.trim();
 const fecha=document.getElementById('fecha').value.trim();
 const hora=document.getElementById('hora').value.trim();
 const servicio=document.getElementById('servicio').value;

 if(!nombre || !fecha || !hora || !servicio){
   alert('Por favor completa todos los campos.');
   return;
 }

 const nuevoTurno={nombre,fecha,hora,servicio};
 turnos.push(nuevoTurno);
 guardarYMostrar();
 form.reset();
}

// Función para eliminar turno
function eliminarTurno(index){
 turnos.splice(index,1);
 guardarYMostrar();
}

// Guardar en localStorage y actualizar vista
function guardarYMostrar(){
 localStorage.setItem('turnos', JSON.stringify(turnos));
 mostrarTurnos();
}

// Evento limpiar todos
document.getElementById('limpiarBtn').onclick=function(){
 if(confirm('¿Seguro que quieres eliminar todos los turnos?')){
   turnos=[];
   guardarYMostrar();
 }
}

// Inicializar vista
mostrarTurnos();