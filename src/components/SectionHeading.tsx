import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: Props) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="section-kicker">{eyebrow}</p>
      <h2 className={`section-title ${inverted ? "text-white" : "text-slate-950"}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed ${
            inverted ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

