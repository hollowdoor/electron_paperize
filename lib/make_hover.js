const getDocSize = require('./document_size.js');

module.exports = function makeHover(paperized){
    const {element, id} = paperized;
    let inside = false, lastClass;

    function getClass(y, x){
        return `paperized-enlarge-${y}-${x}-${id}`;
    }

    const onMouseOver = event=>{
        let el = element;
        if(!element.parentNode.classList.contains('make3D')){
            element.parentNode.classList.add('make3D');
        }
        if(inside) return;
        //inside = true;
        //lastClass = 'paperized-enlarge-50-50';
        setTimeout(()=>{
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
            console.log('lastClass ', lastClass)
            el.classList.add(lastClass);
        }, 500);

    };

    const onMouseOut = event=>{
        let el = element;
        el.classList.remove(lastClass);
        inside = false;
    };

    element.addEventListener('mouseover', onMouseOver, false);
    element.addEventListener('mouseout', onMouseOut, false);

    return {
        destroy(){
            element
            .removeEventListener('mouseover', onMouseOver, false);
            element
            .removeEventListener('mouseout', onMouseOut, false);
        }
    };
};
