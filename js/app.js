//Component UserData
let UserData = {
    template: `<div>    
        <h2>{{user.name}}</h2>
            <p></p>
        </div>`
}
// Vuejs - Root-Element
let vm = new Vue({
    el: '#app',
    data: {
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
        }
    }
});