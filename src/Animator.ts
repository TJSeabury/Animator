import Easings from './Easings';
import {
    clamp,
    relativePositionToViewport
} from './utils';

/**
 * © Copyright 2021, Tyler Seabury, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@gmail.com
 * @authorURL https://github.com/TJSeabury/
 * 
 * @todo: Create plug-and-play animations for the most common effects.
 */
export default class Animator
{
    frameRate: number;
    easings = Easings;
    constructor( frameRate :number = 60 )
    {
        this.frameRate = frameRate;
    }

    animate( { easing, draw, duration }, loop = false )
    {
        const startTime = performance.now();
        const endTime = startTime + duration;
        const interFrameTime = 1000 / this.frameRate;
        let interupted = false;
        let timeNow = startTime;
        let timeLast = timeNow;
        let deltaTime = timeNow - timeLast;
        let timeIndex = timeNow - startTime;
        const render = () => {
            if ( true === interupted ) return;
            if ( deltaTime >= interFrameTime )
            {
                timeLast = timeNow;
                let timeFraction = timeIndex / duration;
                try
                {
                    draw( timeFraction, easing( timeFraction ) );
                }
                catch ( err )
                {
                    console.error( 'Animation failed with error: ', err );
                }
            }
            timeNow = performance.now();
            deltaTime = timeNow - timeLast;
            timeIndex = timeNow - startTime;
            if ( timeNow < endTime )
            {
                requestAnimationFrame( render )
            }
            else
            {
                draw( 1, easing( 1 ) );
                if ( true === loop ) this.animate( { easing, draw, duration }, loop );
            }
        };
        requestAnimationFrame( render );
        return function interupt () {
			if ( timeNow < endTime ) interupted = true;
		};
    }
}

export function fadeIn( element :HTMLElement, time :number, f :(x:number)=>number = x => x )
{
    new Animator().animate({
        duration: time,
        easing: f,
        draw: t => {
            element.style.setProperty( 'opacity', t );
        }
    });
}

export function fadeOut( element :HTMLElement, time :number, f :(x:number)=>number = x => x )
{
    new Animator().animate({
        duration: time,
        easing: f,
        draw: t => {
            element.style.setProperty( 'opacity', String(1 - t) );
        }
    });
}

export function fadeInOut( element :HTMLElement, f :(x:number)=>number = x => x )
{
    let pos = relativePositionToViewport( element );
    let r = f( Math.abs( clamp( pos ) ) );
    element.style.setProperty( 'filter', 'opacity(' + String(1 - r) + ')' );
    return r;
}