<template>
  <div id="side-bar__user-info">
    <div v-if="this.user" @click.stop="onClickUserInfo" id="user-info">
      <h1>{{ this.user.name }}</h1>
      <h2>{{ this.user.email }}</h2>
    </div>
    <button id="logout-btn" @click="onLogOut" title="Log out">
      <i class="fas fa-sign-out-alt"></i>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SideBarUserInfo",
  methods: {
    onLogOut() {
      this.$store.dispatch("resetState");
      delete localStorage.token;
      this.$router.push("/login");
    },
    onClickUserInfo() {
      this.$router.push({ name: "Update" });
    }
  },
  computed: mapState(["user"])
};
</script>

<style scoped>
#side-bar__user-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  border-bottom: 0.5px solid rgb(69, 81, 95);
  padding: 15px;
  height: 70px;
  cursor: pointer;
}

h1 {
  font-size: 1.2em;
  margin: 0;
}

h2 {
  font-size: 0.9em;
  font-weight: normal;
  margin: 0;
  color: lightgrey;
}

#logout-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

#logout-btn:hover {
  background-color: darkgray;
}

#logout-btn > .fa-sign-out-alt {
  font-size: 15px;
}
</style>
