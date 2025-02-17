const creazioneMiddleware = () => {
    return {
        load: async () => {
            const response = await fetch("/images");
            const json = await response.json();
            return await json;
        },
        delete: async (id) => {
            const response = await fetch(`/delete/` + id, 
            { method: "DELETE" });
            const json = await response.json();
            return json;
        },
        upload: async (inputFile) => {
            const formData = new FormData();
            formData.append("file", inputFile.files[0]);
            const body = formData;
            const fetchOptions = { 
                method: "POST",
                body: body 
            };
            try{
                const res = await fetch("/upload", fetchOptions);
                const data = await res.json();
                console.log(data);
                
            } catch (e){
                console.log(e)
            }
        }
    };
};

const controller = async (middleware) => {
    const template = `
    <tr>
        <td><img src="$URL" style="width: 600px; height: 600px;" /></td>
        <td> button id= "$ID" type= "button" class= "delete btn btn-button" style="background-color:blue">ELIMINA</button></td>
        </tr>`;
    
    const render = (list) => {
    };
    
    const inputFile = document.querySelector("#file");
    const button = document.querySelector("#button");
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
