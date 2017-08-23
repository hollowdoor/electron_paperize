const decamelize = require('decamelize');

module.exports = function cssVars(props = {}, {
    //all properties is the default
    //using document.documentElement
    element = document.documentElement,
    //Could be :root instead
    pseudo
} = {}){
    let allstyles = getComputedStyle(element, pseudo);

    function getName(name){
        //Computed styles contain all the properties.
        if(!allstyles[name]){
            return '--'+decamelize(name, '-');
        }
        return name;
    }

    const css = {
        setProperty(name, value, priority){
            element.style.setProperty(name, value, priority);
        },
        getProperty(name){
            let v = (allstyles.getPropertyValue(name) + '').trim();
            //Like a real property
            if(!v.length) return undefined;
            return v;
        },
        cssGet(name){
            return this.getProperty(getName(name));
        },
        cssSet(name, value, priority){
            name = getName(name);

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

    let proxy = new Proxy(css, {
        get(target, name){
            if(target[name]) return target[name];
            return target.cssGet(name);
        },
        set(target, name, value){
            target.cssSet(name, value);
        }
    });

    Object.keys(props).forEach(key=>{
        proxy[key] = props[key];
    });

    return proxy;
};
