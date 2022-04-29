import {useState, useEffect} from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setAlta(paciente.alta)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () =>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    //Validacion de formulario
    if([nombre, propietario, email, alta, sintomas].includes('')){
      console.log('Hay al menos 1 campo vacio');

      setError(true);
      return;
    }

    setError(false);

    //Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    if(paciente.id){
        //Editando el registro
        objetoPaciente.id = paciente.id;
        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState )

        setPacientes(pacientesActualizados)
        //Limpiar la memoria al ya haber editado un paciente
        setPaciente({})
    }else{
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    //Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-back text-3xl text-center">Seguimiento pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">
          Administralos
        </span>
      </p>
      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            onSubmit={handleSubmit}>
          {error && <Error><p>Todos los campos son obligatorios</p></Error>}
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
              Nombre Mascota:
            </label>
            <input
              id="mascota"
              type="text" 
              placeholder="Nombre de la mascota" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-600 outline-none rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
              Nombre Propietario:
            </label>
            <input
              id="propietario"
              type="text" 
              placeholder="Nombre del propietario" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-600 outline-none rounded-md"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
              Email:
            </label>
            <input
              id="email"
              type="email" 
              placeholder="Nombre del propietario" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-600 outline-none rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
              Alta:
            </label>
            <input
              id="alta"
              type="date" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-600 outline-none rounded-md"
              value={alta}
              onChange={(e) => setAlta(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
              Sintomas:
            </label>
            <textarea
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-600 outline-none rounded-md"
              placeholder="Describe los sintomas"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
              />
          </div>
          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                      hover:bg-indigo-700 cursor-pointer transition-all rounded-md
                        "
            value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}/>
      </form>
    </div>
  )
}

export default Formulario;

