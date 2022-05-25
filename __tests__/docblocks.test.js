function sum(a, b) {
	return a + b;
}

/**
 * @my-custom-pragma above-test1
 */
test('Ignore Docblock, when located above test', () => {
	expect(sum(1, 2)).toBe(3);
});

test('Read Docblock, when located under test', () => {
	/** This is a description
   * @my-custom-pragma under-test1
   * @tag tag1
	 */

	expect(sum(1, 2)).toBe(3);
});

