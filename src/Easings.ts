
/**
 * @author Tyler Seabury
 * 
 * @todo Fix bug in easings with extra arg.
 */
export default class Easings {

    static quadIn = ( timeIndex :number ) :number => {
        return timeIndex**2;
    };

    static circIn = ( timeIndex: number ) :number => {
        return 1 - Math.sin( Math.acos( timeIndex ) );
    };

    static quadOut( timeIndex :number ) {
        return ( this.makeEaseOut( ( timeIndex: number ) :number => timeIndex**2 ) )( timeIndex );
    }

    static circOut = this.makeEaseOut( ( timeIndex :number ) :number => {
        return 1 - Math.sin( Math.acos( timeIndex ) );
    } );

    static quadInOut = this.makeEaseInOut( ( timeIndex:number ) :number => {
        return timeIndex**2;
    } );

    static circInOut = this.makeEaseInOut( ( timeIndex :number ) :number => {
        return 1 - Math.sin( Math.acos( timeIndex ) );
    } );

    static linear = ( timeIndex :number ) :number => {
        return timeIndex;
    };

    static makeEaseOut( timing :( t :number ) => number ) :( t :number ) => number {
        return function( timeIndex :number ) {
            return 1 - timing( timeIndex ) ;
        };
    }

    static makeEaseInOut( timing :( t :number ) => number ) :( t :number ) => number {
        return function( timeIndex ) {
            if ( timeIndex < 0.5 )
            {
                return timing( 2 * timeIndex ) / 2;
            }
            else
            {
                return ( 2 - timing( 2 * ( 1 - timeIndex ) ) ) / 2;
            }
        };
    }

}