import { testimonials } from "@/data/testimonials";
import CircularTestimonials from "@/components/ui/circular-testimonials";
import MaskReveal from "@/components/ui/MaskReveal";

const HEADING = "What people say";

export default function Testimonials() {
  const isDev = process.env.NODE_ENV === "development";
  // The live site only ever shows quotes their authors have approved.
  const visible = testimonials.filter((person) => person.approved || isDev);

  if (!visible.length) return null;

  return (
    <section id="testimonials" className="px-6 pb-24 md:px-10 md:pb-32">
      <h2 aria-label={HEADING} className="font-display text-[clamp(2.75rem,7vw,6rem)] text-fg">
        <MaskReveal text={HEADING.toUpperCase()} stagger={0.03} />
      </h2>
      <div className="mt-8 md:mt-10">
        <CircularTestimonials items={visible} />
      </div>
    </section>
  );
}
