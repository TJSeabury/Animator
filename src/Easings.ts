
/**
 * @author Tyler Seabury
 * 
 * @todo Fix bug in easings with extra arg.
 */
export default class Easings {

    static quadIn( t :number ):number {
        return ( ( timeIndex :number ):number => timeIndex**2 )( t );
    }

    static circIn( t :number):number {
        return ( ( timeIndex: number ):number =>
        1 - Math.sin( Math.acos( timeIndex ) ) )( t );
    }

    static quadOut( timeIndex :number ):number {
        return ( this.makeEaseOut( ( timeIndex: number ) => timeIndex**2 ) )( timeIndex );
    }

    static circOut( t :number ):number {
        return ( this.makeEaseOut( ( timeIndex :number ) => 
        1 - Math.sin( Math.acos( timeIndex ) ) ) )( t );
    }

    static quadInOut( t :number ):number { 
        return ( this.makeEaseInOut( ( timeIndex:number ) => timeIndex**2 ) )( t );
    }

    static circInOut( t :number ):number { 
        return ( this.makeEaseInOut( ( timeIndex :number ) =>
        1 - Math.sin( Math.acos( timeIndex ) ) ) )( t );
    }

    static linear( t :number ):number {
        return ( ( timeIndex :number ) :number => timeIndex )( t );
    }

    static makeEaseOut( timing :(t:number)=>number ) :(t:number) =>number {
        return function( timeIndex :number ) {
            return 1 - timing( timeIndex ) ;
        };
    }

    static makeEaseInOut( timing :(t:number)=>number) :(t:number)=>number {
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