const EventEmitter = require('events');
let pos;

class MousePosition extends EventEmitter {
    constructor(){
        super();
        const self = this;
        this.x = 0;
        this.y = 0;
        function onMove(event){
            self.x = event.clientX;
            self.y = event.clientY;
        }

        function onDown(){
            self.down = true;
            self.up = true;
        }

        function onUp(){
            self.down = false;
            self.up = true;
        }

        window.addEventListener('mousemove', onMove, false);
        window.addEventListener('mousedown', onDown, false);
    }
    inside(element){
        let rect = element.getBoundingClientRect();
        return (this.x > rect.left && this.x < rect.right && this.y < rect.bottom && this.y > rect.top);
    }
}

module.exports = function mouseXY(){
    if(pos) return pos;
    pos = new MousePosition();
    return pos;
};
