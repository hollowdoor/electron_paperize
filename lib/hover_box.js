const getDocSize = require('./document_size.js');
const cssVars = require('./css_vars_proxy.js');

module.exports = class HoverBox {
    constructor({
        id,
        expandDelay = 500
    } = {}){
        this.id = id;
        this.applied = [];
        this.active = [];
        this.expandDelay = expandDelay;
    }
    add(element){
        return init.call(this, element);
    }
    destroy(){
        this.applied.forEach(el=>el.destroy());
    }
};

function checkParent(element){
    if(element.parentNode && !element.parentNode.classList.contains('make3D')){
        element.parentNode.classList.add('make3D');
    }
}

function init(element){
    const {id} = this;
    const self = this;
    let inside = false, lastClass;
    element.classList.add('paperized-'+id);
    checkParent(element);

    let css = cssVars();

    const me = {
        element,
        destroy(){
            element
            .removeEventListener('mouseover', onMouseOver, false);
            element
            .removeEventListener('mouseout', onMouseOut, false);
        },
        expand(){
            let el = element;
            checkParent(el);
            if(inside) return;
            inside = true;
            //lastClass = 'paperized-enlarge-50-50';
            //return Promise.resolve(null).then(v=>{})
            setTimeout(()=>{
                console.log('varval ',css.closer);
                console.log('varval ',css.cssGet('closer'));
                if(!inside) return;
                lastClass = getClass(50, 50);
                let rect = el.getBoundingClientRect();
                let size = getDocSize();
                //console.log('size.width ',size.width)
                //console.log('rect.right + 60 ',rect.right + 60)
                if(rect.left < 40){
                    //lastClass = 'paperized-enlarge-0-50';
                    lastClass = getClass(0, 50);
                }else if(rect.right + 40 > size.width){
                    //lastClass = 'paperized-enlarge-center-right';
                    lastClass = getClass('center', 'right');
                }
                el.classList.add(lastClass);
                self.active.push(el);
            }, self.expandDelay);
        },
        shrink(){
            let el = element;
            el.classList.remove(lastClass);
            inside = false;
        }
    };

    function getClass(y, x){
        return `paperized-enlarge-${y}-${x}-${id}`;
    }

    const onMouseOver = event=>{
        me.expand();
    };

    const onMouseOut = event=>{
        me.shrink();
    };

    element.addEventListener('mouseover', onMouseOver, false);
    element.addEventListener('mouseout', onMouseOut, false);

    this.applied.push(me);

    return this;
}
