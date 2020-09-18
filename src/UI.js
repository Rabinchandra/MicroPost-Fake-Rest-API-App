import { updatePost, displayPosts } from './app';
import http from './EasyHttp';


class UI {
    constructor() {
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.btnsContainer = document.querySelector(".btnsContainer");
        this.postBtn = document.querySelector('.post');
        this.itemList = document.querySelector('.item-list');
        this.state = 'add';
        this.itemId = null;
    }

    displayPosts() {
        http.get()
            .then(posts => {
                this.itemList.innerHTML = '';
                for(let i = 0; i < posts.length; i++) {
                    this.itemList.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                        <h4 class="card-title">${posts[i].title}</h1>
                        <p class="card-text">${posts[i].body}</p>
                        <i class="fas fa-pencil-alt mr-3 edit" data-id="${posts[i].id}"></i>
                        <span class="h2 delete" data-id="${posts[i].id}">&times;</span>
                        </div>
                    </div>
                    `;
                }
            });
    }

    clearInput() {
        console.log('clear input')
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    changeState() {
        if(this.state == 'add') {
            // Change state to modify state
            this.modifyState();
        } else {
            this.addState();
        }
    }
    
    addState() {
        // Change state to add state
        this.btnsContainer.innerHTML = `
        <input type="button" class="form-control btn  btn-primary mt-3 post" value="Post it">
        `;
        this.state = 'add';
        // Clearing input fields
        ui.clearInput();
    }
    
    modifyState() {
        this.btnsContainer.innerHTML = `
            <button class="form-control btn btn-warning update mt-3"><i class="fas fa-edit"></i> Update Post</button>
            <button class="form-control btn btn-primary cancel mt-3">Cancel</button>
        `;
        this.state = 'modify';
        // Adding event Listeners to update and cancel
        document.querySelector('.update').addEventListener('click', () => {
            updatePost(this.itemId);
            this.displayPosts();
        });
        document.querySelector('.cancel').addEventListener('click', () => {
            this.addState();
        });
    }
}

export const ui = new UI();