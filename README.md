# Blobatar Playground

**[Live demo](https://ander-ortiz-blobatar.netlify.app/)**

Página con un único input: escribes un nombre y se dibuja su avatar al momento. Está hecha con React y [blobatar](https://github.com/Alain00/blobatar).

## Instalación

Necesitas Node.js `^20.19.0` o `>=22.12.0`, y npm.

Clona el [repositorio](https://github.com/AnderOrtiz/blobatar), instala las dependencias y arranca el servidor de desarrollo:

```sh
git clone https://github.com/AnderOrtiz/blobatar.git
cd blobatar
npm install
npm run dev
```

Abre la URL que aparece en la terminal, normalmente <http://localhost:5173>.

| Comando           | Qué hace                                                   |
| ----------------- | ---------------------------------------------------------- |
| `npm run dev`     | Arranca el servidor de desarrollo.                         |
| `npm run build`   | Comprueba los tipos y genera la versión final en `dist/`.  |
| `npm run preview` | Sirve `dist/` en local. Ejecuta antes `npm run build`.     |

## Cómo funciona

### Del nombre al avatar

El texto del input se guarda en el estado de `App` y, sin espacios al principio ni al final, se pasa como `name` al componente `<Blobatar>`. Cada pulsación vuelve a renderizar el avatar, sin botón ni espera.

blobatar calcula el avatar a partir del nombre, sin peticiones de red ni imágenes guardadas. El mismo nombre siempre da el mismo avatar dentro de una versión mayor de la librería. Además, ignora mayúsculas y espacios en los extremos, así que `Ana` y ` ana ` dan el mismo resultado.

### Estados de la página

- **Sin nombre:** si el input está vacío o solo tiene espacios, se muestra un blob gris con la expresión `sleepy` y los ojos quietos.
- **Con nombre:** el blob usa su propia forma y sus colores, con la expresión `idle`. Da un pequeño rebote cada vez que cambia el nombre, salvo si el sistema tiene activado reducir el movimiento.

### Animación y ojos

El avatar usa `animate="always"`, que lo dibuja como SVG dentro de la página para poder animarlo con CSS. Por eso `src/main.tsx` importa `blobatar/motion.css`.

Los ojos siguen al cursor con el hook `useGaze`, que necesita `blobatar/gaze.css`. Solo funciona en dispositivos con un puntero preciso, como un ratón, y se desactiva si el sistema tiene activado reducir el movimiento.

### Colores

`App` obtiene la paleta del avatar con `_layout(name).palette` y pasa dos colores a la página como variables CSS:

- `--bg`: el fondo de la página.
- `--head`: el color base del anillo del input.

`_layout` es una función semi-interna de blobatar, así que conviene revisarla al actualizar a una nueva versión mayor.

### Diseño responsive

Todo está en `src/styles.css`:

- **Tamaños:** el avatar, el input y su texto se adaptan con `clamp()` y `min()` al ancho y al alto de la pantalla.
- **Poca altura (hasta 480 px):** se oculta la frase bajo el input.
- **Poca altura y al menos 520 px de ancho:** el avatar y el input se colocan uno al lado del otro, como en un móvil en horizontal.

### Estructura

```text
index.html        Página base y favicon
public/
  favicon.svg     Icono generado con blobatar
src/
  main.tsx        Monta React y carga los estilos
  App.tsx         Input, avatar y colores de la página
  styles.css      Estilos y reglas responsive
```
