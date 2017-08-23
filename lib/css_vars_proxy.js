const decamelize = require('decamelize');

module.exports = function cssVars(){
    let allstyles = getComputedStyle(document.documentElement);

    const css = {
        setProperty(name, value, priority){
            document.documentElement
            .style.setProperty(name, value, priority);
        },
        getProperty(name){
            let v = (allstyles.getPropertyValue(name) + '').trim();
            //Like a real property
            if(!v.length) return undefined;
            return v;
        },
        cssGet(name){
            return this.getProperty('--'+decamelize(name, '-'));
        },
        cssSet(name, value, priority){
            name = '--'+decamelize(name, '-');
            /*
            Setting variables, from variables works different.
            document.documentElement.style.setProperty("--my-bg-colour", "var(--my-fg-colour)");*/

            if(/[-]{2}/.test(value)){
                this.setProperty(name, `var(--${decamelize(value)})`, priority);
            }else {
                this.setProperty(name, value, priority);
            }
        }
    };

    return new Proxy(css, {
        get(target, name){
            if(target[name]) return target[name];
            return target.cssGet(name);
        },
        set(target, name, value){
            target.cssSet(name, value);
        }
    });
};
