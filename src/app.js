import { ui } from './UI';
import http from './EasyHttp';

export const updatePost = function() {
    const modifiedData = {
        title: ui.titleInput.value,
        body: ui.bodyInput.value
    }

    http.update(modifiedData, ui.itemId)
        .then(() => {
            ui.displayPosts();
            ui.clearInput();
        });
}


// Displaying posts on dom load
document.addEventListener('DOMContentLoaded', () => {
    ui.displayPosts();
})

// Add post event
ui.postBtn.addEventListener('click', postData);

function postData() {
    console.log('post starts');
    const data = {
        title: ui.titleInput.value,
        body: ui.bodyInput.value
    }
    
    http.post(data)
        .then(() => {
            console.log('Posted')
            ui.displayPosts();
            ui.clearInput();
        });
}

// Edit or Delete button click
document.body.addEventListener('click', (e) => {
    const classList = e.target.classList;
    if(classList.contains('edit') || classList.contains('delete')) {
        const parent = e.target.parentElement;
        ui.itemId = e.target.getAttribute('data-id');

        if(classList.contains('edit')) {
            // Update state display
                  
            // Title and body of the current post
            const title = parent.querySelector('.card-title').textContent;
            const body = parent.querySelector('.card-text').textContent;
            
            ui.titleInput.value = title;
            ui.bodyInput.value = body;
            
            // State Change
            ui.changeState();

        } else {
            // Delete
            if(confirm('Are you sure want to delete')) {
                http.delete(ui.itemId)
                    .then(() => ui.displayPosts());
            }
        }

    }
});