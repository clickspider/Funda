<template>
  <section v-if="!loading">
    <v-card
      class="mx-auto house-card"
      :elevation="10"
      :shaped="true"
      :loading="cardLoading"
    >
      <v-carousel
        :continuous="false"
        :cycle="true"
        :hide-delimiters="true"
        height="300"
      >
        <v-carousel-item v-for="(item, i) in imagesArr" :key="i" :src="item">
          <v-card-title class="card-title">
            {{ house.data.Plaats }}, {{ house.data.Adres }}
            <span style="font-size: 16px;">
              € {{ house.data.Prijs.Koopprijs }}
              {{ house.data.Prijs.KoopAbbreviation }}
            </span>
          </v-card-title>
        </v-carousel-item>
      </v-carousel>

      <v-card-text class="text--primary text-left">
        <ul class="kenmerken-highlighted__list">
          <li class="kenmerken-highlighted__list-item">
            <span
              class="kenmerken-highlighted__icon icon-building-orange"
            ></span>
            <span class="kenmerken-highlighted__term"
              >Year of construction</span
            >
            <span class="kenmerken-highlighted__details">
              {{ house.data.Bouwjaar }}
            </span>
          </li>
          <li class="kenmerken-highlighted__list-item">
            <span
              class="kenmerken-highlighted__icon icon-surface-orange"
            ></span>
            <span class="kenmerken-highlighted__term">Living area</span>
            <span class="kenmerken-highlighted__details">
              {{ house.data.WoonOppervlakte }} m²
            </span>
          </li>
          <li class="kenmerken-highlighted__list-item">
            <span class="kenmerken-highlighted__icon icon-door-orange"></span>
            <span class="kenmerken-highlighted__term">Number of rooms</span>
            <span class="kenmerken-highlighted__details">
              {{ house.data.AantalKamers }}
            </span>
          </li>
          <li class="kenmerken-highlighted__list-item">
            <span
              class="kenmerken-highlighted__icon icon-cadastral-map-orange"
            ></span>
            <span class="kenmerken-highlighted__term">Plot size</span>
            <span class="kenmerken-highlighted__details">
              {{ house.data.Kenmerken[5].Kenmerken[1].Waarde }}
            </span>
          </li>
        </ul>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-row justify="center">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="orange"
            :href="house.data.ShortURL"
            target="_blank"
          >
            <v-icon dark>mdi-information</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on }">
              <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="orange"
                target="_blank"
                v-on="on"
              >
                <v-icon dark>mdi-video</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-text class="text-center">
                <video class="video" controls autoplay muted id="video">
                  <source
                    :src="house.data.Video.Videos[0].Url"
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video.
                </video>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="pauseAndClose()"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn class="mx-2" fab dark small color="orange">
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "House",
  props: ["loading"],
  data() {
    return {
      dialog: false,
      imagesArr: [],
      cardLoading: true
    };
  },
  computed: {
    ...mapGetters(["house"])
  },
  methods: {
    pauseAndClose() {
      const myVideo = document.getElementById("video");
      this.dialog = false;

      if (myVideo.paused) myVideo.play();
      else myVideo.pause();
    },

    filterImagesArr() {
      const mediaItems = this.house.data.Media.map(
        media => media.MediaItems
      ).flat();

      const imagesArr = mediaItems
        .filter(item => item.Category === 6)
        .map(el => el.Url);

      this.imagesArr = imagesArr;
      return imagesArr;
    }
  },
  mounted() {
    setTimeout(() => {
      this.filterImagesArr();
      this.cardLoading = false;
    }, 5000);
  }
};
</script>

<style lang="scss">
.card-title {
  background: radial-gradient(black, #00000014);
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.house-card {
  text-align: center;

  width: 400px;
  margin-top: 30px;
}

.icon-building-orange {
  background-image: url(../assets/house.svg);
  background-repeat: no-repeat;
}

.icon-surface-orange {
  background-image: url(../assets/size.svg);
  background-repeat: no-repeat;
}

.icon-door-orange {
  background-image: url(../assets/doors.svg);
  background-repeat: no-repeat;
}

.icon-cadastral-map-orange {
  background-image: url(../assets/size-plot.svg);
  background-repeat: no-repeat;
}

.kenmerken-highlighted {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 12px;
    grid-row-gap: 12px;

    padding-left: 0 !important;
    list-style-type: none;
  }

  &__list-item {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  &__icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  &__term {
    font-weight: bold;
  }
}

.video {
  max-width: 400px;
  width: 100%;

  margin-top: 15px;
}

[class*="icon-"] {
  display: inline-block;
  vertical-align: middle;
  line-height: 1rem;
  background-size: cover;
  pointer-events: none;
}
</style>
