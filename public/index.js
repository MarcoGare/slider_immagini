const creazioneMiddleware = () => {
    return {
        load: async () => {
            const response = await fetch("/images");
            return await response.json();
        },
        delete: async (id) => {
            await fetch(`/delete/${id}`, { method: "DELETE" });
        },
        upload: async (inputFile) => {
            const formData = new FormData();
            formData.append("file", inputFile.files[0]);
            await fetch("/upload", { method: "POST", body: formData });
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
