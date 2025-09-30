import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { inter } from "@/lib/fonts"


export function FaqAccordion({items}) {


  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-neutral-300 max-w-[30rem] space-y-3"
      defaultValue={items[0].title}
    >
        {items.map((item, index) => {
            return (
                <AccordionItem key={index} value={item.title}>
                        <AccordionTrigger className="text-xl">{item.title}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="text-[1rem]">
                                {item.desc}
                            </p>
                        </AccordionContent>
                </AccordionItem>
            )
        })}
    </Accordion>
  )
}
