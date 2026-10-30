import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Blobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import { _layout } from "blobatar";
import { idle, sleepy } from "blobatar/expression";

// Sin nombre no hay nadie a quien dibujar: un blob gris y dormido espera al primer carácter.
const ASLEEP = { bg: "#f4f3ef", head: "#dddcd5", eye: "#8e8d85" };

export function App() {
  const [value, setValue] = useState("");
  const name = value.trim();
  const awake = name !== "";

  // La página viste los colores del propio blobatar.
  const colors = useMemo(() => (awake ? _layout(name).palette : ASLEEP), [awake, name]);

  const { ref } = useGaze({ travel: 3, lookAt: awake ? "pointer" : "rest" });
  const stage = useRef<HTMLDivElement>(null);
  const previous = useRef(name);

  // Pequeño rebote cada vez que el nombre da lugar a otra criatura.
  useEffect(() => {
    if (previous.current === name) return;
    previous.current = name;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stage.current?.animate(
      [{ transform: "scale(0.94)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
      { duration: 280, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    );
  }, [name]);

  return (
    <main
      className="page"
      style={{ "--bg": colors.bg, "--head": colors.head } as CSSProperties}
    >
      <header className="brand">
        <Blobatar name="blobatar" size={28} alt="" />
        blobatar
      </header>

      <div className="studio">
        <div className="stage" ref={stage}>
          <Blobatar
            ref={ref}
            name={name}
            animate="always"
            palette={awake ? undefined : ASLEEP}
            expression={awake ? idle : sleepy}
            title={awake ? `Blobatar de ${name}` : "Blobatar dormido"}
          />
        </div>

        <input
          className="name"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Escribe un nombre…"
          aria-label="Nombre del blobatar"
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />

        <p className="hint">El mismo nombre siempre da el mismo blobatar.</p>
      </div>
    </main>
  );
}
