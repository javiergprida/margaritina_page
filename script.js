// =========================================================
// BASE DE DATOS DE MENSAJES REFLEXIVOS (Formato JSON)
// Puedes agregar, modificar o eliminar los mensajes de aquí
// =========================================================
const dataMensajes = {
    "mensajes": [
        "Tu bienestar es tu mejor inversión.",
        "Dedícate un momento, te lo mereces.",
        "La paz interior refleja tu belleza exterior.",
        "Respira profundo, tu viaje de calma comienza aquí.",
        "El autocuidado no es un lujo, es una necesidad.",
        "Tu cuerpo es tu refugio, cuídalo con amor.",
        "Desconecta para volver a conectar contigo misma."
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE MENSAJES DINÁMICOS ---
    const msgElement = document.getElementById('reflective-message');
    const mensajesArray = dataMensajes.mensajes;
    
    function cambiarMensaje() {
        // Desvanecer el mensaje actual
        msgElement.style.opacity = 0;
        
        // Esperar a que se desvanezca para cambiar el texto
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * mensajesArray.length);
            msgElement.innerText = `"${mensajesArray[randomIndex]}"`;
            // Aparecer el nuevo mensaje
            msgElement.style.opacity = 1;
        }, 1000); 
    }

    // Cambiar inmediatamente al cargar la página
    cambiarMensaje();
    // Programar el cambio cada 30 minutos (30 * 60 * 1000 milisegundos)
    setInterval(cambiarMensaje, 1800000);


    // --- ANIMACIONES FADE-IN (Intersection Observer) ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- LÓGICA DEL MODAL Y WHATSAPP ---
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-btn');
    const serviceSelection = document.getElementById('serviceSelection');
    const modalTitle = document.getElementById('modalTitle');
    
    // Variables para la selección de servicios
    let selectedSpecificService = null;
    let selectedServicesArray = []; 
    const serviceDropdown = document.getElementById('serviceDropdown');
    const tagsContainer = document.getElementById('selectedServicesTags');

    // 1. Botones Generales (Navbar, Hero, Footer)
    document.querySelectorAll('.btn-general').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedSpecificService = null; 
            serviceSelection.style.display = "block"; 
            modalTitle.innerText = "Agenda tu Cita";
            modal.style.display = "flex";
            renderTags(); // Asegurarse de mostrar los tags si ya había
        });
    });

    // 2. Botones de Servicios Específicos (Tarjetas de Experiencias)
    document.querySelectorAll('.btn-service').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedSpecificService = btn.getAttribute('data-service');
            serviceSelection.style.display = "none"; 
            modalTitle.innerText = `Agendar: ${selectedSpecificService}`;
            modal.style.display = "flex";
        });
    });

    // 3. Lógica del Desplegable Múltiple (Crear Etiquetas/Tags)
    serviceDropdown.addEventListener('change', (e) => {
        const val = e.target.value;
        // Si seleccionó algo y no está ya en la lista, lo agregamos
        if(val && !selectedServicesArray.includes(val)) {
            selectedServicesArray.push(val);
            renderTags();
        }
        // Reiniciamos el select al valor por defecto
        serviceDropdown.value = ""; 
    });

    function renderTags() {
        tagsContainer.innerHTML = ''; // Limpiar contenedor
        selectedServicesArray.forEach(serv => {
            const tag = document.createElement('div');
            tag.className = 'service-tag';
            tag.innerHTML = `${serv} <span data-val="${serv}">&times;</span>`;
            tagsContainer.appendChild(tag);
        });

        // Añadir evento a las 'X' para eliminar el servicio
        document.querySelectorAll('.service-tag span').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const valToRemove = e.target.getAttribute('data-val');
                selectedServicesArray = selectedServicesArray.filter(item => item !== valToRemove);
                renderTags();
            });
        });
    }

    // Cerrar modal
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

    // 4. Procesar y Enviar a WhatsApp
    document.getElementById('sendWhatsapp').addEventListener('click', () => {
        const name = document.getElementById('userName').value.trim();
        
        if (!name) {
            alert("Por favor, indícanos tu nombre para continuar.");
            return;
        }

        let mensajeText = "";

        if (selectedSpecificService) {
            // Viene de un botón dentro de las tarjetas
            mensajeText = `Hola Margaritina, soy ${name}. Me gustaría agendar un turno para el servicio de ${selectedSpecificService}.`;
        } else {
            // Viene del botón general (Array de servicios)
            if (selectedServicesArray.length === 0) {
                alert("Por favor, selecciona al menos un servicio de la lista.");
                return;
            }
            const serviciosUnidos = selectedServicesArray.join(", ");
            mensajeText = `Hola Margaritina, soy ${name}. Me gustaría reservar una cita para los siguientes servicios: ${serviciosUnidos}.`;
        }

        const encodedText = encodeURIComponent(mensajeText);
        const waUrl = `https://wa.me/5491123585000?text=${encodedText}`;
        window.open(waUrl, '_blank');
        
        // Limpiar campos y cerrar modal
        document.getElementById('userName').value = '';
        selectedServicesArray = []; // Vaciar array de servicios
        renderTags(); 
        modal.style.display = "none";
    });
});