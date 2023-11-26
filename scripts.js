

class Materias{
    constructor(nombre){
        this.nombre = nombre
        this.comision = []
    }
    agregarComision(id){
        this.comision.push({
            id :id,
            horarios: []
        })

    }


}


const dayOfWeek =[["","Calendario"], ["Lu","Lunes"],["Ma","Martes"],["Mie","Miercoles"],["Ju","Jueves"],["Vi","Viernes"],["Sa","Sabado"],["Do","Domingo"]]


const interval = document.getElementById("interval")
const init_hours = document.getElementById("init-hours")
const finish_hours = document.getElementById("finish-hours")
const btn_materia = document.getElementById("btn-materia")
const btn_horario = document.getElementById("btn-horario")
const btn_agrandar = document.getElementById("agrandar")
const ventana = document.getElementById("ventana")
const errorPintar = document.getElementById("error")
const textError = document.getElementById("textError")
const btn_error = document.getElementById("cerrarError")
const btn_cerrar = document.getElementById("cerrar")
const content_calendarySolo = document.getElementById("calendario-solo")
const content_information = document.getElementById("content-information")
let time
let hours
let min
let escritura
let horary
let materias = []
let todasMaterias = []
const content_calendary = document.getElementById("calendar")
const content_ingreso = document.getElementById("ingreso")



interval.addEventListener("change",crearCalendario)
init_hours.addEventListener("change",crearCalendario)
finish_hours.addEventListener("change", crearCalendario)
btn_materia.addEventListener("click",conseguirIngresoDatosMateria)
btn_horario.addEventListener("click",conseguirIngresoDatosHorario)

btn_agrandar.addEventListener("click",() =>{
    ventana.showModal()
    crearCalendarioSolo()
})

btn_cerrar.addEventListener("click",() => {
    ventana.close()
})

function conseguirIngresoDatosMateria(){
    escritura = `
        <div class="nueva-materia">
        <label for="newMateria">Ingresa Nueva Materia:</label>
         <input type="text" name="newMateria" id="newMateria" placeholder="Matematica ...." >
         </div>
         <div>
        <button id="salir" class="btn btn-salir">Salir</button>
        <button id="agregarMateria" class="btn btn-materia">Agregar Materia</button>
        </div>
    `

    content_ingreso.innerHTML = escritura
    content_ingreso.style.display = "flex"
    let newMateria = document.getElementById("newMateria")
    let salir = document.getElementById("salir")
    salir.addEventListener("click",() =>{
        content_ingreso.style.display ="none"
    })
    let agregarMateria = document.getElementById("agregarMateria")
    agregarMateria.addEventListener("click",()=>{
        if( !materias.includes(newMateria.value) && newMateria.value != ""){
            materias.push(newMateria.value)
           todasMaterias.push(new Materias(newMateria.value))
           newMateria.value = ""

        }

    })

}

function conseguirIngresoDatosHorario(){
    escritura = `
    <div class="form-materia">
    <select id="materiasSelect">
        
    </select>
    </div>
    <div class="form-comision">
        <label for="comision">Comision: </label>
        <input type="text" name="comision" id="comision" placeholder="123-xyz o 1">
    </div>
    <div class="form-horario">
    <select id="dias">
        <option value="">Seleccione dia de la semana</option>
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miercoles">Miercoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sabado">Sabado</option>
        <option value="Domingo">Domingo</option>
    </select>
    <div >
    <label for="inicio"> Inicio <input type="time" value="08:00" name="inicio" id="inicio"></label>
    <label for="fin"> Finaliza <input type="time" value= "12:00" name="fin" id="fin"></label>
 
    </div>
    </div>
    <div>
    <button id="salir" class="btn btn-salir">Salir</button>
    <button id="agregarHorario" class="btn btn-horario">Agregar Horario</button>
    <button id="prueba" class="btn btn-prueba" title="Ejemplo de Prueba">📝</button>

    </div>
`


    content_ingreso.innerHTML = escritura
    content_ingreso.style.display = "flex"
    let materiasSelect = document.getElementById("materiasSelect")
    materiasSelect.innerHTML =""
    materiasSelect.innerHTML = `<option value="" select>Seleccione Una Materia</option>`
    
    materias.forEach((m) =>{
        escritura =`<option value="${m}">${m}</option>`
        materiasSelect.innerHTML += escritura
    })

    let salir = document.getElementById("salir")
    salir.addEventListener("click",() =>{
        content_ingreso.style.display ="none"
    })
    let agregarDatos = document.getElementById("agregarHorario")
    agregarDatos.addEventListener("click", almacenarTodosLosDatos)

    document.getElementById("prueba").addEventListener("click",() =>{
        todasMaterias = todasMaterias.concat(licenciaturaUnq)
        almacenarTodosLosDatos()
    })
   
}

function almacenarTodosLosDatos(){
    let materiasSelect = document.getElementById("materiasSelect").value
    let comisionnew = document.getElementById("comision").value
    let dianew = document.getElementById("dias").value
    let inicionew = document.getElementById("inicio").value
    let finalnew = document.getElementById("fin").value
    let entradaAlIf = false


    todasMaterias.forEach((materia) => {
        if(materia.nombre === materiasSelect){
             if(materia.comision.length === 0){
                materia.agregarComision(comisionnew)

               }

              entradaAlIf = false

                materia.comision.forEach((comision) => {

                    if(comision.id == comisionnew){
                        comision.horarios.push(
                            {
                                dia : dianew,
                                inicio : inicionew,
                                final : finalnew
                            }
                        )
                        entradaAlIf = true

                    }
                })
             if(!entradaAlIf){
                materia.agregarComision(comisionnew)
                materia.comision.forEach((comision) => {

                    if(comision.id == comisionnew){
                        comision.horarios.push(
                            {
                                dia : dianew,
                                inicio : inicionew,
                                final : finalnew
                            }
                        )
                        entradaAlIf = true

                    }
                 })
             }

         }
})
escribirLosDatos()

}

function escribirLosDatos(){
    content_information.innerHTML =""
    let colorR
    let colorG
    let colorB
    let selectComision
    todasMaterias.forEach((mate) => {
        colorR = transformarNumeroDecimalAHexadecimal(Math.floor(Math.random()*(255-16) +16)).join("")
        colorG = transformarNumeroDecimalAHexadecimal(Math.floor(Math.random()*(255-16)+16)).join("")
        colorB = transformarNumeroDecimalAHexadecimal(Math.floor(Math.random()*(255-16) +16)).join("")
        
        escritura = `
        <div class="datos">
            <div>
            <input type="color" id="color${mate.nombre}" class="color" value="#${colorR}${colorG}${colorB}">
            <span class="nombre">${mate.nombre}</span>
            <button class="btn btn-borrar borrar${mate.nombre}">Borrar</button>
            </div>
            
            <select id="${mate.nombre}" class="seleccionador">

            </select>
            
        </div>`

        content_information.innerHTML += escritura

        selectComision = document.getElementById(`${mate.nombre}`)
        selectComision.innerHTML = `<option value="" select >Seleccione Una Comision</option>`

        mate.comision.forEach((comision) =>{
            escritura = `
            <option value=${comision.id}>${comision.id}</option>
            `
            selectComision.innerHTML += escritura
        })

    })
    pintarEnLaGrilla()
    let btn_borrar = document.querySelectorAll(".btn-borrar")
    btn_borrar.forEach((bt) =>{
        bt.addEventListener("click",borrrarMateria)
    })
}

function borrrarMateria(e){
    
    let claseMateriaBorrar = e.target.classList.value
    
    let materiaBorrar = claseMateriaBorrar.replace("btn btn-borrar borrar","")
    
    todasMaterias = todasMaterias.filter((mat)=> mat.nombre != materiaBorrar)
    
    materias = materias.filter((mat)=> mat != materiaBorrar)
    
    conseguirIngresoDatosHorario()
    escribirLosDatos()
}

function pintarEnLaGrilla(){
    let inputsColors = document.querySelectorAll(".color")
    inputsColors.forEach((color) =>{
       
        color.addEventListener("input",pintarEnLaGrilla)
    })
    let seleccionador = document.querySelectorAll(".seleccionador")
    seleccionador.forEach((seleccion) =>{
        seleccion.addEventListener("change",pintarEnLaGrilla)
    })

    let divsColors = document.querySelectorAll(".divColor")
    divsColors.forEach((div)=>{
        div.style.background ="white"
    })
    todasMaterias.forEach((mate)=>{
         let comisionSeleccionada = document.getElementById(`${mate.nombre}`)
         let colorSeleccionado = document.getElementById(`color${mate.nombre}`)

         mate.comision.forEach((comi) =>{

            if(comi.id == comisionSeleccionada.value){

                comi.horarios.forEach((horario)=>{


                    let horarioPintar = horario.inicio
                    let finish = horario.final
                    let repintadas = 0
                    while(horarioPintar < finish){ // cambiar la condicion del while, porque genera posibilidades de bucle infinito
                        let divPintar =  document.getElementsByClassName(`${horarioPintar} ${horario.dia}`)
                        

                        Array.from(divPintar).forEach((pinta)=>{
                            if(pinta.style.background == "white"){
                            pinta.style.background =`${colorSeleccionado.value}`
                            pinta.title = `${mate.nombre}`
                            }else{
                                pinta.style.background =`${colorSeleccionado.value}`
                                pinta.title = `${mate.nombre}`
                                repintadas++
                                
                            }
                          
                        })
                        
                        horarioPintar = sumarHrs(horarioPintar, interval.value)

                    }
                    if(repintadas != 0){
                        textError.innerHTML = `La franja horario de la comision <em>${comi.id}</em> de la materia <em>${mate.nombre}</em>, ya estaba pintada anteriormente, se sobrepintara la misma, en caso de no desearlo cambie la seleccion de comision`
                        errorPintar.showModal()
                        btn_error.addEventListener("click",() =>{
                            errorPintar.close()
                        })

                    }


                })
            }
         })


    })

   
}

function sumarHrs(horas, adicion){
    let hrs = parseInt(horas.split(":")[0])
    let min = parseInt(horas.split(":")[1])
    let suma = parseInt(adicion)

    if(suma+min >59){
        hrs++
        min = (suma+min) - 60

    }else{
        min = suma + min
    }

    let horasstring = ""
    let minstring = ""
    hrs <10 ? horasstring = "0"+ hrs : horasstring = hrs+""
    min <10 ? minstring = "0"+ min : minstring =  min+""

    return(horasstring +":"+ minstring)

}

function crearCalendario(){
    horary = crearArrayHorario()

    content_calendary.innerHTML =""
    dayOfWeek.forEach((day) => {
        escritura = `<div class="${day[1]} firstRow divCalendar" title="${day[1]}">${day[0]}</div>`
        content_calendary.innerHTML += escritura
    })
   horary.forEach((horar) =>{
    escritura = `<div class="${horar} firstColumn divCalendar">${horar}</div>
                <div class="${horar} ${dayOfWeek[1][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[2][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[3][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[4][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[5][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[6][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[7][1]} divCalendar divColor"> </div>
    `
    content_calendary.innerHTML += escritura
   })
   pintarEnLaGrilla()

}

function crearCalendarioSolo(){
    horary = crearArrayHorario()

    content_calendarySolo.innerHTML =""
    dayOfWeek.forEach((day) => {
        escritura = `<div class="${day[0]} firstRow divCalendar" title="${day[1]}">${day[0]}</div>`
         content_calendarySolo.innerHTML += escritura
     })
   horary.forEach((horar) =>{
    escritura = `<div class="${horar} firstColumn divCalendar">${horar}</div>
                <div class="${horar} ${dayOfWeek[1][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[2][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[3][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[4][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[5][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[6][1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[7][1]} divCalendar divColor"> </div>
    `
   content_calendarySolo.innerHTML += escritura
   })
    pintarEnLaGrilla()

    let divsColors = ventana.querySelectorAll(".divColor")
    divsColors.forEach((div)=>{
        div.innerText = div.title
    })

 }

function crearArrayHorario(){
   let parcialInterval = parseInt(interval.value)
    let finishtime = finish_hours.value.split(":")
    time = init_hours.value.split(":")
    hours = parseInt(time[0])
    min = parseInt(time[1])

    let parcial_horary = []
    let horasstring = ""
    let minstring = ""


    while( hours < parseInt(finishtime[0])+1){
        horasstring = ""
         minstring = ""
         hours <10 ? horasstring = "0"+ hours : horasstring = hours+""
         min <10 ? minstring = "0"+ min : minstring =  min+""

         parcial_horary.push(`${horasstring}:${minstring}`)
        if(parcialInterval+min >59){
            hours++
            min = (parcialInterval+min) - 60

        }else{
            min = parcialInterval + min
        }



    }
   return parcial_horary
}

function transformarNumeroDecimalAHexadecimal(numero){
    const valoresHexadecimales ={
        10 : "A",
        11 : "B",
        12 : "C",
        13 : "D",
        14 : "E",
        15 : "F"
    }

    let valor = []
    let valorAgregar = 0
   while(numero >= 16){
    valorAgregar = Math.floor(numero%16)
    valorAgregar >= 10 ? valorAgregar = valoresHexadecimales[valorAgregar]: valorAgregar = valorAgregar
    valor.unshift(valorAgregar)
    numero = numero/16
   }

   numero >= 10 ? numero = valoresHexadecimales[Math.floor(numero)]: numero = Math.floor(numero)
   valor.unshift(numero)

    return(valor)
}


window.addEventListener("load",crearCalendario)

