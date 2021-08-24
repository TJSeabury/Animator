/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export function clamp(min = -1, max = 1) {
    return Math.min(Math.max(this, min), max);
}
;
/**
 * @see https://en.wikipedia.org/wiki/Linear_map#Examples_in_two_dimensions
 * @param a
 * @param b
 * @param c
 * @param d
 * @returns
 */
export function generateLinearTransform(a, b, c, d) {
    return function (x) {
        return (x - a) / (b - a) * (d - c) + c;
    };
}
/**
 * Quadratic smooth minimum.
 * @see https://www.iquilezles.org/www/articles/smin/smin.htm
 * @param a
 * @param b
 * @param k
 * @returns
 */
export function smin(a, b, k) {
    let h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * k * (1 / 4);
}
/**
 * Cubic smooth minimum.
 * @see https://www.iquilezles.org/www/articles/smin/smin.htm
 * @param a
 * @param b
 * @param k
 * @returns
 */
export function sminCubic(a, b, k) {
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * h * k * (1 / 6);
}
/**
 * Explicit quadratic Bezier curve equation
 * B(t) = (1-t)[(1-t)P0+tP1]+t[(1-t)P1+tP2]
 * Where 0 <= t <= 1
 * @see https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_B%C3%A9zier_curves
 */
export function generateQuadraticBezierCurve(a = { x: 0, y: 1 }, b = { x: 0, y: 0 }, c = { x: 1, y: 0 }) {
    return function curve(t) {
        let x = (1 - t) * ((1 - t) * a.y + t * b.y) + t * ((1 - t) * b.y + t * c.y);
        let y = (1 - t) * ((1 - t) * a.x + t * b.x) + t * ((1 - t) * b.x + t * c.x);
        return {
            x: x,
            y: y
        };
    };
}
/**
 * Explicit cubic Bezier curve equation
 * B(t) = (1-t)^3P0+3(1-t)^2tP1+3(1-t)t^2P2+t^3P3
 * Where 0 <= t <= 1
 * @see https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B%C3%A9zier_curves
 */
export function generateCubicBezierCurve(a = { x: 0, y: 0 }, b = { x: 0, y: 1 }, c = { x: 1, y: 1 }, d = { x: 1, y: 0 }) {
    return function curve(t) {
        let x = Math.pow((1 - t), 3) * a.x + 3 * Math.pow((1 - t), 2) * t * b.x + 3 * (1 - t) * Math.pow(t, 2) * c.x + Math.pow(t, 3) * d.x;
        let y = Math.pow((1 - t), 3) * a.y + 3 * Math.pow((1 - t), 2) * t * b.y + 3 * (1 - t) * Math.pow(t, 2) * c.y + Math.pow(t, 3) * d.y;
        return {
            x: x,
            y: y
        };
    };
}
export function generateRandomNumberInclusiveInverseQuadratic(min, max) {
    const curve = generateQuadraticBezierCurve({ x: min, y: max }, { x: min, y: min }, { x: max, y: min });
    return function () {
        return curve(Math.random());
    };
}
export function relativePositionToViewport(element) {
    if (!element) {
        return;
    }
    let rect = element.getBoundingClientRect();
    let center = (((rect.top + (rect.height / 2)) / html.wh) - 0.5) * 2;
    return center;
}
export function relativeSizeToViewport(element) {
    if (!element) {
        return;
    }
    let rect = element.getBoundingClientRect();
    let ratio = html.wh / rect.height;
    return ratio;
}
