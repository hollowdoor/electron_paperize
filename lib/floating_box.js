const mousePosition = require('./mouse_position');

module.exports = class FloatingBox {
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
        init.call(this, element);
    }
    destroy(){
        this.applied.forEach(el=>el.destroy());
    }
}

function init(element){
    const {id} = this;
    const self = this;

    element.classList.add('paperized-floating');

    let mouse = mousePosition();

    let me = {
        destroy(){
            element.removeEventListener('click', onClick, false);
        },
        expand(){
            element.classList.add('paperized-float-out');
        },
        shrink(){
            element.classList.remove('paperized-float-out');
        },
        expanded(){
            return element.classList.contains('paperized-float-out');
        }
    };

    function onClick(event){
        if(!me.expanded()){
            me.expand();
        }else{
            me.shrink();
        }
    }

    function onBodyClick(event){
        if(me.expanded() && !mouse.inside(element)){
            me.shrink();
        }
    }


    element.addEventListener('click', onClick, false);
    document.addEventListener('click', onBodyClick);
    this.applied.push(me);
    return this;
}
