"use client";

import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { Heart, Clock, Award, Package, MapPin } from "lucide-react";

interface Step {
  n: string;
  title: string;
  body: string;
}

interface MobileProcessDnaProps {
  steps: Step[];
}

export function MobileProcessDna({ steps }: MobileProcessDnaProps) {
  // Map our steps data to the TimelineItem schema
  const timelineItems: TimelineItem[] = steps.map((step, idx) => {
    // Select custom icons matching our farm workflow
    let IconComponent = Heart; // Step 1: Care
    if (idx === 1) IconComponent = Clock; // Step 2: Collect
    if (idx === 2) IconComponent = Award; // Step 3: Grade
    if (idx === 3) IconComponent = Package; // Step 4: Pack
    if (idx === 4) IconComponent = MapPin; // Step 5: Deliver

    // Define process statuses for beautiful visual feedback
    let status: "completed" | "active" | "pending" = "pending";
    if (idx < 3) {
      status = "completed";
    } else if (idx === 3) {
      status = "active";
    } else {
      status = "pending";
    }

    // Custom coloring classes matching N&N Poultry Palace theme colors
    const isCompleted = status === "completed";
    const isActive = status === "active";

    const circleStyle = isCompleted
      ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-dark)]"
      : isActive
      ? "border-[var(--color-orange)] bg-[var(--color-orange)]/25 text-[var(--color-orange)] animate-pulse"
      : "border-white/20 bg-white/5 text-white/40";

    return {
      id: step.n,
      title: step.title,
      status: status,
      icon: (
        <div className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${circleStyle}`}>
          <IconComponent className="w-3.5 h-3.5" />
        </div>
      ),
      content: (
        <p className="text-[14px] leading-relaxed text-white/70 -mt-2 pb-2">
          {step.body}
        </p>
      ),
    };
  });

  return (
    <div className="w-full py-4 text-left">
      <Timeline 
        items={timelineItems} 
        variant="spacious" 
        showTimestamps={false} 
        className="text-white [&_[class*='timelineConnector']]:bg-white/10 [&_h3]:text-[17px] [&_h3]:font-bold [&_h3]:text-[var(--color-gold)] [&_h3]:mb-1"
      />
    </div>
  );
}
