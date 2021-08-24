/**
 * @jest-environment jsdom
 */

import { expect } from '@jest/globals';
import Animator from './../build/Animator';

test('should exist', () => {
    expect( Animator ).toBeDefined();
    expect( typeof Animator ).toBe( 'function' );
    expect( Animator.name ).toBe( 'Animator' );
})

test('should be a class instance', () => {
    const a = new Animator();
    expect( a instanceof Animator ).toBe( true );
});

test('should have a default framerate', () => {
    const a = new Animator();
    expect( a.frameRate ).toBeDefined();
    expect( a.frameRate ).toBe( 60 );
});

test('should accept a user-defined framerate', () => {
    const a = new Animator( 24 );
    expect( a.frameRate ).toBe( 24 );
});


