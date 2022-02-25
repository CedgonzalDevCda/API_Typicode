// Vuejs - Root-Element
let vm = new Vue({
    el: '#app',
    data: {
        users: []
    },
    created: function (){
        this.loadUsers()
    },
    methods: {
        loadUsers: async function () {
            try {
            let response = await fetch('https://jsonplaceholder.typicode.com/users')
            let users = await 
            response.json()
            this.users = users
            } catch(e) {
            console.error('ERREUR', e)
            }
        }
    }
});