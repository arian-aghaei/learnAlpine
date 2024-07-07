import Alpine from 'alpinejs'
import {data} from "alpinejs/src/datas.js";

window.Alpine = Alpine

// let res = []
// async function tableData() {
//     let data = await fetch('https://jsonplaceholder.typicode.com/users');
//     let success = await data.json()
//     return success;
// }
//
// res = tableData()


Alpine.data('users', () => ({
    users: [],
    async init() {
        const data = JSON.parse(localStorage.getItem('users')) ?? [];

        if (data.length) {
            this.users = data
        } else {
            this.users = await this.fetchUser();
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    },
    async fetchUser() {
        return await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    },
    deleteUser(id) {
        this.users = this.users.filter(item => item.id != id)
        localStorage.setItem('users', JSON.stringify(this.users));
        let posts = JSON.parse(localStorage.getItem('posts')) ?? [];
        if(posts.length){
            posts = posts.filter(post => post.userId != id)
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    }
}))

Alpine.data('posts', () => ({
    posts : [],
    userId : null,
    async init(){
        const data = JSON.parse(localStorage.getItem('posts')) ?? [];

        if (data.length) {
            this.posts = data
        } else {
            this.posts = await this.fetchPost();
            localStorage.setItem('posts', JSON.stringify(this.posts));
        }
        this.filterPosts();
    },
    async fetchPost() {
        return await (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
    },
    filterPosts(){
        this.posts = JSON.parse(localStorage.getItem('posts')) ?? [];
        this.posts = this.posts.filter(item=> item.userId == this.userId);
        this.userId = null;
        document.getElementById("getId").blur()

    },
    deletePost(id){
        this.posts = this.posts.filter(post => post.id != id);
    }
}))

Alpine.start()