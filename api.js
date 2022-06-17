

export const url="http://localhost:4000/Productos"

export const NuevoCliente = async(cliente) => {

try{
    const respuesta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(cliente),
        headers:{   'Content-Type':'application/json'}
       })
  
}catch(error){
    console.log(error)
}



}

export const ObtenerProductos = async() => {
try{

    const Resultado= await fetch(url);
    const productos= await Resultado.json();
    return productos;

}catch(error){
    console.log(error)
}


}

export const EditarArticulo= async(articuloModificado) => {

    try{

        const resultado = await fetch(`${url}/${articuloModificado.id}`,{
            method:"PUT",
            body:JSON.stringify(articuloModificado),
            headers:{   'Content-Type':'application/json'}

         })
       

    }catch(error){
        console.log(error)
    }

  
   

}

export const EliminararticulosApi= async(id) => {

    try{

        const resultado = await fetch(`${url}/${id}`,{
            method:"DELETE",
            headers:{   'Content-Type':'application/json'}  

        })


    }catch(error){
        console.log(error)
    }

        
}