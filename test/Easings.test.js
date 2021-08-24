import { expect } from '@jest/globals';
import Easings from './../build/Easings';

test('should exist ', () => {
    expect( Easings ).toBeDefined();
    expect( typeof Easings ).toBe( 'function' );
    expect( Easings.name ).toBe( 'Easings' );
})

test('should have methods', () => {
    const methods = [
        'quadIn',
        'circIn',
        'quadOut',
        'circOut',
        'quadInOut',
        'circInOut',
        'linear',
        'makeEaseOut',
        'makeEaseInOut'
    ];
    for ( const method of methods ) {
        expect( Easings[method] ).toBeDefined();
        expect( typeof Easings[method] ).toBe( 'function' );
    }
})

test('makeEaseOut should be a function and invert curves', () => {
    let easeOut = Easings.makeEaseOut( x => x );
    expect( typeof easeOut ).toBe( 'function' );
    expect( easeOut( 0 ) ).toBeCloseTo( 1 );
    expect( easeOut( 1/3 ) ).toBeCloseTo( 2/3 );
    expect( easeOut( 1/2 ) ).toBeCloseTo( 1/2 );
    expect( easeOut( 3/4 ) ).toBeCloseTo( 1/4 );
    expect( easeOut( 1 ) ).toBeCloseTo( 0 );
})
