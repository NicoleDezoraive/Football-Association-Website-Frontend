<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <!-- userName -->
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback> Password is required </b-form-invalid-feedback>
      </b-form-group>

      <!-- submit -->
      <b-button
        type="submit"
        variant="primary"
        style="width: 100px; display: block"
        class="mx-auto w-100"
        >Login</b-button
      >

      <!-- Register -->
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
      <br /><br />

      <!-- alert -->
      <div class="alert" v-if="showAlert">
        <b-alert show dismissible fade variant="danger" class="m-3">{{
          messAlertRes
        }}</b-alert>
      </div>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
        showAlert: false,
        messAlertRes: "",
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        this.showAlert = false;
        const response = await this.axios.post(this.$root.store.BASE_URL + "/Login", {
          username: this.form.username,
          password: this.form.password,
        });
        // console.log(response);
        this.$root.store.login(this.form.username);
        if (this.$route.path != "/") {
          this.$router.push("/").catch();
        }
      } catch (err) {
        this.showAlert = true;
        this.messAlertRes = err.response.data;
        // this.form.submitError = err.response.data.message;
        alert(this.messAlertRes);
      }
    },
    onLogin() {
      console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("login method go");
      this.Login();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
.title {
  text-align: center;
}
.alert {
  width: 100%;
  text-align: center;
}
</style>
