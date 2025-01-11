document.addEventListener("DOMContentLoaded", function () {

    // Elementos del carrusel
    const track = document.querySelector('.carousel-track');
    const items = [...document.querySelectorAll('.carousel-item')];
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let index = 0;
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth + 20; // Ancho más margen

    // Inicializar posición
    track.style.transform = `translateX(0px)`;

    // Función de movimiento
    function moveSlide(direction) {
        index += direction;

        // Validar límites para crear el efecto infinito
        if (index < 0) {
            index = totalItems - 1;
        } else if (index >= totalItems) {
            index = 0;
        }

        track.style.transition = `transform 0.5s ease-in-out`;
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    // Botones de navegación
    prevBtn.addEventListener('click', () => moveSlide(-1));
    nextBtn.addEventListener('click', () => moveSlide(1));

    // Desplazamiento automático (12 segundos)
    const autoScroll = () => {
        setInterval(() => {
            moveSlide(1);
        }, 12000); // 12,000 ms = 12 segundos
    };
    autoScroll();

    // Preselección del lugar y desplazamiento al formulario de reserva
    const reserveButtons = document.querySelectorAll('.carousel-item button');
    reserveButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const place = this.parentElement.getAttribute('data-place'); // Obtener el lugar del atributo

            // Preseleccionar el lugar en el formulario
            const placeSelect = document.getElementById('place');
            [...placeSelect.options].forEach((option) => {
                if (option.value === place) {
                    option.selected = true;
                }
            });

            // Desplazar la página al formulario de contacto
            document.getElementById('contacto').scrollIntoView({
                behavior: 'smooth',
            });
        });
    });

    // Validar formulario y enlace de WhatsApp
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const formFields = ["name", "lastName", "email", "phone", "date", "place"];
        let isValid = formFields.every((field) => document.getElementById(field).value.trim() !== "");

        if (!isValid) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const name = document.getElementById("name").value;
        const lastName = document.getElementById("lastName").value;
        const place = document.getElementById("place").value;
        const date = document.getElementById("date").value;

        const whatsappUrl = `https://wa.me/970848295?text=Hola Sr. Frank, soy ${name} ${lastName}, estoy interesado en un viaje a ${place} el ${date}.`;
        window.open(whatsappUrl, "_blank");
    });

    // Funcionalidad adicional para el menú de hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("hidden");
        menu.classList.toggle("flex");
    });

    // Cerrar el menú cuando se selecciona una sección
    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add("hidden");
            menu.classList.remove("flex");
        });
    });
});

window.addEventListener("load", function () {
    // Solo desplázate al inicio si no hay un hash en la URL
    if (window.location.hash && document.getElementById(window.location.hash.substring(1))) {
        // Si hay un hash, desplazarse a ese punto
        document.getElementById(window.location.hash.substring(1)).scrollIntoView({
            behavior: "smooth" // Opcional: para un desplazamiento suave
        });
    } else {
        // Si no hay un hash, desplazar al inicio de la página
        window.scrollTo(0, 0);
    }
});