const fs = require('fs');
const path = require('path');
const less = require('less');
let stylesAdded = false;

function appendStyles(css){
    let head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

function toLessVars(obj){
    let pre = '';
    Object.keys(obj).forEach(key=>{
        pre += '@'+key+': '+obj[key]+';\n';
    });
    return pre;
}

module.exports = function addStyles(options){

    if(stylesAdded) return;

    if(!options.scaler){
        options.scaler = 'scale(3)';
    }

    let css = fs.readFileSync(path.join(__dirname, 'paperize.less'), 'utf8');

    let pre = toLessVars(options);
    
    less.render(pre+css, function (e, output) {
        if(e) return console.error(e);
        appendStyles(output.css);
    });

    stylesAdded = true;
}
