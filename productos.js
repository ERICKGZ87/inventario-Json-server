import {NuevoCliente,ObtenerProductos,EditarArticulo,EliminararticulosApi} from "./api.js"
import {mensajes} from "./funciones.js"

(function () {
  //variables

  const formulario = document.querySelector("#form");
  const nombre = document.querySelector("#nombre");
  const cantidad = document.querySelector("#cantidad");
  const stockminimo = document.querySelector("#stock-minimo");
  const categoria = document.querySelector("#categoria");
  const listaProductos = document.querySelector(".table tbody");
  const BtnEditar=document.querySelector("#btn-editar");
  let id;

  BtnEditar.addEventListener("click",Editaritem)

  formulario.addEventListener("submit", ValidadarProducto);
  document.addEventListener("DOMContentLoaded", CargarProductos);
  
  document.addEventListener("DOMContentLoaded", ()=>{

    const parametrosUrl= new URLSearchParams(window.location.search);
    id=parseInt(parametrosUrl.get("id"));
  
    if(id){
      CargarEdicion(id);
    }
  });

  listaProductos.addEventListener("click", EliminarProducto);



  function ValidadarProducto(e) {
    e.preventDefault();

    const Campos = [
      nombre.value,
      cantidad.value,
      stockminimo.value,
      categoria.value,
    ].every((campo) => campo !== "");

    if (Campos) {
      const articulo = {
        nombre: nombre.value,
        cantidad: parseInt(cantidad.value),
        stockminimo: parseInt(stockminimo.value),
        categoria: categoria.value,
      };
   
      NuevoCliente(articulo)

      mensajes("Exito","Articulo agregado correctamente","success");
    } else {

      mensajes("Error","Todos los campos son obligatorios","error");
    }
  }

async function CargarProductos () {

  const articulos=await ObtenerProductos()
 
  articulos.forEach(articulo => {

    const {nombre,cantidad,stockminimo,categoria,id}=articulo

const fila=document.createElement("tr")
fila.innerHTML=`<td>${nombre}</td>
<td>${cantidad}</td>
<td>${stockminimo}</td>
<td>${categoria}</td>
<td><a href="index.html?id=${id}">Editar</a> <a href="#" class="btn-eliminar mx-2 eliminar" data-id="${id}">Eliminar</a></td>

`
listaProductos.appendChild(fila)
  })

}

  async function CargarEdicion(id) {

    const articulos=await ObtenerProductos()

    const articulo=articulos.find(articulo=>articulo.id===id)

    nombre.value=articulo.nombre
    cantidad.value=articulo.cantidad
    stockminimo.value=articulo.stockminimo
    categoria.value=articulo.categoria

document.querySelector("#btn-guardar").disabled=true;
document.querySelector("#btn-editar").disabled=false

    
  }

function Editaritem(){

  const Campos = [
    nombre.value,
    cantidad.value,
    stockminimo.value,
    categoria.value,
  ].every((campo) => campo !== "");

  if (Campos) {
 

    const articuloEditado = {
      id:id,
      nombre: nombre.value,
      cantidad: parseInt(cantidad.value),
      stockminimo: parseInt(stockminimo.value),
      categoria: categoria.value,
    };
 
    EditarArticulo(articuloEditado)

    //window.location.href="index.html"

    mensajes("operacion exitosa","has editado un registro","success")

  } else {

    mensajes("alerta","todos los campos son obligatorios","error")
  }
}

function EliminarProducto(e) {

  const IdBorrar=parseInt(e.target.dataset.id)

  if(e.target.classList.contains("eliminar")){

    EliminararticulosApi(IdBorrar)

mensajes("operacion exitosa","has eliminado un registro","success")
  }





  
}

})();
