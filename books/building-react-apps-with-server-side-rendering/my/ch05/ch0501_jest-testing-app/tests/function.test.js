functions = require('../functions.js')

test('Test Add Function',()=>{
    expect(functions.add(2,3)).toBe(5)
})

test('toEqual Demo',()=>{
    var data = {name:'Mohit'}
    data['country'] = 'India'
    expect(data).toEqual({
        name:'Mohit',
        country:'India'
    })
})

test('truth of null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});
test('truth of zero', () => {
    const n = 0;
    expect(n).not.toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('comparison', () => {
    const value = 4 + 0.2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
    expect(value).toBeCloseTo(4.2);
});

test('String Matcher', () => {
    expect('Mohit is a Developer').toMatch(/Mohit/);
});

const countries = [
    'India',
    'United Kingdom',
    'United States',
    'Japan',
    'Canada',
];
test('Matcher for Iterables', () => {
    expect(countries).toContain('India');
    expect(new Set(countries)).toContain('Canada');
});

const functions2 = {
    add: (n1, n2) => n1 + n2,
    invalidOperation: () => {
        throw new Error('Operation not allowed!')
    }
}
test('Exception Matcher', () => {
    expect(functions2.invalidOperation)
        .toThrow(Error);
    expect(functions2.invalidOperation)
        .toThrow('Operation not allowed!');
    expect(functions2.invalidOperation)
        .toThrow(/not allowed/);
});