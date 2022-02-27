//Component UserProfile
let UserProfile = {
    template: `
        <div>    
            <h2>{{user.name}} ({{ user.username }})</h2>
            <p>Id n°{{ user.id }}</p>
            <ul>
                <li>e-mail: {{ user.email }}</li>
                <li>tel: {{ user.phone }}</li>
                <li>web: {{ user.website }}</li>
            </ul>
            <p><i>Adresse: {{ user.address.street }}, {{ user.address.suite }} {{ user.address.zipcode }}</i></p>
            <p>Entreprise: {{ user.company.name }}</p>
        </div>`,
    props: ['user']
}

//Component UserTask
let UserTask = {
    template: `
    <div>
        <h2>Liste des tâches de {{ user.name }}</h2>
        <ul>
            <li v-for="task of tasks" :style="{ color: completedStyle(task) }">
                <span >Title of task: {{ task.title }} </span> 
                >> {{ task.completed == true ? 'Completed' : 'Not treated'}}
            </li>
        </ul>
    </div>`,

    methods: {
        // Function to change the color of a task | completed (green) | treated (red) 
        completedStyle: function (task) {
            return task.completed ? 'green' : 'red'
        }
    },
    props: ['user', 'tasks']
}
// Component UserAlbum
let UserAlbum = {
    data: function () {
        return {
            photos : [], 
            albumId: '',
            albumTitle: ''
        }
    },
    template: `
    <div>
        <h2>Liste des albums de {{ user.name }}</h2>
        <ul>
            <li v-for="album of albums">
                <span>title: {{ album.title }}</span> |
                <span :style="{ textDecoration: 'underline' , cursor: 'pointer' }" 
                      @click="displayPicture(album)">

                        <strong>Voir les Photos</strong>
                </span>
            </li>
        </ul>
        <h2 v-if="albumTitle !== '' ">Photos de l'album " {{ albumTitle }} "</h2>
        <div v-for="photo of photos">
            <div :style="{ border: '1px solid black'}">
                {{ photo.title}}<br>
                <img :src="photo.url">
            </div>
        </div>
    </div>
    `,
    methods: {
        displayPicture: async function (album) {
            let albumId = album.id
            let albumTitle = album.title
            let response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos/`)
            let photos = await
            response.json()
            //update data UserAlbum
            this.photos = photos
            this.albumId = albumId
            this.albumTitle = albumTitle 
            console.log(photos)
        }
    },
    props: ['user', 'albums']
}

//Component UserArticle
let UserArticle = {
    data: function () {
        return {
            comments : [], 
            postId: '',
            postTitle: '',
            postBody:''
        }
    },
    template: `
    <div>
        <h2>Liste des articles de {{ user.name }}</h2>
        <ul>
            <li v-for="post of posts">
                <span>title: {{ post.title }}</span>
                <span :style="{ textDecoration: 'underline' , cursor: 'pointer' }" 
                @click="displayComment(post)">
                  <strong>Afficher les commentaires</strong>
          </span>

            </li>
        </ul>
        <h2 v-if="postTitle !== '' ">Commentaires liés à l'article " {{ postTitle }} "</h2>    
        <div>{{ postBody }}</div>
        <div v-for="comment of comments">
            <div :style="{ border: '1px solid black' , textAlign: 'end' }">
                <strong>Commentaire</strong><br>
                {{ comment.name}} ( {{ comment.email }} )<br>
                {{ comment.body}}
            </div>
        </div>

    </div>
    `,
    //
    methods: {
        displayComment: async function (post) {
            let postId = post.id
            let postTitle = post.title
            let postBody = post.body
            let response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            let comments = await
            response.json()
            //update data UserArticle
            this.comments = comments
            this.postTitle = postTitle
            this.postBody = postBody 
            console.log(comments)
        }
    },
    props: ['user', 'posts']
}

// Vuejs - Root-Element
let vm = new Vue({
    el: '#app',
    data: {
        user: '',
        tasks: [],
        albums: [],
        posts: [],
        photos: [],
        comments: [],
        userObj: '',
        userName: '',
        userId: '',
        users: []
    },
    components: {
        'user-profile': UserProfile,
        'user-task': UserTask,
        'user-album': UserAlbum,
        'user-article': UserArticle,
    },
    created: function () {
        this.loadUsers()
    },

    methods: {
        //Load users from API
        loadUsers: async function () {
            try {
                let response = await fetch('https://jsonplaceholder.typicode.com/users')
                let users = await
                response.json()
                this.users = users
            } catch (e) {
                console.error('ERREUR', e)
            }
        },
        // find the user    
        findUser: function () {
            this.userObj = this.users.find((user) => user.name == this.userName)
            this.userId = this.userObj.id
            this.loadUser()
            this.userObj = null
        },
        // Load user selected from users
        loadUser: async function () {
            let response = await fetch('https://jsonplaceholder.typicode.com/users/' + this.userId)
            let user = await
            response.json()
            this.user = user
        }, 
        // Display the tasks linked to the user selected
        displayTask: async function () {
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}/todos/`)
            let tasks = await
            response.json()
            this.tasks = tasks
        },
        // Display the albums linked to the user selected
        displayAlbums: async function () {
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}/albums/`)
            let albums = await
            response.json()
            this.albums = albums
        },
        // Display the articles linked to the user
        displayArticles: async function () {
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}/posts/`)
            let posts = await
            response.json()
            this.posts = posts
        },
    }
});