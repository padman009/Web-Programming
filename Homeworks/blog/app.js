var HttpClient = function() {
    this.get = function(aUrl, formData, aCallback) {
        let anHttpRequest = new XMLHttpRequest();
        
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "POST", aUrl);            
        anHttpRequest.send( formData );
    }
}

var Blog = function(id, client){
    this.el         = document.getElementById(id);
    this.client     = client;
    this.blogs      = [];
    this.blog       = {};

    this.init = function(){
    	this.get_blogs()
    }

    this.get_blogs = function(){
        let vm = this;
        let formData = new FormData();
        formData.append("mode","getallblogs");
        this.client.get('blog.php', formData, function(response) {
            response = JSON.parse(response);
            response.status ? vm.render('blogs', response.data, vm.el) : alert('Response not load')
        });

    }

    this.new_blog = function(data){
        let formData = new FormData();
        formData.append("mode","newblog");
        for(key in data){
            formData.append(key, data[key]);
        }
        this.client.get("blog.php", formData, function(response) {
            response = JSON.parse(response);
            alert(!response.status ? 'Somethig wrong with adding blog.\nCheck internet connection.' : 'Blog added successfully');
            if(response.status){
                document.getElementById('blog-title').value = '';
                document.getElementById('blog-description').value = '';
                document.getElementById('blog-content').value = '';
            }
        });
        
        this.init();
    }

    this.update_blog = function(data, id){
        let formData = new FormData();
        formData.append("mode", "getblog");
        formData.append("id", id);
        this.client.get("blog.php", formData, function(response){
            response = JSON.parse(response);
            if(!response.status) alert('Somethig wrong with updating blog.\nCheck internet connection.');
            let formData = new FormData();
            formData.append("mode","updateblog");
            formData.append("id", id);
            for(key in data){
                formData.append(key, ((response.data[key] !== data[key]) ? data[key]:"-"));
            }

            this.client.get("blog.php", formData, function(response){
                response = JSON.parse(response);
                alert(!response.status ? 'Somethig wrong with updating blog.\nCheck internet connection.' : 'Blog updated successfully');
            });

        });

        this.init();
    }

    this.delete_blog = function(id){
        let formData = new FormData();
        formData.append("mode", "deleteblog");
        formData.append("id", id);
        this.client.get("blog.php", formData, function(response) {
            response = JSON.parse(response);
            alert(!response.status ? 'Somethig wrong with deleting blog.\nCheck internet connection.' : 'Blog deleted successfully');
        });

        this.init();
    }

    this.render = function(mode = 'blogs', data, to){
    	switch (mode) {
            case 'blogs':
                to.innerHTML = '';
                data.forEach(el => {
                    let div = document.createElement('div');
                    div.classList.add("col-md-4");

                    let h2 = document.createElement('h2');
                    h2.innerHTML = el.title;

                    let pin = document.createElement('p');
                    pin.innerHTML = el.description;

                    let btnContainer = document.createElement("div");
                    btnContainer.classList.add("container");

                    let btn = document.createElement('button');
                    btn.innerHTML = 'Read more...';
                    btn.setAttribute('class', 'btn btn-light');
                    btn.setAttribute('data-toggle', 'modal');
                    btn.setAttribute('data-target', '#blog' + el.id);

                    let btnUpd = document.createElement('button');
                    btnUpd.innerHTML = `Update
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>`;
                    btnUpd.setAttribute('class', 'btn btn-secondary text-center');
                    btnUpd.setAttribute('data-toggle', 'modal');
                    btnUpd.setAttribute('data-target', '#modalUpdblog' + el.id);
                    
                    let btnDel = document.createElement('button');
                    btnDel.innerHTML = `Delete
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>`;
                    btnDel.setAttribute('class', 'btn btn-danger');
                    btnDel.setAttribute('data-toggle', 'modal');
                    btnDel.setAttribute('data-target', '#modalDelblog' + el.id);

                    //modal for update blog
                    let modalUpd = document.createElement('div');
                    {
                    modalUpd.id = 'modalUpdblog' + el.id;
                    modalUpd.setAttribute('class', 'modal fade');
                    modalUpd.setAttribute('aria-hidden', 'true');

                    let modal_dialog = document.createElement('div');
                    modal_dialog.setAttribute("class", "modal-dialog modal-lg modal-dialog-centered");
                    
                    let modal_content = document.createElement('div');
                    modal_content.classList.add("modal-content");

                    let modal_header = document.createElement('div');
                    modal_header.classList.add("modal-header");

                    let modal_header_h5 = document.createElement('h5');
                    modal_header_h5.classList.add("modal-title");
                    modal_header_h5.innerHTML = "Update Blog";

                    let modal_header_close = document.createElement('button');
                    modal_header_close.classList.add("close");
                    modal_header_close.setAttribute('type', 'button');
                    modal_header_close.setAttribute('data-dismiss', 'modal');
                    modal_header_close.setAttribute('aria-label', 'Close');
                    modal_header_close.innerHTML = '&times;';

                    let modal_body = document.createElement('div');
                    modal_body.classList.add("modal-body");

                    let form = document.createElement("form"),
                        form_group_title = document.createElement("div"),
                        title_label = document.createElement("label"),
                        title_input = document.createElement("input"),
                        form_group_description = document.createElement("div"),
                        description_label = document.createElement("label"),
                        description_textarea = document.createElement("textarea"),
                        form_group_content = document.createElement("div"),
                        content_label = document.createElement("label"),
                        content_textarea = document.createElement("textarea");
                    
                    form_group_title.setAttribute("class", "form-group");
                    form_group_description.setAttribute("class", "form-group");
                    form_group_content.setAttribute("class", "form-group");
                    
                    title_label.setAttribute("for", el.id + ":blog-title");
                    title_label.setAttribute("class", "col-form-label");
                    title_label.innerHTML = 'Title:';
                    
                    title_input.setAttribute("type", "text");
                    title_input.setAttribute("class", "form-control");
                    title_input.setAttribute("id", el.id + ":blog-title");
                    title_input.value = el.title;
                    
                    description_label.setAttribute("for", el.id + ":blog-description");
                    description_label.setAttribute("class", "col-form-label");
                    description_label.innerHTML = 'Description:';
                    
                    description_textarea.setAttribute("class", "form-control");
                    description_textarea.setAttribute("id", el.id + ":blog-description");
                    description_textarea.value = el.description;
                    
                    content_label.setAttribute("for", el.id + ":blog-content");
                    content_label.setAttribute("class", "col-form-label");
                    content_label.innerHTML = 'Content:';
                    
                    content_textarea.setAttribute("class", "form-control");
                    content_textarea.setAttribute("id", el.id + ":blog-content");
                    content_textarea.value = el.content;
                    
                    let btnUpdContainer = document.createElement("div");
                    btnUpdContainer.classList.add("container");
                    btnUpdContainer.setAttribute("style", "text-align:center;");

                    let confirm_upd_btn = document.createElement('button');
                    confirm_upd_btn.setAttribute('class', 'btn btn-danger btn-lg');
                    confirm_upd_btn.innerHTML = btnUpd.innerHTML;
                    confirm_upd_btn.addEventListener('click', function(){update_blog(el.id);unconfirm_upd_btn.click()});

                    let unconfirm_upd_btn = document.createElement('button');
                    unconfirm_upd_btn.setAttribute('class', 'btn btn-success btn-lg');
                    unconfirm_upd_btn.setAttribute('data-dismiss', 'modal');
                    unconfirm_upd_btn.style.marginRight = '20px';
                    unconfirm_upd_btn.innerHTML = 'Cancel';

                    form_group_title.appendChild(title_label);
                    form_group_title.appendChild(title_input);
                    
                    form_group_description.appendChild(description_label);
                    form_group_description.appendChild(description_textarea);
                    
                    form_group_content.appendChild(content_label);
                    form_group_content.appendChild(content_textarea);
                    
                    form.appendChild(form_group_title);
                    form.appendChild(form_group_description);
                    form.appendChild(form_group_content);

                    modal_header.appendChild(modal_header_h5);
                    modal_header.appendChild(modal_header_close);
                    modal_content.appendChild(modal_header);

                    modal_body.appendChild(form);
                    btnUpdContainer.appendChild(unconfirm_upd_btn);
                    btnUpdContainer.appendChild(confirm_upd_btn);
                    modal_body.appendChild(btnUpdContainer);
                    modal_content.appendChild(modal_body);

                    modal_dialog.appendChild(modal_content);
                    modalUpd.appendChild(modal_dialog);
                    }

                    //modal for delete blog
                    let modalDel = document.createElement('div');
                    {
                    modalDel.id = 'modalDelblog' + el.id;
                    modalDel.setAttribute('class', 'modal fade');
                    modalDel.setAttribute('aria-hidden', 'true');

                    let modal_dialog = document.createElement('div');
                    modal_dialog.setAttribute("class", "modal-dialog modal-lg modal-dialog-centered");
                    
                    let modal_content = document.createElement('div');
                    modal_content.classList.add("modal-content");

                    let modal_header = document.createElement('div');
                    modal_header.classList.add("modal-header");

                    let modal_header_h5 = document.createElement('h5');
                    modal_header_h5.classList.add("modal-title");
                    modal_header_h5.innerHTML = el.title;

                    let modal_header_close = document.createElement('button');
                    modal_header_close.classList.add("close");
                    modal_header_close.setAttribute('type', 'button');
                    modal_header_close.setAttribute('data-dismiss', 'modal');
                    modal_header_close.setAttribute('aria-label', 'Close');
                    modal_header_close.innerHTML = '&times;';

                    let modal_body = document.createElement('div');
                    modal_body.classList.add("modal-body");

                    let modal_body_p = document.createElement('p');
                    modal_body_p.innerHTML = el.content;

                    let btnDelContainer = document.createElement("div");
                    btnDelContainer.classList.add("container");
                    btnDelContainer.setAttribute("style", "text-align:center;");
                    
                    let confirm_del_btn = document.createElement('button');
                    confirm_del_btn.setAttribute('class', 'btn btn-danger btn-lg');
                    confirm_del_btn.innerHTML = btnDel.innerHTML;
                    confirm_del_btn.addEventListener('click', function(){delete_blog(el.id);unconfirm_del_btn.click()});

                    let unconfirm_del_btn = document.createElement('button');
                    unconfirm_del_btn.setAttribute('class', 'btn btn-success btn-lg');
                    unconfirm_del_btn.setAttribute('data-dismiss', 'modal');
                    unconfirm_del_btn.style.marginRight = '20px';
                    unconfirm_del_btn.innerHTML = 'Cancel';

                    modal_header.appendChild(modal_header_h5);
                    modal_header.appendChild(modal_header_close);
                    modal_content.appendChild(modal_header);

                    modal_body.appendChild(modal_body_p);
                    btnDelContainer.appendChild(unconfirm_del_btn);
                    btnDelContainer.appendChild(confirm_del_btn);
                    modal_body.appendChild(btnDelContainer);
                    modal_content.appendChild(modal_body);

                    modal_dialog.appendChild(modal_content);
                    modalDel.appendChild(modal_dialog);
                    }

                    // modal for blog
                    let modal = document.createElement('div');
                    modal.id = 'blog' + el.id;
                    modal.setAttribute('class', 'modal fade');
                    modal.setAttribute('aria-hidden', 'true');

                    let modal_dialog = document.createElement('div');
                    modal_dialog.setAttribute("class", "modal-dialog modal-lg modal-dialog-centered");
                    
                    let modal_content = document.createElement('div');
                    modal_content.classList.add("modal-content");

                    let modal_header = document.createElement('div');
                    modal_header.classList.add("modal-header");

                    let modal_header_h5 = document.createElement('h5');
                    modal_header_h5.classList.add("modal-title");
                    modal_header_h5.innerHTML = el.title;

                    let modal_header_close = document.createElement('button');
                    modal_header_close.classList.add("close");
                    modal_header_close.setAttribute('type', 'button');
                    modal_header_close.setAttribute('data-dismiss', 'modal');
                    modal_header_close.setAttribute('aria-label', 'Close');
                    modal_header_close.innerHTML = '&times;';

                    let modal_body = document.createElement('div');
                    modal_body.classList.add("modal-body");
                    
                    let modal_body_p = document.createElement('p');
                    modal_body_p.classList.add("m-3");
                    modal_body_p.innerHTML = el.content;

                    modal_header.appendChild(modal_header_h5);
                    modal_header.appendChild(modal_header_close);
                    modal_content.appendChild(modal_header);

                    modal_body.appendChild(modal_body_p);
                    modal_content.appendChild(modal_body);

                    modal_dialog.appendChild(modal_content);
                    modal.appendChild(modal_dialog);

                    btnContainer.appendChild(btn);
                    btnContainer.appendChild(btnUpd);
                    btnContainer.appendChild(btnDel);

                    div.appendChild(h2);     
                    div.appendChild(pin);
                    div.appendChild(btnContainer);
                    div.appendChild(modal);
                    div.appendChild(modalDel);
                    div.appendChild(modalUpd);
             
                    to.appendChild(div)
                });
                break;
        }
    }

}

var client = new HttpClient();
var app = new Blog('app', client)

app.init()

document.getElementById('publish_btn').addEventListener("click", add_blog);

function add_blog(){
    let data = {
        title: document.getElementById('blog-title').value,
        description: document.getElementById('blog-description').value,
        content: document.getElementById('blog-content').value,
    };
    app.new_blog(data);
}

function delete_blog(id){
    app.delete_blog(id);
}

function update_blog(id) {
    let data = {
        title: document.getElementById(id + ':blog-title').value,
        description: document.getElementById(id + ':blog-description').value,
        content: document.getElementById(id + ':blog-content').value,
    };
    app.update_blog(data, id);
}