import {ColorScheme} from '../index'

let c = new ColorScheme(21,{scheme:'triade'});

c.forEach(e => {
    let div = document.createElement('div');
    div.style.cssText = `background:${e};width:50px;height:50px`;
    document.body.appendChild(div);
});