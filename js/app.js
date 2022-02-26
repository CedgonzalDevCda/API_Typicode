//Component UserData
let UserData = {
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

// Vuejs - Root-Element
let vm = new Vue({
    el: '#app',
    data: {
        user:'',
        tasks:[],
        userObj:'',
        userName: '',
        userId: '',
        users: []
    },
    components: {
        'user-data' : UserData,
    },
    created: function (){
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
            } catch(e) {
            console.error('ERREUR', e)
            }
        },
        findUser: function() {
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
        displayTask: async function () {
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}/todos/`)
            let tasks = await 
            response.json()
            this.tasks = tasks
        }
    }
});