<template>
    <div class="login-wrapper">
        <p @click="$router.push('/')">◀ tilbake til forside</p>
        <br><br>
        <label for="uname"><b>Email</b></label>
        <input type="email" v-model="email" name="uname">
        <label for="pass"><b>Passord</b></label>
        <input type="password" v-model="password" name="pass">
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

    .login-wrapper{
        width: 400px;
        margin: 100px auto;
        height:  auto;
    }
    label{
        width: 100%;
        display: flex;
    }

    /* Full-width input fields */
    input[type=email], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    /* Set a style for all buttons */
    button {
        background-color: #333;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }
</style>
