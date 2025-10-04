// "use client";

// import {useMemo, useState} from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Link, useRouter } from "@/i18n/navigation";

// type Article = {
//   title: string;
//   value: string;           // "privacy" | "terms" | "about" ...
//   link: string;            // slug final si lo usas luego
//   triggerContent: string[];// subitems (solo texto por ahora)
// };

// export function DocsSidebar({
//   triggers,
//   current,                  // <- pásame params.slug desde la página
// }: {
//   triggers: Article[];
//   current?: string;
// }) {
//   const router = useRouter();

//   // valor abierto por defecto: el actual o el primero
//   const initialOpen = useMemo(
//     () => (current && triggers.some(a => a.link === current) ? current : triggers[0]?.link),
//     [triggers, current]
//   );

//   // estado de item abierto
//   const [open, setOpen] = useState<string | undefined>(initialOpen);

//   // estado de orden visual (el abierto/seleccionado arriba)
//   const reorder = (list: Article[], value: string) => {
//     const idx = list.findIndex(a => a.link === value);
//     if (idx <= 0) return list;
//     const item = list[idx];
//     return [item, ...list.slice(0, idx), ...list.slice(idx + 1)];
//   };

//   const [ordered, setOrdered] = useState<Article[]>(() =>
//     initialOpen ? reorder(triggers, initialOpen) : triggers
//   );

//   // manejar selección: reordena, abre y navega
//   const selectAndNavigate = (e: React.MouseEvent, value: string) => {
//     // permite abrir nueva pestaña con Ctrl/Cmd
//     if (e.metaKey || e.ctrlKey) return;
//     e.preventDefault();

//     setOpen(value);
//     setOrdered(prev => reorder(prev, value));

//     router.push(`/docs/${value}`);
//   };

//   return (
//     <Accordion
//       type="single"
//       collapsible
//       value={open}
//       onValueChange={(val) => setOpen(val ?? undefined)}
//       className="w-full text-neutral-300"
//     >
//       {ordered.map((item) => (
//         <AccordionItem value={item.link} key={item.value}>
//           {/* ⬇️ Mantenemos tu Link envolviendo al Trigger */}
//           <Link
//             href={`/docs/${item.link}`}
//             className="hover:text-white"
//             onClick={(e) => selectAndNavigate(e, item.link)}
//           >
//             <AccordionTrigger className="text-md font-semibold">
//               {item.title}
//             </AccordionTrigger>
//           </Link>

//           <AccordionContent className="flex flex-col space-y-2 pl-3">
//             {item.triggerContent.map((text, i) => (
//               <Link
//                 key={i}
//                 href={`/docs/${item.value}`}
//                 className="hover:text-white"
//                 onClick={(e) => selectAndNavigate(e, item.value)}
//               >
//                 {text}
//               </Link>
//             ))}
//           </AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }


"use client";

import {useMemo, useState} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

type TriggerEntry = string | { text: string; target?: string; hash?: string };

type Article = {
  title: string;
  value: string;           // "privacy" | "terms" | "about"
  link: string;            // "privacy-policy" | ...
  triggerContent: TriggerEntry[]; // string[] o {text, hash}[]
};

function entryToTarget(entry: TriggerEntry) {
  // usa target/hash si vienen; si no, como fallback slugify(text)
  if (typeof entry !== "string") {
    if (entry.target && entry.target.trim()) return entry.target;
    if (entry.hash && entry.hash.trim()) return entry.hash;
  }
  // Fallback (último recurso). ¡Pero en hebreo ya pasamos target en inglés!
  return slugify(entryToText(entry));
}

function slugify(text: string) {
  return text
    .replace(/^\d+\.\s*/, "") // quita "1. " si hay
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function entryToHash(entry: TriggerEntry) {
  if (typeof entry === "string") return slugify(entry);
  if (entry.hash && entry.hash.trim().length > 0) return entry.hash;
  return slugify(entry.text);
}

function entryToText(entry: TriggerEntry) {
  return typeof entry === "string" ? entry : entry.text;
}

export function DocsSidebar({
  triggers,
  current,  // params.slug, p.ej. "privacy-policy"
}: {
  triggers: Article[];
  current?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // abierto por defecto
  const initialOpen = useMemo(
    () => (current && triggers.some(a => a.link === current) ? current : triggers[0]?.link),
    [triggers, current]
  );

  const [open, setOpen] = useState<string | undefined>(initialOpen);

  // reordenar al tope
  const reorder = (list: Article[], link: string) => {
    const idx = list.findIndex(a => a.link === link);
    if (idx <= 0) return list;
    const chosen = list[idx];
    return [chosen, ...list.slice(0, idx), ...list.slice(idx + 1)];
  };

  const [ordered, setOrdered] = useState<Article[]>(
    initialOpen ? reorder(triggers, initialOpen) : triggers
  );

  // navegar con hash y scroll suave; si ya estamos en el doc, scrollea sin recargar
  const goTo = (e: React.MouseEvent, link: string, hash?: string) => {
    if (e.metaKey || e.ctrlKey) return; // respeta nueva pestaña
    e.preventDefault();

    setOpen(link);
    setOrdered(prev => reorder(prev, link));

    const targetPath = `/docs/${link}`;
    const targetUrl = hash ? `${targetPath}#${hash}` : targetPath;

    if (pathname === targetPath && hash) {
      // ya estamos en la misma página: scroll suave imperativo
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // opcional: compensar navbar sticky si hace falta (ya tienes .scroll-mt-24)
      } else {
        // si aún no existe (p.ej. recién montado), usa router para setear hash
        router.push(targetUrl, { scroll: true });
      }
    } else {
      router.push(targetUrl, { scroll: true });
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={open}
      onValueChange={(val) => setOpen(val ?? undefined)}
      className="w-full text-neutral-300"
    >
      {ordered.map((item) => (
        <AccordionItem value={item.link} key={item.link}>
          {/* Link envolviendo el Trigger (tu patrón) */}
          <Link
            href={`/docs/${item.link}`}
            className="hover:text-white"
            onClick={(e) => goTo(e, item.link)}
          >
            <AccordionTrigger className="text-md font-semibold">
              {item.title}
            </AccordionTrigger>
          </Link>

          <AccordionContent className="flex flex-col space-y-2 pl-3">
            {item.triggerContent.map((entry, i) => {
              const text = entryToText(entry);
              const hash = entryToHash(entry);
            //   const target = entryToTarget(entry);
              return (
                <Link
                  key={i}
                  href={`/docs/${item.link}#${hash}`}
                  className="hover:text-white"
                  onClick={(e) => goTo(e, item.link, hash)}
                >
                  {text}
                </Link>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
