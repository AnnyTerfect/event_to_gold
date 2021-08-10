<template>
  <v-app app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      temporary
      class="d-md-none"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          class="d-flex"
        >
          <v-row
            align="center" justify="center"
            class="fill-height"
            no-gutters
          >
            <v-img max-width="80" :src="require('./assets/logo.png')"></v-img>
            <h4 class="text-h5 primary--text">
              <span class="black--text">点</span>事<span class="black--text">成</span>金
            </h4>
          </v-row>
        </v-list-item-group>
        <v-divider class="ma-2"></v-divider>
        <v-list-item-group>
          <v-list-item
            v-for="link in links" :key="link.name"
            :to="link.path"
          >
            <v-list-item-title> {{ link.name }} </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app  
      elevate-on-scroll
      class="white"
    >
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon 
          @click.stop="drawer = !drawer"
          class="d-md-none"
        ></v-app-bar-nav-icon>

        <v-avatar
          class="mr-0 d-none d-md-flex"
          color="white"
          tile
        >
          <v-img :src="require('./assets/logo.png')"></v-img>
        </v-avatar>

        <v-spacer class="d-md-none"></v-spacer>

        <v-toolbar-title
          class="d-none d-sm-flex text-h5 primary--text"
        >
          <span class="black--text">点</span>事<span class="black--text">成</span>金
        </v-toolbar-title>
        
        <v-spacer></v-spacer>

        <v-btn
          v-for="link in links"
          :key="link.name"
          :to="link.path"
          text
          class="d-none d-md-flex text-subtitle-1 primary--text"
        >
          {{ link.name }}
        </v-btn>

        <v-responsive
          max-width="260"
          class="d-none d-md-flex"
        >
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            append-icon="mdi-magnify"
            class="ml-4"
            rows="5"
            row-height="30"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        {'name': '首页', 'path': '/'},
        {'name': '文档分析', 'path': '/analysis'},
        {'name': '金融日历', 'path': '/calendar'},
        {'name': '热点', 'path': '/hot'},
        /*{'name': '金融报表', 'path': '/report'},*/
      ],
      drawer: false
    }),
  }
</script>
