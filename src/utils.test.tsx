import { nth } from './utils';

const testArray = ['a', 'b', 'c', 'd', 'e'];

test('try to get any element of empty array', () => {
  const elem = nth([], 3);
  expect(elem).toBeUndefined();
});

test('get the element at index 0', () => {
  const elem = nth(testArray, 0);
  expect(elem).toBe('a');
});

test('get the element in the middle of array', () => {
  const elem = nth(testArray, 2);
  expect(elem).toBe('c');
});

test('get the element at the end of array', () => {
  const elem = nth(testArray, 4);
  expect(elem).toBe('e');
});

test('get the element at index -1 (last element)', () => {
  const elem = nth(testArray, -1);
  expect(elem).toBe('e');
});

test('get the element at index 5 (first element, becouse last index is 4)', () => {
  const elem = nth(testArray, 5);
  expect(elem).toBe('a');
});

test('get the element at index -7', () => {
  const elem = nth(testArray, -7);
  expect(elem).toBe('d');
});

test('get the element at index 13', () => {
  const elem = nth(testArray, 13);
  expect(elem).toBe('d');
});
