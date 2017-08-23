const fs = require('fs');
const path = require('path');
const less = require('less');

function appendStyles(css, id=null){
    let head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    if(id){
        style.setAttribute('id', id);
    }

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

function electronLess({
    source,
    id,
    variables = {}
} = {}){
    try{
        let style = document.querySelector('#'+id);
        style.parentNode.removeChild(style);
    }catch(e){}

    let css = fs.readFileSync(source, 'utf8');

    let pre = toLessVars(variables);

    return new Promise((resolve, reject)=>{
        less.render(pre+css, function (e, output) {
            if(e) return reject(e);
            appendStyles(output.css, id);
            resolve({
                source,
                id
            });
        });
    });
}

module.exports = function addStyles(options){
    if(!options.id){
        throw new Error('options.id is required');
    }
    if(!options.scaler){
        options.scaler = 'scale(3)';
    }
    return electronLess({
        source: path.join(__dirname, 'paperize.less'),
        id: options.id,
        variables: options
    });
}
