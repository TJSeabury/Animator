var _a;
/**
 * @author Tyler Seabury
 *
 * @todo Fix bug in easings with extra arg.
 */
export default class Easings {
    static quadOut(timeIndex) {
        return (this.makeEaseOut((timeIndex) => Math.pow(timeIndex, 2)))(timeIndex);
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
_a = Easings;
Easings.quadIn = (timeIndex) => {
    return Math.pow(timeIndex, 2);
};
Easings.circIn = (timeIndex) => {
    return 1 - Math.sin(Math.acos(timeIndex));
};
Easings.circOut = _a.makeEaseOut((timeIndex) => {
    return 1 - Math.sin(Math.acos(timeIndex));
});
Easings.quadInOut = _a.makeEaseInOut((timeIndex) => {
    return Math.pow(timeIndex, 2);
});
Easings.circInOut = _a.makeEaseInOut((timeIndex) => {
    return 1 - Math.sin(Math.acos(timeIndex));
});
Easings.linear = (timeIndex) => {
    return timeIndex;
};
