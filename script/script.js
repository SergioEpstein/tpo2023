console.log ("jjja")
const formulario = document.getElementById('formulario');

const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	asunto: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
	mensaje: /^[a-zA-ZÀ-ÿ\s]{4,40}$/
}

const campos = {
	nombre: false,
	correo: false,
	telefono: false,
	asunto: false,
	mensaje: false
}

const validarFormulario = (e) => {
	console.log (e)
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "asunto":
			validarCampo(expresiones.asunto, e.target, 'asunto');
		break;
		case "mensaje":
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
		break;


	}
}

const validarCampo = (expresion, input, campo) => {
	console.log(expresion, input, campo)
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	console.log("forEach")
	console.log(input)
	
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if( campos.nombre && campos.correo && campos.telefono && campos.asunto && campos.mensaje ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

function mejoresalumnos() {

	fetch('https://randomuser.me/api')
		.then(res => res.json())
		.then(res => {
			console.log(res)
			console.log(res.results[0].picture.large)
			var image = document.getElementById("foto");
			console.log(image)
			image.src =  res.results[0].picture.large
			console.log(image)
			image.width = 200
			
			document.getElementById("alumno").innerText = res.results[0].name.last + ", " + res.results[0].name.first
			document.getElementById("alumnoEmail").innerText = res.results[0].email

		})
		.catch(error => console.log("Ocurrió un error", error)) // si hay un error será atrapado por catch
	}
