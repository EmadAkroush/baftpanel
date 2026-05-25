```vue
<template>
  <div class="create-product-page">

    <!-- ===== HEADER ===== -->
    <div class="page-header">

      <div>
        <h1 class="page-title">
          ایجاد محصول جدید
        </h1>

        <p class="page-subtitle">
          ثبت محصول جدید برای فروشگاه بافت
        </p>
      </div>

      <button
        class="back-btn"
        @click="navigateTo('/products')"
      >
        <i class="mdi mdi-arrow-right"></i>

        <span>
          بازگشت
        </span>
      </button>

    </div>

    <!-- ===== FORM ===== -->
    <div class="form-layout">

      <!-- ===== LEFT ===== -->
      <div class="main-form">

        <!-- ===== BASIC ===== -->
        <div class="form-card">

          <div class="card-header">
            <h2>
              اطلاعات اصلی
            </h2>

            <p>
              اطلاعات پایه محصول را وارد کنید
            </p>
          </div>

          <div class="form-grid">

            <!-- TITLE -->
            <div class="form-group full">
              <label>
                نام محصول
              </label>

              <input
                v-model="form.title"
                type="text"
                placeholder="مثال: کت لینن مردانه"
              />
            </div>

            <!-- CATEGORY -->
            <div class="form-group">
              <label>
                دسته‌بندی
              </label>

              <select v-model="form.category">
                <option value="">
                  انتخاب دسته‌بندی
                </option>

                <option value="مردانه">
                  مردانه
                </option>

                <option value="زنانه">
                  زنانه
                </option>

                <option value="اکسسوری">
                  اکسسوری
                </option>
              </select>
            </div>

            <!-- BRAND -->
            <div class="form-group">
              <label>
                برند
              </label>

              <input
                v-model="form.brand"
                type="text"
                placeholder="نام برند"
              />
            </div>

            <!-- FABRIC TYPE -->
            <div class="form-group">
              <label>
                نوع بافت
              </label>

              <input
                v-model="form.fabricType"
                type="text"
                placeholder="مثال: بافت ریز"
              />
            </div>

            <!-- MATERIAL -->
            <div class="form-group">
              <label>
                جنس
              </label>

              <input
                v-model="form.material"
                type="text"
                placeholder="مثال: نخ پنبه"
              />
            </div>

            <!-- COLORS -->
            <div class="form-group full">
              <label>
                رنگ‌بندی
              </label>

              <div class="tags-input">

                <div
                  v-for="(color, index) in form.colors"
                  :key="index"
                  class="tag-item"
                >
                  {{ color }}

                  <button @click="removeColor(index)">
                    <i class="mdi mdi-close"></i>
                  </button>
                </div>

                <input
                  v-model="colorInput"
                  type="text"
                  placeholder="مثال: مشکی"
                  @keydown.enter.prevent="addColor"
                />

              </div>
            </div>

            <!-- SIZES -->
            <div class="form-group full">
              <label>
                سایزبندی
              </label>

              <div class="tags-input">

                <div
                  v-for="(size, index) in form.sizes"
                  :key="index"
                  class="tag-item"
                >
                  {{ size }}

                  <button @click="removeSize(index)">
                    <i class="mdi mdi-close"></i>
                  </button>
                </div>

                <input
                  v-model="sizeInput"
                  type="text"
                  placeholder="مثال: XL"
                  @keydown.enter.prevent="addSize"
                />

              </div>
            </div>

            <!-- DESCRIPTION -->
            <div class="form-group full">
              <label>
                توضیحات محصول
              </label>

              <textarea
                v-model="form.description"
                rows="6"
                placeholder="توضیحات کامل محصول..."
              ></textarea>
            </div>

          </div>

        </div>

        <!-- ===== PRICE ===== -->
        <div class="form-card">

          <div class="card-header">
            <h2>
              قیمت و موجودی
            </h2>

            <p>
              اطلاعات مالی محصول
            </p>
          </div>

          <div class="form-grid">

            <div class="form-group">
              <label>
                قیمت اصلی
              </label>

              <input
                v-model="form.price"
                type="number"
                placeholder="0"
              />
            </div>

            <div class="form-group">
              <label>
                قیمت تخفیف
              </label>

              <input
                v-model="form.discountPrice"
                type="number"
                placeholder="0"
              />
            </div>

            <div class="form-group">
              <label>
                تعداد موجودی
              </label>

              <input
                v-model="form.stock"
                type="number"
                placeholder="0"
              />
            </div>

            <div class="form-group">
              <label>
                کد محصول
              </label>

              <input
                v-model="form.code"
                type="text"
                placeholder="BFT-2201"
              />
            </div>

          </div>

        </div>

        <!-- ===== IMAGES ===== -->
        <div class="form-card">

          <div class="card-header">
            <h2>
              تصاویر محصول
            </h2>

            <p>
              امکان آپلود چند تصویر برای محصول
            </p>
          </div>

          <div class="upload-box">

            <i class="mdi mdi-cloud-upload-outline"></i>

            <h3>
              آپلود تصاویر محصول
            </h3>

            <p>
              فایل‌ها را اینجا رها کنید یا کلیک کنید
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              @change="handleImagesUpload"
            />

          </div>

          <!-- PREVIEW IMAGES -->
          <div
            v-if="previewImages.length"
            class="preview-grid"
          >

            <div
              v-for="(image, index) in previewImages"
              :key="index"
              class="preview-item"
            >

              <img
                :src="image"
                alt="preview"
              />

              <button
                class="remove-image"
                @click="removeImage(index)"
              >
                <i class="mdi mdi-close"></i>
              </button>

            </div>

          </div>

        </div>

      </div>

      <!-- ===== RIGHT ===== -->
      <div class="sidebar">

        <!-- STATUS -->
        <div class="form-card">

          <div class="card-header">
            <h2>
              وضعیت محصول
            </h2>
          </div>

          <div class="switch-list">

            <div class="switch-item">

              <div>
                <h4>
                  محصول فعال
                </h4>

                <p>
                  نمایش در فروشگاه
                </p>
              </div>

              <label class="switch">

                <input
                  type="checkbox"
                  v-model="form.active"
                />

                <span></span>

              </label>

            </div>

            <div class="switch-item">

              <div>
                <h4>
                  محصول ویژه
                </h4>

                <p>
                  نمایش در محصولات ویژه
                </p>
              </div>

              <label class="switch">

                <input
                  type="checkbox"
                  v-model="form.featured"
                />

                <span></span>

              </label>

            </div>

          </div>

        </div>

        <!-- ===== PREVIEW ===== -->
        <div class="form-card">

          <div class="card-header">
            <h2>
              پیش‌نمایش
            </h2>
          </div>

          <div class="preview-card">

            <div class="preview-image">

              <img
                v-if="previewImages.length"
                :src="previewImages[0]"
                alt="preview"
              />

              <i
                v-else
                class="mdi mdi-image-outline"
              ></i>

            </div>

            <h3>
              {{ form.title || 'نام محصول' }}
            </h3>

            <p>
              {{ form.category || 'دسته‌بندی' }}
            </p>

            <strong>
              {{ format(form.price || 0) }}
            </strong>

          </div>

        </div>

        <!-- ===== ACTIONS ===== -->
        <div class="action-buttons">

          <button
            class="save-btn"
            @click="createProduct"
          >
            <i class="mdi mdi-content-save-outline"></i>

            ثبت محصول
          </button>

          <button class="draft-btn">
            ذخیره پیش‌نویس
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue"

/* ===== FORM ===== */

const form = reactive({
  title: "",
  category: "",
  brand: "",
  description: "",

  fabricType: "",
  material: "",

  colors: [],
  sizes: [],

  price: "",
  discountPrice: "",
  stock: "",
  code: "",

  active: true,
  featured: false,

  images: []
})

/* ===== TAG INPUTS ===== */

const colorInput = ref("")
const sizeInput = ref("")

/* ===== IMAGES ===== */

const previewImages = ref([])

/* ===== ADD COLOR ===== */

const addColor = () => {

  if (!colorInput.value.trim()) return

  form.colors.push(colorInput.value)

  colorInput.value = ""
}

const removeColor = (index) => {
  form.colors.splice(index, 1)
}

/* ===== ADD SIZE ===== */

const addSize = () => {

  if (!sizeInput.value.trim()) return

  form.sizes.push(sizeInput.value)

  sizeInput.value = ""
}

const removeSize = (index) => {
  form.sizes.splice(index, 1)
}

/* ===== IMAGE UPLOAD ===== */

const handleImagesUpload = (event) => {

  const files = Array.from(event.target.files)

  files.forEach((file) => {

    form.images.push(file)

    const reader = new FileReader()

    reader.onload = (e) => {
      previewImages.value.push(e.target.result)
    }

    reader.readAsDataURL(file)

  })

}

const removeImage = (index) => {

  form.images.splice(index, 1)

  previewImages.value.splice(index, 1)
}

/* ===== CREATE PRODUCT ===== */

const createProduct = () => {

  console.log(form)

  alert("محصول با موفقیت ثبت شد")
}

/* ===== FORMAT ===== */

const format = (val) => {
  return Number(val || 0).toLocaleString("fa-IR")
}
</script>

<style scoped>

.create-product-page{
  min-height:100vh;
  padding:32px;
  background:#F8F5F2;
  direction:rtl;
}

/* ===== HEADER ===== */

.page-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  margin-bottom:24px;
  flex-wrap:wrap;
}

.page-title{
  font-size:34px;
  font-weight:900;
  color:#1F1F24;
}

.page-subtitle{
  margin-top:8px;
  color:#8B5E74;
}

.back-btn{
  height:52px;
  padding:0 22px;
  border:none;
  border-radius:18px;
  background:white;
  color:#5B2A4A;
  display:flex;
  align-items:center;
  gap:10px;
  cursor:pointer;
  font-weight:700;
}

/* ===== LAYOUT ===== */

.form-layout{
  display:grid;
  grid-template-columns:1fr 360px;
  gap:24px;
  align-items:start;
}

/* ===== FORM CARD ===== */

.form-card{
  background:white;
  border-radius:30px;
  padding:28px;
  margin-bottom:24px;
}

.card-header{
  margin-bottom:24px;
}

.card-header h2{
  font-size:24px;
  font-weight:800;
  color:#1F1F24;
}

.card-header p{
  margin-top:8px;
  color:#8B5E74;
}

/* ===== FORM ===== */

.form-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
}

.form-group.full{
  grid-column:1 / -1;
}

.form-group label{
  display:block;
  margin-bottom:10px;
  color:#5B2A4A;
  font-weight:700;
}

.form-group input,
.form-group select,
.form-group textarea{
  width:100%;
  border:none;
  background:#F8F5F2;
  border-radius:18px;
  padding:16px;
  font-size:14px;
  border:1px solid transparent;
}

.form-group input,
.form-group select{
  height:56px;
}

.form-group textarea{
  resize:none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus{
  outline:none;
  border-color:#C8A96B;
}

/* ===== TAGS ===== */

.tags-input{
  min-height:58px;
  background:#F8F5F2;
  border-radius:18px;
  padding:12px;
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:10px;
}

.tags-input input{
  border:none;
  background:transparent;
  flex:1;
  min-width:120px;
  color:#1F1F24;
}

.tags-input input:focus{
  outline:none;
}

.tag-item{
  background:linear-gradient(135deg,#5B2A4A,#C8A96B);
  color:white;
  padding:8px 12px;
  border-radius:999px;
  display:flex;
  align-items:center;
  gap:8px;
  font-size:13px;
}

.tag-item button{
  border:none;
  background:transparent;
  color:white;
  cursor:pointer;
}

/* ===== UPLOAD ===== */

.upload-box{
  border:2px dashed rgba(200,169,107,.35);
  border-radius:24px;
  padding:50px 20px;
  text-align:center;
  background:#F8F5F2;
  position:relative;
}

.upload-box i{
  font-size:70px;
  color:#C8A96B;
}

.upload-box h3{
  margin-top:16px;
  font-size:22px;
  color:#1F1F24;
}

.upload-box p{
  margin-top:10px;
  color:#8B5E74;
}

.upload-box input{
  position:absolute;
  inset:0;
  opacity:0;
  cursor:pointer;
}

/* ===== IMAGE PREVIEW ===== */

.preview-grid{
  margin-top:24px;
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
  gap:16px;
}

.preview-item{
  position:relative;
  border-radius:20px;
  overflow:hidden;
  height:160px;
  background:#F8F5F2;
}

.preview-item img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.remove-image{
  position:absolute;
  top:10px;
  left:10px;
  width:34px;
  height:34px;
  border:none;
  border-radius:12px;
  background:rgba(0,0,0,.55);
  color:white;
  cursor:pointer;
}

/* ===== SWITCH ===== */

.switch-list{
  display:flex;
  flex-direction:column;
  gap:20px;
}

.switch-item{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
}

.switch-item h4{
  color:#1F1F24;
  font-size:16px;
}

.switch-item p{
  margin-top:6px;
  color:#8B5E74;
  font-size:13px;
}

.switch{
  position:relative;
  width:58px;
  height:32px;
}

.switch input{
  display:none;
}

.switch span{
  position:absolute;
  inset:0;
  background:#D1D5DB;
  border-radius:999px;
  transition:.3s;
}

.switch span::before{
  content:'';
  position:absolute;
  width:24px;
  height:24px;
  border-radius:999px;
  background:white;
  top:4px;
  right:4px;
  transition:.3s;
}

.switch input:checked + span{
  background:#5B2A4A;
}

.switch input:checked + span::before{
  transform:translateX(-26px);
}

/* ===== PREVIEW ===== */

.preview-card{
  background:#F8F5F2;
  border-radius:24px;
  padding:20px;
  text-align:center;
}

.preview-image{
  height:220px;
  border-radius:22px;
  background:white;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

.preview-image img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.preview-image i{
  font-size:60px;
  color:#C8A96B;
}

.preview-card h3{
  margin-top:18px;
  font-size:20px;
  font-weight:800;
  color:#1F1F24;
}

.preview-card p{
  margin-top:8px;
  color:#8B5E74;
}

.preview-card strong{
  display:block;
  margin-top:14px;
  color:#16A34A;
  font-size:28px;
}

/* ===== ACTIONS ===== */

.action-buttons{
  display:flex;
  flex-direction:column;
  gap:14px;
}

.save-btn,
.draft-btn{
  height:56px;
  border:none;
  border-radius:18px;
  font-weight:800;
  cursor:pointer;
}

.save-btn{
  background:linear-gradient(135deg,#5B2A4A,#C8A96B);
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
}

.draft-btn{
  background:white;
  color:#5B2A4A;
}

/* ===== RESPONSIVE ===== */

@media(max-width:1100px){

  .form-layout{
    grid-template-columns:1fr;
  }

}

@media(max-width:768px){

  .create-product-page{
    padding:16px;
  }

  .page-title{
    font-size:26px;
  }

  .form-card{
    padding:20px;
    border-radius:24px;
  }

  .form-grid{
    grid-template-columns:1fr;
  }

  .preview-image{
    height:180px;
  }

}

</style>
```
