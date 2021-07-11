<template>
    <div id="nav">
        <b-nav tabs>
            <!--  home  -->
            <b-nav-item class="nav2">
                <router-link :to="{ name: 'main' }">
                <b-icon icon="house-door"></b-icon>Home
                </router-link>
            </b-nav-item>

            <!--  search  -->
            <b-nav-item class="nav2">
                <router-link :to="{ name: 'search' }">
                    <b-icon icon="search"></b-icon>Search
                </router-link>
            </b-nav-item>

             <!--  cerrent game  -->
            <b-nav-item class="nav2">
                <router-link :to="{ name: 'currentGames' }"><b-icon icon="info-circle-fill" scale="1" ></b-icon>
                   Current Games
                </router-link>
            </b-nav-item>

            <!--  about  -->
            <b-nav-item class="nav2">
                <router-link :to="{ name: 'about' }">
                    <b-icon icon="receipt"></b-icon>About
                </router-link>
            </b-nav-item>

            <!--  Manage League  -->
            <b-nav-item class="nav2">
                <span v-if="$root.store.username=='nicoled'"  >
                        <router-link :to="{ name: 'manageLeague' }">
                            <b-icon icon="pencil-square"></b-icon>Manage League
                        </router-link>
                </span>
            </b-nav-item>

            <b-navbar-nav class="ml-auto" right>
                <!--  for guest  -->
                <span v-if="!$root.store.username">
                    <b-nav tabs fill class="nav2" right>
                        <b-nav-item disabled right> Hello Guest  :     </b-nav-item>
                        <!--  register  -->
                        <b-nav-item>
                            <router-link :to="{ name: 'register' }">
                                <b-icon icon="person-circle">  </b-icon>  Register
                            </router-link>
                        </b-nav-item>
                        <!--  login  -->
                        <b-nav-item right>
                            <router-link :to="{ name: 'login' }">
                                <b-icon icon="lock"></b-icon>Login
                            </router-link>
                        </b-nav-item>
                    </b-nav>
                </span>
                <!--  for user  -->
                <span v-else>
                    <b-nav right>
                        <!--  Favorite Games  -->
                        <b-dropdown text="Personal" size="sm" right>
                            <b-icon icon="person-lines-fill"></b-icon>
                            <b-dropdown-item :to="{ name: 'favorite' }">Favorite Games</b-dropdown-item>
                        </b-dropdown>
                        <!--  Logout  -->
                        <b-dropdown :text="$root.store.username" size="sm" right>
                            <b-dropdown-item active @click="Logout">Log Out</b-dropdown-item>
                        </b-dropdown>
                    </b-nav>
                </span>
            </b-navbar-nav>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: "App",
        methods: {
            Logout() {
            this.$root.store.logout();
            this.$root.toast("Logout", "User logged out successfully", "success");
            this.$router.push("/").catch(() => {
                this.$forceUpdate();
            });
            },
        },
    };
</script>

<style lang="scss">
    @import "@/scss/form-style.scss";
    #nav {
    padding: 30px;
    font-size: 17px;
    }
    #nav a {
    font-weight: bold;
    color: #2c3e50;
    }
    .nav2 {
    -webkit-text-stroke-width: 0.5px;
    }
    #nav a.router-link-exact-active {
        color: #1ba224;
    }
</style>
