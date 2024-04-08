<template>
  <div class="d-flex justify-center align-center mt-5">
    <v-card min-width="300" width="500" flat class="mr-7  d-flex flex-column justify-center align-center">
      <v-list class="w-100 pl-10" :items="items" item-title="name" item-value="id"></v-list>
    </v-card>
    <v-carousel class="mr-15 " :show-arrows="false">
      <v-carousel-item
        src="https://www.mytwintiers.com/wp-content/uploads/sites/89/2023/01/iPhone-15-Rumors.jpg?strip=1" cover>
        <div style="background-image: linear-gradient(rgba(0, 0,0,0.5), rgba(0,0,0,0.8));"
          class="text-white d-flex flex-column align-start justify-center w-100 h-100 pl-15">
          <p><v-icon style="font-size: 60px;">mdi-apple</v-icon> iPhone 15 Series</p>
          <h1 class="my-6" style="font-size: 70px; max-width: 500px; font-weight:400; line-height: 1.2">Up to 10% off
            Voucher</h1>
          <v-btn href="#" class="text-black" flat style="border-bottom: 2px solid #FFF;">Shop Now
            <v-icon>mdi-arrow-right</v-icon></v-btn>
        </div>
      </v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        name: 'Woman’s Fashion',
        id: 1,
        props: {
          appendIcon: 'mdi-chevron-right',
        },
      },
      {
        name: 'Men’s Fashion',
        id: 2,
        props: {
          appendIcon: 'mdi-chevron-right',
        },
      },
      {
        name: 'Electronics',
        id: 4,
      },
      {
        name: 'Home & Lifestyle',
        id: 5,
      },
      {
        name: 'Medicine',
        id: 6,
      },
      {
        name: 'Sports & Outdoor',
        id: 7,
      },
      {
        name: 'Baby’s & Toys',
        id: 8,
      },
      {
        name: 'Groceries & Pets',
        id: 9,
      },
      {
        name: 'Health & Beauty',
        id: 10,
      },
    ],
  }),
}
</script>
