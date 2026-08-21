'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { motion, useReducedMotion } from "framer-motion"

export default function FAQs() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'Do you deliver on weekends?',
      answer: 'We deliver Monday to Saturday. Saturday slots fill quickly — we highly recommend messaging early in the week to reserve your route dispatch.',
    },
    {
      id: 'item-2',
      question: 'What if an egg breaks in transit?',
      answer: 'At the time of delivery, any breakage is fully replaced. The standard is ours to hold, not yours to absorb.',
    },
    {
      id: 'item-3',
      question: 'Which areas do you deliver to?',
      answer: 'We deliver daily across Machakos Town, Syokimau, Athi River, Mlolongo, Katoloni and Mwala. If you are nearby, contact us and we will try to accommodate you.',
    },
    {
      id: 'item-4',
      question: 'Is the poultry manure ready to use straight away?',
      answer: 'Yes! Our manure is dried naturally in the Machakos sun, which concentrates the nutrients and clears pathogens, making it ready for direct application.',
    },
    {
      id: 'item-5',
      question: 'Are the ex-layer hens healthy and vaccinated?',
      answer: 'Absolutely. All our birds go through a full, regular vaccination programme under strict veterinary supervision throughout their cycle.',
    },
    {
      id: 'item-6',
      question: 'Can I order less than a tray of eggs?',
      answer: 'Our minimum is one 30pc tray. For smaller quantities, ask us — we may have loose stock available on the day.',
    },
    {
      id: 'item-7',
      question: 'Can I get less than 70kg of manure?',
      answer: 'Our standard sack is 70kg. Contact us to make arrangements for custom smaller quantities if needed.',
    },
    {
      id: 'item-8',
      question: 'How do I apply manure to my garden?',
      answer: 'Mix into soil before planting or apply as a top dressing. One sack covers roughly 50–80 square metres.',
    },
    {
      id: 'item-9',
      question: 'What age are the ex-layer hens?',
      answer: 'Typically 72–80 weeks — the end of their laying cycle, and in good health.',
    },
    {
      id: 'item-10',
      question: 'Do you deliver live hens?',
      answer: 'We primarily sell live birds for collection at the farm. Speak to us about bulk delivery logistics if ordering large quantities.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--color-cream)]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-[var(--color-dark)] text-4xl font-bold tracking-tight">FAQs</h2>
            <p className="text-[var(--color-dark)]/70 mt-4 text-balance text-lg leading-relaxed">
              Everything you need to know about N&amp;N Poultry Palace products and delivery.
            </p>
            <p className="text-[var(--color-dark)]/60 mt-6 hidden md:block leading-relaxed">
              Can’t find what you’re looking for? Reach out to our{' '}
              <Link
                href="/contact"
                className="text-[var(--color-terracotta)] font-medium hover:underline"
              >
                customer support team
              </Link>{' '}
              for assistance.
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-[var(--color-dark)]/10"
                >
                  <AccordionTrigger className="cursor-pointer text-[17px] font-semibold text-[var(--color-dark)] hover:text-[var(--color-terracotta)] hover:no-underline transition-colors py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[var(--color-dark)]/80 leading-relaxed pb-4">
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-[var(--color-dark)]/60 mt-6 md:hidden">
            Can’t find what you’re looking for? Contact our{' '}
            <Link
              href="/contact"
              className="text-[var(--color-terracotta)] font-medium hover:underline"
            >
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export const BlurredStagger = ({
  text = "built by ruixen.com",
}: {
  text: string;
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <p className="text-[15px] leading-relaxed break-words whitespace-normal text-[var(--color-dark)]/75">
        {text}
      </p>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.012,
      },
    },
  };
 
  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
      y: 2,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };
 
  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-[15px] leading-relaxed break-words whitespace-normal text-[var(--color-dark)]/75"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};
