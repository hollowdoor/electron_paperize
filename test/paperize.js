let pos;
function mousePosition(){
    if(pos) return pos;
    pos = {
        x:0, y:0,
        inside(element){
            let rect = element.getBoundingClientRect();
            return (pos.x > rect.left && pos.x < rect.right && pos.y < rect.bottom && pos.y > rect.top);
        }
    };

    function onMove(event){
        pos.x = event.clientX;
        pos.y = event.clientY;
    }

    window.addEventListener('mousemove', onMove, false);

    return pos;
}

module.exports = class Paperize {
    constructor({
        element,
        parent
    }){
        this.element = element;
        this.parent = parent;
        this.element.classList.add('paperized');
        this.parent.classList.add('paperized-parent');
        function onOver(event){

        }

        function onOut(event){

        }

        element.addEventListener('mouseover', onOver);
        element.addEventListener('mouseout', onOut);

        this.destroy = function(){
            element.removeEventListener('mouseover', onOver);
            element.removeEventListener('mouseout', onOut);
        };
    }
}
