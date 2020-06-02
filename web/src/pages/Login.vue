<template>
  <div class="login">
    <video :src="videoSrc" autoplay muted loop></video>
    <v-card width="370" raised>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>4S店管理系统</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <form>
          <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            label="用户名"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
            :counter="6"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            :type="showPassword ? 'text' : 'password'"
            label="密码"
            hint="密码最少6位"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="canSubmit" raised @click="handleLogin">
          登陆
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import videoSrc from "@/assets/video_bg.mp4";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import api from "@/api/index";
export default {
  name: "Login",
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required, maxLength: maxLength(6) }
  },
  data() {
    return { videoSrc, username: "", password: "", showPassword: false };
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("请输入用户名！");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push("密码最少6位！");
      !this.$v.password.required && errors.push("请输入密码！");
      return errors;
    },
    canSubmit() {
      return !this.$v.password.$dirty && !this.$v.username.$dirty;
    }
  },
  mounted() {
    const username = localStorage.getItem("username") ?? "";
    const password = localStorage.getItem("password") ?? "";
    this.username = username;
    this.password = password;
    this.$v.username.$touch();
    this.$v.password.$touch();
  },
  methods: {
    async handleLogin() {
      const { username, password } = this;
      this.$store.commit("toggleGlobalLoading", {
        show: true,
        text: "登陆中。。。"
      });
      const res = await api.user.login({
        username,
        password,
        // eslint-disable-next-line no-undef
        device: new Browser(),
        deviceID: localStorage.getItem("deviceID")
      });
      if (res.code === 0) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        sessionStorage.setItem("session", res.session);
        this.$store.commit("updateUserInfo", {
          username,
          isAdmin: res.isAdmin,
          login: true
        });
        await this.$router.push("/dashboard/customerreception");
      }
    }
  }
};
</script>

<style lang="scss" src="../css/login.scss"></style>
