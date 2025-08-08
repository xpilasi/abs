import { clsx } from "clsx";

/**
 * Utility function to combine class names
 * @param {...any} inputs 
 * @returns {string}
 */
export function cn(...inputs) {
  return clsx(inputs);
}
