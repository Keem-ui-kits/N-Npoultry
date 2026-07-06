import { faqItems } from '@/content/faq';
import { Plus } from 'lucide-react';

// Editorial ruled list of native <details> — keyboard accessible with no JS,
// and keeps visible content in parity with the FAQPage JSON-LD schema.
export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
          Before you order
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-10 md:mb-14">
          Common <span className="text-brand-gold">questions</span>
        </h2>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqItems.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-baseline gap-5 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-brand-gold/50 font-mono text-sm tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-lg md:text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                  {item.question}
                </span>
                <Plus
                  aria-hidden="true"
                  className="w-5 h-5 text-brand-gold/60 shrink-0 self-center transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="pb-7 pl-[3.1rem] pr-10 text-white/65 leading-relaxed max-w-[65ch]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
