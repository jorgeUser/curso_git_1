class ControleDeUsuario {

    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }

    onSubmit() {


        this.formEl.addEventListener("submit", event => {

            event.preventDefault();

            let values = this.getValores();

            this.getFoto().then(
                (conteudo)=>{
                    values.photo = conteudo;
                    this.addLinha(values);

            }, (e)=>{
                console.error(e);

            }
            );

           

        });
    } //fechando metodo onSubmit()


    getFoto() {

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {
    
                if (item.name === "photo") {
                    return item;
                }
    
    
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = () => {
    
                
                resolve(fileReader.result);
    
            };

            fileReader.onerror=()=>{

                reject(e);

            }
    
            fileReader.readAsDataURL(file);

        });

       
    }

    getValores() {

        let user = {};
        // vamos usar o spred ... para n precisar dizer de forma antecipada quantos itens tem nesse array
        [...this.formEl.elements].forEach(function (field, index) {


            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }


            } else {

                user[field.name] = field.value;
            }

        });

        return new Usuario(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    } // fechando a classe getValues()

    

    addLinha(dataUser) {

        this.tableEl.innerHTML = `
    
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${dataUser.admin}</td>
                    <td>${dataUser.birth}</td>
                    <td>
                      <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                     <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                   </td>
        `;

    }




}