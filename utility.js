// distance(d) {
//     if (d < 0 || d > 1) throw `distance must be >= 0 and <=1`;
// }

export const PRESETS = {
    default: [1, .85, 1, .70, 1, .5, 1, .35],
    pastel: [.7, .7, .3, .35, .3, .85, .6, .45],
    soft: [.4, .7, .2, .45, .3, .85, .4, .55],
    light: [1, .85, .45, .55, 1, .95,1, .85],
    hard: [1, .5, 1, .3, 1, .95, 1, .7],
    pale: [.2, .2, .5, .5, 1, .95, .15, .7]
};

export function rotate(a, b) {
    return (a + b) % 360;
}

export function rgbFormate(rgb) {
    let color = '#';
    rgb.forEach(e => {
        color += (e < 16 ? '0' : '') + e.toString(16);
    })
    return color;
}


export function hsltorgb(hsl) {
    let h, s, l, rgb = [];
    [h, s, l] = hsl;
    if (!s) {
        rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
    } else {
        let q = l >= .5 ? (l + s - l * s) : (l * (1 + s));
        let p = 2 * l - q;
        rgb = [h + 1 / 3, h, h - 1 / 3];
        rgb.forEach((e, i) => {
            if (e < 0) e++;
            if (e > 1) e--;
            switch (true) {
                case (e < (1 / 6)):
                    e = p + (q - p) * 6 * e;
                    break;
                case ((1 / 6) <= e && e < .5):
                    e = q;
                    break;
                case (.5 <= e && e < (2 / 3)):
                    e = p + (q - p) * (4 - 6 * e);
                    break;
                default:
                    e = p;
                    break;
            }
            rgb[i] = Math.round(e * 255);
        })
    }

    return rgb;
}