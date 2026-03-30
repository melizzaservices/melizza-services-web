/* Manejo de Scroll Suave para anclas */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* Control de Modal CRO */
function openModal() {
    document.getElementById('bookingModal').classList.add('active');
    document.getElementById('modalName').focus(); // Foco en el primer input por accesibilidad
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('active');
}

// Cierra el modal si se clickea fuera del recuadro
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) closeModal();
}

function submitBooking(e) {
    e.preventDefault();
    /* Aquí se integraría la llamada a la API o envío de correo */
    alert('Solicitud enviada con éxito. Nuestro equipo en La Rochelle le contactará pronto.');
    closeModal();
}

/* Animación de conteo para estadísticas (Stats) */
const stats = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const step = Math.ceil(target / (duration / 16));
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if(current >= target) {
                    entry.target.innerText = target;
                    clearInterval(timer);
                } else {
                    entry.target.innerText = current;
                }
            }, 16);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
stats.forEach(stat => statObserver.observe(stat));
