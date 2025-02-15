const creazioneMiddleware = () => {
    return {
        load: async () => {
            const response = await fetch("/images");
            const json = await response.json();
            return await json;
        },
        delete: async (id) => {
            const response = await fetch(`/delete/` = id, 
            { method: "DELETE" });
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
                
            } catch (e){
                console.log(e)
            }
        }
    };
};

const render = (images) => {
    const tableBody = document.querySelector("#image-table tbody");
    tableBody.innerHTML = "";
    images.forEach(({ id, url }) => {
        tableBody.innerHTML += `
            <tr>
                <td><img src="${url}" width="100"></td>
                <td>${url}</td>
                <td><button onclick="deleteImage(${id})" class="btn btn-danger">Elimina</button></td>
            </tr>`;
    });
};

const controller = async (middleware) => {
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
