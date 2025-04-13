import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  animateOnScroll?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, animateOnScroll = true, ...props }, ref) => {
  const [progressValue, setProgressValue] = React.useState(0);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (animateOnScroll && inView && value) {
      const timer = setTimeout(() => {
        setProgressValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!animateOnScroll && value) {
      setProgressValue(value);
    }
  }, [inView, value, animateOnScroll]);

  return (
    <div ref={inViewRef}>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary transition-all duration-1000"
          style={{
            transform: `translateX(-${
              100 - (animateOnScroll ? progressValue : value || 0)
            }%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
