module.exports = function waitTransform(el){
    return new Promise(resolve=>{
        function done(e){
            resolve(e);
            el.removeEventListener('transitionend', done, false);
        }

        el.addEventListener('transitionend', done, false);
    });
};
