module.exports = class Evented {
    constructor(element, listeners){
        this.listeners = listeners;
        Object.keys(listeners).forEach(name=>{
            element.addEventListener(name, this, false);
        });
    }
    handleEvent(e){
        return this.listeners[e.type](e);
    }
    destroy(){
        events.forEach(name=>{
            element.removeEventListener(name, this, false);
        });
    }
}
