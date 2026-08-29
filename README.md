# Centro Margaritina - Web Landing Page

Portal web estático para el centro de cuidado personal y estética "Margaritina". Diseñado con un enfoque minimalista, formas orgánicas y una experiencia de usuario fluida, pensada para transmitir bienestar y relajación.

## 🎨 Paleta de Colores e Identidad Visual
El diseño utiliza tonos tierra, cálidos y naturales para reflejar la esencia de los tratamientos estéticos y el cuidado personal.

*   **Color de Fondo (Hueso):** `#F9F8F6` — Utilizado para el fondo general, aportando luminosidad sin la estridencia del blanco puro.
*   **Texto y Contraste (Verde Oscuro/Grisáceo):** `#3B4A40` — Aplicado en tipografías y el footer para un contraste elegante y legible.
*   **Acento y CTAs (Terracota):** `#BC7A6B` — Define los botones principales (Call to Action) y etiquetas interactivas.
*   **Aros Decorativos (Dorado):** `#D4AF37` — Enmarca sutilmente las fotografías de los servicios.
*   **Tarjetas de Servicios:**
    *   Verde Salvia (Mirada y Rostro): `#a5b49f`
    *   Arcilla (Manos y Pies): `#c28c80`
    *   Beige Suave (CTA Final): `#EBE8E1`

## 💅 Características Principales
* **Diseño Orgánico y Responsivo:** Uso avanzado de CSS para crear formas asimétricas (`blob masks`) y tarjetas de servicios dinámicas.
* **Navegación Optimizada:** Menú `sticky` con efecto *backdrop-filter* (desenfoque) y un logo central flotante desvinculado del flujo normal para mayor protagonismo.
* **Sistema de Selección (UI):** Modal interactivo construido en Vanilla JavaScript para la selección y etiquetado de tratamientos (Mirada, Manos y Pies, Bienestar Corporal, Depilación).
* **Estética y Calidad Visual:** Diseño enfocado en la calidez y lo artesanal (Anti-AI Look), apoyado en tipografía Serif (Lora).

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructura semántica y accesibilidad.
* **CSS3:** Variables globales (`:root`), Flexbox, Grid, transiciones suaves y manipulación geométrica avanzada (`border-radius`).
* **JavaScript (Vanilla):** Lógica del lado del cliente para manejo del DOM, modales y etiquetas.


Estructura del Proyecto
Plaintext
/
├── index.html        # Estructura principal y contenido
├── style.css         # Estilos globales y diseño asimétrico
├── script.js         # Lógica de interacciones
├── /img              # Recursos gráficos (Logos, fondos, fotos de servicios)
└── .gitignore        # Reglas de exclusión para documentación interna

Notas de Arquitectura y Seguridad
Superficie de Ataque Reducida: Arquitectura Client-Side sin conexión directa a base de datos en esta fase inicial.

Despliegue Recomendado: Alojamiento en plataformas estáticas o CDN (como Hostinger, Vercel o Netlify) emparejado con un pipeline automatizado desde la rama principal.

Manejo de Datos Sensibles: Los datos de contacto críticos se gestionan mediante el entorno de despliegue, protegiendo la integridad del frontend frente a modificaciones de terceros.