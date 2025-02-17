import { createNavigator } from "./navigator.js";
const navigator = createNavigator(document.querySelector("#container"));

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
const middleware= creazioneMiddleware();
const controller = async (middleware) => { 
    const inputFile = document.querySelector("#file");
    const button = document.querySelector("#button"); 
    const tables =document.getElementById("#tables")
    const praga =document.getElementById("#praga")

    const render = (list) => {
        const template = `
        <tr>
            <td><img src="$URL" style="width: 600px; height: 600px;" /></td>
            <td> button id= "$ID" type= "button" class= "delete btn btn-button" style="background-color:blue">ELIMINA</button></td>
        </tr>`;
        tables.innerHTML = list.map((element)=>{
            let row = template.replace("$ID", element.id);
            row = row.replace("$URL", element.name);
            row = row.replace("$URL", element.name);
            return row;
        }).join("\n");
        const deletebutton = document.querySelectorAll(".delete");
        deletebutton.forEach((button) => {
            button.onclick = () => {
                middleware.delete(button.id)
                .then(
                    () => middleware.load()
                ).then((list) => {
                    render(list);
                    renderPraga(list);
                });
            }
        });
    }
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
        const list = await middleware.load();
        render(list);
        renderPraga(list);
        inputFile.value=""
    };
    
    middleware.load().then((list)=> {
        renderPraga(list)
        render(list)
    })

    middleware.load().then(list);
};

controller(middleware);
