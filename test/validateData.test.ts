import { test, assert } from 'vitest';
import { validateData } from '../src/functions';
test('validateData should validate email, password, and optionally username', () => {
  // Test case 1: Valid data
  assert.equal(
    validateData('test@example.com', 'securepwd123', 'user123'),
    true
  );

  // Test case 2: Invalid email
  assert.equal(validateData('invalidemail', 'securepwd123', 'user123'), false);

  // Test case 3: Invalid password
  assert.equal(validateData('test@example.com', 'pwd', 'user123'), false);

  // Test case 5: Valid username (within length range)
  assert.equal(validateData('test@example.com', 'securepwd123', 'user'), true);

  // Test case 5: Null username
  assert.equal(validateData('test@example.com', 'securepwd123', null), true);
});
