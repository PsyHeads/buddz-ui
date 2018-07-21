<template>
  <div id="signup">
    <div class="signup-form" >
      <form @submit.prevent="onSubmit" v-if="(signupStatus !== 'success')">
        <div class="input">
          <label for="username">Email</label>
          <input
                  type="email"
                  id="username"
                  v-model="username">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <!--div class="input">
          <label for="password">Password</label>
          <vue-password v-model="password"
          >
          </vue-password>
        </div-->
        <!--div class="input">
          <label for="username">Username</label>
          <input
                  type="text"
                  id="username"
                  v-model="username">
        </div-->
        <!--div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword">
        </div-->
          <div class="input">
          <label for="first-name">First Name</label>
          <input
                  type="text"
                  id="first-name"
                  v-model="firstName">
          </div>
          <div class="input">
          <label for="last-name">Last Name</label>
          <input
                  type="text"
                  id="last-name"
                  v-model="lastName">      
          </div>        
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country" >
            <option value="91" selected=true>India</option>
            <!--option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option-->
          </select>
        </div>
        <div class="input">
          <label for="phone-number">Mobile</label>
          <input
                  type="number"
                  id="phone-number"
                  v-model="phoneNumber">      
          </div>

        <!--div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :key="hobbyInput.id">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      v-model="hobbyInput.value">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
            </div>
          </div>
        </div>
        <div class="input inline">
          <input type="checkbox" id="terms" v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div-->

        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div class="input" v-if="(signupStatus === 'success')">
        <h4 style="color:green"> Sign-up successful, please login.</h4>
      </div>
      <div class="input" v-if="(signupStatus === 'failed')">
        <h4 style="color:red"> Sign-up unsuccessful, please retry.</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        countryCode: '91',
        phoneNumber: '',
        address1: '',
        address2:'',
        city:'',
        state:'',
        country: 'India',
        zipCode:'',
        signupStatus: null
      }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          countryCode: this.countryCode,
          phoneNumber: this.phoneNumber,
          address1: this.address1,
          address2: this.address2,
          city: this.city,
          state: this.state,
          country: this.country,
          zipCode: this.zipCode,
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
        .then (response => {console.log(response);this.signupStatus = response.data.status},
               error => {this.signupStatus = 'failed'}
        )
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>