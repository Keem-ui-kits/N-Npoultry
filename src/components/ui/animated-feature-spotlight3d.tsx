'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

interface AnimatedFeatureSpotlight3DProps extends React.HTMLAttributes<HTMLElement> {
  preheaderIcon?: React.ReactNode
  preheaderText: string
  heading: React.ReactNode
  description: string
  buttonText: string
  buttonProps?: ButtonProps
  imageUrl?: string
  imageAlt?: string
  customImageElement?: React.ReactNode
  headingLevel?: 'h1' | 'h2'
}


export const AnimatedFeatureSpotlight3D = React.forwardRef<
  HTMLElement,
  AnimatedFeatureSpotlight3DProps
>(
  (
    {
      className,
      preheaderIcon,
      preheaderText,
      heading,
      description,
      buttonText,
      buttonProps,
      imageUrl,
      imageAlt = 'Feature image',
      customImageElement,
      headingLevel = 'h2',
      ...props
    },
    ref
  ) => {
    // Pretext lines state
    const [textLines, setTextLines] = React.useState<{ text: string; width: number }[]>([])
    const [lineHeight, setLineHeight] = React.useState(28)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      // Use pretext to layout the description dynamically without relying purely on DOM text wrapping, 
      // ensuring we have exact control over line widths to avoid overlap with 3D image scaling.
      if (!containerRef.current) return
      
      const updateLayout = () => {
        if (!containerRef.current) return
        // Update line height state based on current width
        const isDesktop = window.innerWidth >= 768;
        setLineHeight(isDesktop ? 34 : 28);

        // Allow some buffer to explicitly avoid the image's 3D pop-out on the left
        const availableWidth = Math.max(200, containerRef.current.clientWidth - 20); 
        // Adjust pretext values to be larger to fill space on desktop
        const fontStr = isDesktop ? '22px Inter, sans-serif' : '18px Inter, sans-serif';
        const prepared = prepareWithSegments(description, fontStr)
        const { lines } = layoutWithLines(prepared, availableWidth, isDesktop ? 34 : 28)
        
        setTextLines(lines.map(l => ({ text: l.text, width: l.width })))
      }
      
      updateLayout();
      window.addEventListener('resize', updateLayout);
      return () => { window.removeEventListener('resize', updateLayout); };
    }, [description])

    return (
      <section
        ref={ref}
        className={cn(
          'w-full min-h-[85vh] mx-auto p-4 md:p-12 rounded-2xl bg-background border flex items-center justify-center',
          className
        )}
        aria-labelledby="feature-spotlight-heading"
        {...props}
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 max-w-[1500px] relative">
          
          {/* Image Section (Absolute bottom-right on Mobile, Left on Desktop) */}
          <motion.div
            className="absolute md:relative -bottom-48 -right-8 md:bottom-auto md:right-auto w-[240px] md:w-1/2 h-[350px] md:h-auto md:min-h-[700px] flex items-center justify-center order-last md:order-first pointer-events-none md:pointer-events-auto z-0"
          >
            <motion.div
              className="w-full max-w-2xl relative"
            >
              {customImageElement ?? (imageUrl ? (
                <motion.img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              ) : null)}
              <div className="absolute inset-0" />
            </motion.div>
          </motion.div>

          {/* Text Section (Above on Mobile, Right on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6 text-center md:text-left items-center md:items-start w-full md:w-1/2 order-first md:order-last pl-0 md:pl-8 relative z-10 md:py-16"
          >
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
              {preheaderIcon}
              <span>{preheaderText}</span>
            </div>
            
            {headingLevel === 'h1' ? (
              <motion.h1
                id="feature-spotlight-heading"
                className="text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-tighter text-foreground leading-[1.05]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {heading}
              </motion.h1>
            ) : (
              <motion.h2
                id="feature-spotlight-heading"
                className="text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-tighter text-foreground leading-[1.05]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {heading}
              </motion.h2>
            )}

            <motion.div
              className="text-lg md:text-[22px] text-muted-foreground leading-relaxed w-full min-h-[100px]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              ref={containerRef}
            >
              {textLines.length > 0 ? (
                <div className="flex flex-col items-center md:items-start">
                  {textLines.map((line, idx) => (
                    <div key={idx} style={{ height: lineHeight }} className="whitespace-pre">
                      {line.text}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{description}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-4"
            >
              <Button size="lg" {...buttonProps}>
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </section>
    )
  }
)

AnimatedFeatureSpotlight3D.displayName = 'AnimatedFeatureSpotlight3D'

