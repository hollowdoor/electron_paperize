

module.exports = function getDocSize(){
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight,
                           html.clientHeight, html.scrollHeight, html.offsetHeight );

   var width = Math.max( body.scrollWidth, body.offsetWidth,
                          html.clientWidth, html.scrollWidth, html.offsetWidth );

    return {height, width};
};
