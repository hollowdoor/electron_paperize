

/*module.exports = function makeFloating(paperized){
    const {element, id} = paperized;

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
    return me;
};*/
