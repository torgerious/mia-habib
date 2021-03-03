<template>
    <div>
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <button @click="login(email, password)">login</button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import firebase from 'firebase';


    @Component({
        components: {},
    })

    export default class Login extends Vue {
        email:string = "";
        password:string = "";




        login(email:string, password:string):void{
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user;
                    console.log("user", user);
                    this.$router.push("/profile");
                    // ...
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    alert(errorCode);
                });
        }
    }

</script>

<style lang="scss" scoped>
</style>
