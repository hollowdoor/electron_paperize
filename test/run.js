const fs = require('fs');
const path = require('path');
const paperize = require('../');
const hovers = new paperize.HoverBox({id: 'stuff'});
const floats = new paperize.FloatingBox({id: 'stuff'});
const images_dir = path.join(process.cwd(), 'img');
paperize.addStyles({id:'stuff', scaler: 'scale(3)'});
readdir(images_dir)
.then(files=>{
    files.map(file=>{
        return path.join(images_dir, file);
    }).forEach(file=>{
        let img = createImageElement(file);
        let div = createParent(img);
        //div.appendChild(img);
        //paperize(div, {id: 'stuff'});
        hovers.add(img);
        document.body.appendChild(div);
    });

    let input = createInput('Hello world');
    let div = createParent(input);
    //paperize(div, {id: 'stuff', type: 'floating'});
    floats.add(div);
    document.body.appendChild(div);
})
.catch(err=>console.log(err));

function createImageElement(src){
    let img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';

    return img;
}

function createVideoElement(src){
    let video = document.createElement('video');
    video.src = src;
    video.style.width = '100%';
    return img;
}

function createInput(value){
    let input = document.createElement('input');
    input.value = value || '';
    input.style.padding = '2px 4px 2px 4px';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.border = '1px solid black';
    input.style.boxShadow = 'inset 1px 1px 2px black';
    return input;
}

function createParent(child){
    let div = document.createElement('div');
    div.style.width = '60px';
    div.style.display = 'inline-block';
    div.style.position = 'relative';
    div.style.margin = '3px';
    div.appendChild(child);
    return div;
}

function readdir(dir){
    return new Promise((resolve, reject)=>{
        fs.readdir(dir, (err, files)=>{
            if(err) return reject(err);
            resolve(files);
        });
    });
}
