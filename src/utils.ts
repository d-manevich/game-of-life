/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element from the end is returned. If `n` is bigger than length of `array`,
 * the nth element from the start is returned.
 *
 * @param {Array} array The array to query.
 * @param {number} n The index of the element to return.
 * @returns {*} Returns the nth element of `array`.
 * @example
 *
 * const array = ['a', 'b', 'c', 'd']
 *
 * nth(array, 1)
 * // => 'b'
 *
 * nth(array, -2)
 * // => 'c'
 *
 * nth(array, 4)
 * // => 'a'
 */
export function nth<T>(array: T[], n: number): T | undefined {
  const length = array.length;
  if (!length) {
    return;
  }

  let index = n;
  if (index < 0) index = length - (Math.abs(n) % length);
  if (index >= length) index = index % length;

  return array[index];
}

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @param {number} number The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * clamp(-10, -5, 5);
 * // => -5
 *
 * clamp(10, -5, 5);
 * // => 5
 */
export function clamp(number: number, lower: number, upper: number): number {
  return Math.min(upper, Math.max(number, lower));
}
