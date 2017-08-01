let socket = io.connect("http://localhost:8080",{'forceNew':true});

//el cliente escucha el mensaje del servidor
socket.on('mensaje', (datos) => {
  console.log(datos);
  render(datos);
});

//preparando los mensajes para agregarlos a la caja de mensajeria
function render(datos){
  let html = datos.map( (elemento) =>
    {return `<div>${elemento.author}: ${elemento.text}</div>`}
  ).join(" ");
  console.log(html);
  document.getElementById("mensajeria").innerHTML = html;
}

//Accion del boton enviar
let btnEnviar = document.getElementById("btnEnviar");
let nombre = document.getElementById("nombre");
let texto = document.getElementById("texto");
btnEnviar.addEventListener("click", (e) =>{

  //validando que tengo un usuario
  if(nombre.value !=""){
    //validando que sea primera vez que ingresa el usuario
    if(nombre.getAttribute('estado') == "activo"){
      //confirmar el usuario
      if(confirm("El nombre de usuario elegido no se podra cambiar, esta de acuerdo con su Nombre de Usuario?")){
        nombre.setAttribute('readonly','');
        nombre.setAttribute('estado','descativado');
      }else{
        //alert("no se mando el mensaje");
        nombre.focus();
        return false;
      }
    }
  }else{
    alert("Debe de ingresa un usuario para usar el chat!\nPorfavor ingrese su usuario.");
    nombre.focus();
    return false;
  }
  //preparando los datos para mandarlos al servidor
  let valores =
  {
      author :nombre.value ,
      text : texto.value
  };
  texto.value = "";
  texto.focus();
  //el cliente emite el mensaje al servidor
  socket.emit('newMensaje', valores);
});
