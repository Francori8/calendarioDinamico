
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


const dayOfWeek =["°", "Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]

const interval = document.getElementById("interval")
const init_hours = document.getElementById("init-hours")
const finish_hours = document.getElementById("finish-hours")
const btn_materia = document.getElementById("btn-materia")
const btn_horario = document.getElementById("btn-horario")
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


function conseguirIngresoDatosMateria(){
    escritura = `
        <label>Ingresa Nueva Materia <input type="text" id="newMateria" >
        <button id="salir">Salir</button>
        <button id="agregarMateria">Agregar Materia</button>
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
        if( !materias.includes(newMateria.value)){
            materias.push(newMateria.value)
           todasMaterias.push(new Materias(newMateria.value))
        
        }
        
    })
    
}

function conseguirIngresoDatosHorario(){
    escritura = `
    <div>
    <select id="materiasSelect">
        <option value="" select>Seleccione Una Materia</option>   
    </select>
    </div>
    <div>
        <label for="comision">Comision: <input type="text" name="comision" id="comision"></label>
    </div>
    <div>
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
    <div>
    <label for="inicio"> Inicio <input type="time" value="08:00" name="inicio" id="inicio"></label>
    <label for="fin"> Finaliza <input type="time" value= "12:00" name="fin" id="fin"></label>
    
    </div>
    </div>

    <button id="salir">Salir</button>
    <button id="agregarHorario">Agregar Horario</button>
`

   
    content_ingreso.innerHTML = escritura
    content_ingreso.style.display = "flex"
    let materiasSelect = document.getElementById("materiasSelect")
    
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
        colorR = transformarNumeroDecimalAHexadecimal(Math.floor(Math.random()*255)).join("")
        colorG = transformarNumeroDecimalAHexadecimal(Math.floor(Math.random()*255)).join("")
        colorB = transformarNumeroDecimalAHexadecimal(Math.floor(Math.random()*255)).join("")
        console.log(colorB,colorG,colorR)
        escritura = ` 
        <div>
            <input type="color" id="color${mate.nombre}" class="color" value="#${colorR}${colorG}${colorB}">
            <span>${mate.nombre}</span>
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
   
} 

function pintarEnLaGrilla(){
    let inputsColors = document.querySelectorAll(".color")
    inputsColors.forEach((color) =>{
        console.log(color)
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
                    
                    while(horarioPintar != finish){
                        let divPintar =  document.getElementsByClassName(`${horarioPintar} ${horario.dia}`)

                        divPintar[0].style.background =`${colorSeleccionado.value}`
                        horarioPintar = sumarHrs(horarioPintar, interval.value)
                        
                    }
                    
                    
                })
            }
         })
         
        
    })
    
    
}

function sumarHrs(horas, adicion ){
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
        escritura = `<div class="${day} firstRow divCalendar">${day}</div>`
        content_calendary.innerHTML += escritura
    })
   horary.forEach((horar) =>{
    escritura = `<div class="${horar} firstColumn divCalendar">${horar}</div>
                <div class="${horar} ${dayOfWeek[1]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[2]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[3]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[4]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[5]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[6]} divCalendar divColor"> </div>
                <div class="${horar} ${dayOfWeek[7]} divCalendar divColor"> </div>
    `
    content_calendary.innerHTML += escritura
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
   while(numero > 16){
    valorAgregar = Math.floor(numero%16) 
    valorAgregar >= 10 ? valorAgregar = valoresHexadecimales[valorAgregar]: valorAgregar = valorAgregar
    valor.unshift(valorAgregar)
    numero = numero/16
   }
   
   numero >= 10 ? numero = valoresHexadecimales[Math.floor(numero)]: numero = Math.floor(numero)
   valor.unshift(numero)
    
    return(valor)
}


window.addEventListener(onload,crearCalendario())

