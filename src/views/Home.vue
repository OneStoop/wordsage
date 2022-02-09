<template>
  <v-container fluid pa-0>
    <v-row align="center" justify="center" v-on:click="focusOn('aField')">
      <v-col cols="12" lg="6" md="6" class="d-flex flex-column justify-center align-center">
        <v-card>
          <v-card-text>
            Welcome to OneStoop Games
            <br>
            <router-link :to="'/wordsage'" style="text-decoration: none;">
              WordSage Daily [COMMING SOON]
            </router-link>
            <br>
            <router-link :to="'/wordsage/random'" style="text-decoration: none;">
              WordSage Random
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
