
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Modern listener approach
    try {
      // Try using addEventListener first (modern browsers)
      mql.addEventListener("change", onChange)
      
      return () => mql.removeEventListener("change", onChange)
    } catch (e) {
      // Fall back to addListener for older browsers
      try {
        // @ts-ignore - For older browsers
        mql.addListener(onChange)
        
        return () => {
          // @ts-ignore - For older browsers
          mql.removeListener(onChange)
        }
      } catch (e2) {
        console.error("Could not attach media query listener", e2)
      }
    }
  }, [])

  return isMobile
}
