/*
 * TODO: Fix bug in easings with extra arg.
 * TODO: Merge Animator update and render loop from Physics.js class.
 * TODO: Create plug-and-play animations for the most common effects.
 */

class Animator
{
    constructor()
    {
        this.easings = {};
        this.easings.quadIn = ( timeFraction ) =>
        {
            return Math.pow( timeFraction, 2 )
        };
        this.easings.circIn = ( timeFraction ) =>
        {
            return 1 - Math.sin(Math.acos(timeFraction));
        };
        this.easings.backIn = ( timeFraction, x ) =>
        {
            return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
        };
        this.easings.bounceIn = ( timeFraction ) =>
        {
            for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (timeFraction >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
                }
            }
        };
        this.easings.elasticIn = ( timeFraction, x ) =>
        {
            return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
        };
        this.easings.quadOut = this.makeEaseOut(
            ( timeFraction ) =>
            {
                return Math.pow(timeFraction, 2)
            }
        );
        this.easings.circOut = this.makeEaseOut(
            ( timeFraction ) =>
            {
                return 1 - Math.sin(Math.acos(timeFraction));
            }
        );
        this.easings.backOut = this.makeEaseOut(
            ( timeFraction, x ) =>
            {
                return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
            }
        );
        this.easings.bounceOut = this.makeEaseOut(
            ( timeFraction ) =>
            {
                for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (timeFraction >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
                    }
                }
            }
        );
        this.easings.elasticOut = this.makeEaseOut(
            ( timeFraction, x ) =>
            {
                return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
            }
        );
        this.easings.quadInOut = this.makeEaseInOut(
            ( timeFraction ) =>
            {
                return Math.pow(timeFraction, 2)
            }
        );
        this.easings.circInOut = this.makeEaseInOut(
            ( timeFraction ) =>
            {
                return 1 - Math.sin(Math.acos(timeFraction));
            }
        );
        this.easings.backInOut = this.makeEaseInOut(
            ( timeFraction, x ) =>
            {
                return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
            }
        );
        this.easings.bounceInOut = this.makeEaseInOut(
            ( timeFraction ) =>
            {
                for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (timeFraction >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
                    }
                }
            }
        );
        this.easings.elasticInOut = this.makeEaseInOut(
            ( timeFraction, x ) =>
            {
                return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
            }
        )

    }

    animate( { timing, draw, duration, x } )
    {
        let start = performance.now();
        requestAnimationFrame(
            function animate( time )
            {
                let timeFraction = ( time - start ) / duration;
                if ( timeFraction > 1 )
                {
                    timeFraction = 1;
                }
                let progress = timing( timeFraction, x );
                draw( progress );
                if ( timeFraction < 1 ) {
                    requestAnimationFrame( animate );
                }
            }
        );
    }

    makeEaseOut( timing )
    {
        return function( timeFraction, x ) {
            return 1 - timing( 1 - timeFraction, x ) ;
        };
    }

    makeEaseInOut(timing)
    {
        return function(timeFraction) {
            if ( timeFraction < 0.5 )
            {
                return timing( 2 * timeFraction ) / 2;
            }
            else
            {
                return ( 2 - timing( 2 * ( 1 - timeFraction ) ) ) / 2;
            }
        }
    }

}
