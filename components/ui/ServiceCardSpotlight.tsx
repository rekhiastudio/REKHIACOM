import { CardSpotlight } from "@/components/ui/card-spotlight";
import { cn } from "@/lib/utils";

export function ServiceCardSpotligh({
  classes = "",
  title = "Standard",
  price = "$129",
  features = [],
  isFeatured = false,
  cta = "Contact Sales",
  note, 
  ...props
}: {
  classes?: string;
  title?: string;
  price?: string;
  features?: string[];
  isFeatured?: boolean;
  cta?: string;
  note?: string;
}) {

  return (
    <CardSpotlight
      className={cn(
        "relative h-[560px] w-[360px] p-6 border-2",
        isFeatured
          ? "bg-neutral-200 text-neutral-900 border border-neutral-300 shadow-[0_1px_0_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(255,255,255,0.6)]"
          : "bg-[rgba(17,17,17,0.8)] text-white border border-neutral-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
        classes
      )}
      {...props}
    >
      {/* Header */}
      <div
        className={cn(
          "rounded-[18px] p-6 mb-6 justify-between relative z-20",
          isFeatured
            ? "bg-neutral-100 border border-neutral-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
            : "bg-[rgba(17,17,17,0.8)] border border-neutral-800"
        )}
      >
        <div className="flex items-start justify-between ">
          <h3
            className={cn(
              "text-[18px] font-semibold tracking-tight",
              isFeatured ? "text-neutral-900" : "text-white"
            )}
          >
            {title}
          </h3>

          {isFeatured && (
            <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[12px] font-medium leading-none text-white">
              Popular
            </span>
          )}
        </div>

        {/* Price + /month */}
        <div className="mt-4 flex items-baseline gap-2">
          <span
            className={cn(
              "font-bold tracking-tight",
              "text-[34px] leading-none"
            )}
          >
            {price}
          </span>
          <span
            className={cn(
              "text-[16px] leading-none",
              isFeatured ? "text-neutral-500" : "text-neutral-400"
            )}
          >
            / month
          </span>
        </div>

        {/* Button */}
        <button
          className={cn(
            "mt-5 h-10 w-full rounded-[10px] text-[14px] font-semibold transition cursor-pointer",
            isFeatured
              ? "bg-black text-white hover:bg-neutral-900"
              : "bg-neutral-200 text-black hover:bg-neutral-300",
            // sombra suave como en figma
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          )}
        >
          {cta}
        </button>
      </div>

      {note && (
        <p
          className={cn(
            "mb-4 text-[13px] leading-5 relative z-20",
            isFeatured ? "text-neutral-800" : "text-neutral-300"
          )}
        >
          {note}
        </p>
      )}

      {/* Features */}
      <ul className="space-y-4 relative z-20 ">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-[6px] inline-block h-[12px] w-[12px] shrink-0 rounded-full",
                // Circle
                isFeatured
                  ? "border border-neutral-600 bg-neutral-200"
                  : "border border-neutral-500 bg-transparent"
              )}
            />
            <span
              className={cn(
                "text-[14px] leading-[1.25rem]",
                isFeatured ? "text-neutral-800/90" : "text-neutral-200/90"
              )}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
    </CardSpotlight>
  );
}


const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
