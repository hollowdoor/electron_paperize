
module.exports = function watchBody(cb){
    let target = document.body;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation.type);
            mutation.addedNodes.forEach(node=>{
                cb(node);
            });
        });
    });

    // configuration of the observer:
    var config = { childList: true};

    // pass in the target node, as well as the observer options
    observer.observe(target, config);

    // later, you can stop observing
    return {
        destroy(){
            observer.disconnect();
        }
    };

};
