/**
 * @author Tyler Seabury
 *
 * @todo Fix bug in easings with extra arg.
 */
export default class Easings {
    static quadIn(t) {
        return ((timeIndex) => Math.pow(timeIndex, 2))(t);
    }
    static circIn(t) {
        return ((timeIndex) => 1 - Math.sin(Math.acos(timeIndex)))(t);
    }
    static quadOut(timeIndex) {
        return (this.makeEaseOut((timeIndex) => Math.pow(timeIndex, 2)))(timeIndex);
    }
    static circOut(t) {
        return (this.makeEaseOut((timeIndex) => 1 - Math.sin(Math.acos(timeIndex))))(t);
    }
    static quadInOut(t) {
        return (this.makeEaseInOut((timeIndex) => Math.pow(timeIndex, 2)))(t);
    }
    static circInOut(t) {
        return (this.makeEaseInOut((timeIndex) => 1 - Math.sin(Math.acos(timeIndex))))(t);
    }
    static linear(t) {
        return ((timeIndex) => timeIndex)(t);
    }
    static makeEaseOut(timing) {
        return function (timeIndex) {
            return 1 - timing(timeIndex);
        };
    }
    static makeEaseInOut(timing) {
        return function (timeIndex) {
            if (timeIndex < 0.5) {
                return timing(2 * timeIndex) / 2;
            }
            else {
                return (2 - timing(2 * (1 - timeIndex))) / 2;
            }
        };
    }
}
