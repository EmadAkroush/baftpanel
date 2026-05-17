<template>
  <div class="details-card">

    <div class="section-header">
      <div>
        <h2>محصولات خریداری شده</h2>

        <p>
          لیست محصولات ثبت شده توسط کاربر
        </p>
      </div>
    </div>

    <div class="products-grid">

      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >

        <div class="product-image">
          <img
            :src="product.image"
            :alt="product.title"
          />
        </div>

        <div class="product-content">

          <div class="product-top">

            <h3>{{ product.title }}</h3>

            <span class="product-category">
              {{ product.category }}
            </span>

          </div>

          <p class="product-desc">
            {{ product.description }}
          </p>

          <div class="product-meta">

            <div class="meta-item">
              <span>تعداد:</span>
              <strong>{{ product.quantity }}</strong>
            </div>

            <div class="meta-item">
              <span>قیمت:</span>
              <strong>
                ${{ format(product.price) }}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
defineProps({
  products: Array,
  format: Function
})
</script>

<style scoped>
.details-card{
  background:white;
  border-radius:30px;
  padding:30px;
  margin-bottom:24px;
}

.products-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}

.product-card{
  background:#F8F5F2;
  border-radius:24px;
  overflow:hidden;
}

.product-image{
  height:240px;
}

.product-image img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.product-content{
  padding:20px;
}

@media(max-width:768px){
  .products-grid{
    grid-template-columns:1fr;
  }
}
</style>