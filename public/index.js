import { createNavigator } from "./navigator.js";
import {login} from"./login.js";
const navigator = createNavigator(document.querySelector("#container"));
const log=login();

const creazioneMiddleware = () => {
    return{
        load: async () =>{
            const response = await fetch("/images");
            const json = await response.json();
            return json;
        },
        delete: async (id) =>{
            const response = await fetch("/delete/" + id, {
                method: "DELETE",
            });
            const json = await response.json();
            return json;
        },
        upload: async(inputFile) => {
            const formData = new FormData();
            formData.append("file", inputFile.files[0]);
            const body = formData;
            const fetchOptions = {
                method: 'post',
                body: body
            };
            try{
                const res = await fetch ("/upload", fetchOptions);
                const data = await res.json();
                console.log(data);
            }catch (e){
                console.log(e);
            };
        }
    };
};

const controller = async (middleware) => { 
    const inputFile = document.querySelector("#file");
    const button = document.querySelector("#button"); 
    const tables =document.getElementById("#tables")
    const praga =document.getElementById("#praga")


    const renderPraga =(list)=>{
        let html = '';
        for (let i=0; i < list.lenght; i++){
            const foto = list[i];
            let active = '';
            if (i=== 0){
                active= 'active';
            }
            html += '<div id="' + foto.id + '" class="carousel-item' + active + '">'+
            '<img src="' + foto.name + '" style="width: 1000px; height: 600px;" alt="Immagine ' + foto.id + '" />'+
            '</div>';
        }
        praga.innerHTML =html;
    };

    
    button.onclick = async () => {
        await middleware.upload(inputFile);
        middleware.load().then(render);
    };
    
    window.deleteImage = async (id) => {
        await middleware.delete(id);
        middleware.load().then(render);
    };

    middleware.load().then(render);
};

controller(creazioneMiddleware());
