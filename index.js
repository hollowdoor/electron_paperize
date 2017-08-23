const addStyles = require('./add_styles.js');
//const wait = require('./lib/wait_transform.js');
const HoverBox = require('./lib/hover_box.js');
const FloatingBox = require('./lib/floating_box.js');
module.exports.addStyles = addStyles;
module.exports.HoverBox = HoverBox;
module.exports.FloatingBox = FloatingBox;

/*class Paperized {
    constructor(element, {
        simpleHover = false,
        classPrefix = '',
        lightSourceY = 'top',
        lightSourceX = 'left',
        magnifyEvent = 'mouseover',
        shrinkEvent = 'mouseout',
        type = 'hover',
        id = ''
    } = {}){
        this.element = element;
        this.id = id;

        this.element.classList.add('paperized-'+id);

        if(!id || !id.length){
            throw new Error('Paperize options.id is required');
        }

        addStyles({id});

        let kind;

        if(type === 'hover'){
            kind = makeHover(this);
        }else if(type === 'floating'){
            kind = makeFloating(this);
        }

        this.destroy = function(){
            kind.destroy();
        };
    }
}

module.exports = function paperize(element, options){
    return new Paperized(element, options);
};*/
