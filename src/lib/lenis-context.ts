import { createContext, useContext, type RefObject } from 'react'
import type Lenis from 'lenis'

/* Shares the single app-wide Lenis instance with any page
   (so the home preloader can lock scroll, etc.). */
export const LenisContext = createContext<RefObject<Lenis | null> | null>(null)

export function useLenisRef() {
  return useContext(LenisContext)
}
