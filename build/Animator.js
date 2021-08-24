import Easings from './Easings';
import { clamp, relativePositionToViewport } from './utils';
/**
 * © Copyright 2021, Tyler Seabury, All Rights reserved.
 * @author Tyler Seabury, tylerseabury@gmail.com
 * @authorURL https://github.com/TJSeabury/
 *
 * @todo: Create plug-and-play animations for the most common effects.
 */
export default class Animator {
    constructor(frameRate = 60) {
        this.easings = Easings;
        this.frameRate = frameRate;
    }
    animate({ easing, draw, duration }, loop = false) {
        const startTime = performance.now();
        const endTime = startTime + duration;
        const interFrameTime = 1000 / this.frameRate;
        let timeNow = startTime;
        let timeLast = timeNow;
        let deltaTime = timeNow - timeLast;
        let timeIndex = timeNow - startTime;
        const render = () => {
            if (deltaTime >= interFrameTime) {
                timeLast = timeNow;
                let timeFraction = timeIndex / duration;
                try {
                    draw(timeFraction, easing(timeFraction));
                }
                catch (err) {
                    console.error('Animation failed with error: ', err);
                }
            }
            timeNow = performance.now();
            deltaTime = timeNow - timeLast;
            timeIndex = timeNow - startTime;
            if (timeNow < endTime) {
                requestAnimationFrame(render);
            }
            else {
                draw(1, easing(1));
                if (true === loop)
                    this.animate({ easing, draw, duration }, loop);
            }
        };
        requestAnimationFrame(render);
    }
}
export function fadeIn(element, time, f = x => x) {
    new Animator().animate({
        duration: time,
        easing: f,
        draw: t => {
            element.style.setProperty('opacity', t);
        }
    });
}
export function fadeOut(element, time, f = x => x) {
    new Animator().animate({
        duration: time,
        easing: f,
        draw: t => {
            element.style.setProperty('opacity', String(1 - t));
        }
    });
}
export function fadeInOut(element, f = x => x) {
    let pos = relativePositionToViewport(element);
    let r = f(Math.abs(clamp(pos)));
    element.style.setProperty('filter', 'opacity(' + String(1 - r) + ')');
    return r;
}
