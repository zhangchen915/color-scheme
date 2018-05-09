import {
    PRESETS,
    rotate,
    hsltorgb,
    rgbFormate
} from './utility'

export class ColorScheme {
    constructor(h = 0, config={}) {
        this.hue = [h];
        this.hsl = [];
        this.color = [];
        

        let {distance=.5,scheme='contrast',variation='default'}=config;
        this.distance = distance;

        this.dispatch(scheme);
        this.variantPreset(variation);
        return this.getColor();
    }

    _rotate(e = 0) {
        return rotate(this.hue[0], e);
    }

    dispatch(scheme) {
        let dif, hue;
        switch (scheme) {
            case 'mono':
                hue = [0];
                break;
            case 'contrast':
                hue = [0, 180];
                break;
            case 'triade':
                dif = 60 * this.distance;
                hue = [0, 180 - dif, 180 + dif];
                break;
            case 'tetrade':
                dif = 90 * this.distance;
                hue = [0, 180, 180 + dif, dif];
                break;
            case 'analogic':
                dif = 60 * this.distance;
                hue = [0, dif, 360 - dif, 180];
                break;
        }
        this.hue = this.huePreset(hue);
    }

    huePreset(value) {
        return value.map(e => rotate(this.hue[0], e))
    }

    variantPreset(preset) {
        this.hue.forEach(e => {
            for (let i = 0; i < 4; i++) {
                this.hsl.push([e / 360, PRESETS[preset][2 * i], PRESETS[preset][2 * i + 1]]);
            }
        })
    }


    getColor() {
        this.hsl.forEach((e, i) => {
            this.color[i] = rgbFormate(hsltorgb(e));
        })
        return this.color;
    }
}