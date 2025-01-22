<template>
    
    <div class="login-page">
        <h1>Trajectory Tuner</h1>
        <h2>Sign Up Here</h2>
        <div class="error" ref="error" v-if="showError">
          <div class="error-box">
            <h2 style="margin: auto; margin-top: 18px; width: 80%; height: fit-content; border-bottom: 1px white solid;">Error</h2>
            <div>
              <p style="color: rgb(200, 200, 200); font-size: 16px">
                {{ errorMessage.reason }}
                <br> 
                <span v-html="errorMessage.suggestion"></span>
              </p>

              <div class="closeButton" style="margin: 20px" @click="showError = false">Close</div>
            </div>
          </div>
        </div>
        <div class="login-box">
            <input autocomplete="off" type="text" placeholder="username" v-model="username">
            <input autocomplete="off" type="password" placeholder="password" v-model="password">
            <input autocomplete="off" type="password" placeholder="repeat password" v-model="password2">
            <button class="login" @click="signup">Sign Up</button>
        </div>
        Already have an account? <b><router-link to="/">Log In instead!</router-link></b>
    </div>
  </template>
  
  <script>
  import Graph from './components/Graph.vue'
  import {backendURL} from './App.vue'
  import Cookies from 'js-cookie'
import { useRouter } from 'vue-router';
  
  export default {
    name: 'Signup',
    components: {
    },
    data() {
      return {
        username: '',
        password: '',
        showError: false,
        errorMessage: {
          reason: 'Passwords do not match!',
          suggestion: 'Please make sure that both password fields are the same then try again.',
        },
        router: useRouter(),
      }
    },
    methods: {
      displayError(error, suggestion) {
        this.errorMessage.reason = error;
        this.errorMessage.suggestion = suggestion;
        this.showError = true;
      },

      async signup() {
        const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        let special = false;
        if( this.username.match(format) || this.password.match(format)){
          special = true;
        }

        if(this.username == '') {
          this.displayError('Username cannot be blank!', 'Create a username then try again.');
        }
        else if(this.password.length < 6) {
          this.displayError('Password must be 6 or more characters!', 'Create a stronger password then try again.');
        }
        else if(this.password != this.password2) {
          this.displayError('Passwords do not match!', 'Please make sure that both password fields are the same then try again.');
        }
        else if(special) {
          this.displayError('Username and password may not contain special characters!', 'Please make your credentials more normal then try again.');
        }
        else {
          console.log("URL is: " + backendURL + "/graphql");
          let results = await fetch(backendURL + "/graphql",{
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              query: `
              mutation {
                register(username: "${this.username}", password: "${this.password}") {
                  username
                }
              }
              `
            })

          });
          try {
            let data_json = await results.json();
            const response_username = data_json.data.register.username;
            if(response_username != this.username) {
              this.displayError('Error signing up', 'Please try again');
              return;
            }

            let results2 = await fetch(backendURL + "/graphql",{
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                query: `
                mutation {
                  login(username: "${this.username}", password: "${this.password}")
                }
                `
              })

            });
            let data_json2 = await results2.json();
            const response_token = data_json2.data.login;
            Cookies.set('token', response_token);
            console.log("hello!");
            this.router.push({path: '/level/0'});

          }
          catch(e) {
              this.displayError('Error signing up', e.toString());
              return;
          }
        }
      }
    }
  
  }
  </script>
  
  <style>
  h1 {
    font-weight: normal;
    font-size: 48pt;
  }

  h2 {
    font-weight: normal;
  }

  a {
    color: #eeeeee;
  }
  .login-page {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    vertical-align: center;
    height: calc(100vh - 50px);
  }

  .login-box {
    display: flex;
    flex-direction: column;
    background-color: #232d38;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 4px 4px 16px #111111;
  }

  .login {
    background-color: rgb(11, 133, 86);
    padding: 3px;
    color: white;
    border-radius: 5px;
    border: 0px;
    box-shadow: 4px 4px 16px #111111;
    font-size: 24px;
    transition: 0.3s ease;
  }

  .login:hover {
    background-color: rgb(60, 201, 128);
    box-shadow: 4px 4px 16px #88eea8;
    transition: 0.3s ease;
  }


  .error {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;

    /* Glassy blur effect */
    background: rgba(8, 8, 8, 0.5);
    backdrop-filter: blur(2px);
  }
  .error-box {
    color: white;
    width: 350px;
    height: fit-content;
    border-radius: 7px;
    background: rgba(5, 5, 5, 0.925);
    backdrop-filter: blur(2px);
    text-align: center;
  }

  .closeButton {
    cursor: pointer;
    background: rgba(26, 26, 26, 0.301);
    color: white;
    padding: 8px;
    border-radius: 5px;
    font-size: 18px;
    transition: 0.3s ease;
  }
  .closeButton:hover {
    transition: 0.3s ease;
    transform: scale(1.05);
  }
  </style>