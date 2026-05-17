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
        @click="navigateTo('/admin/products')"
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

        <!-- BASIC -->
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

        <!-- PRICE -->
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

        <!-- IMAGES -->
        <div class="form-card">

          <div class="card-header">
            <h2>
              تصاویر محصول
            </h2>

            <p>
              تصویر اصلی و گالری محصول
            </p>
          </div>

          <div class="upload-box">

            <i class="mdi mdi-cloud-upload-outline"></i>

            <h3>
              آپلود تصویر
            </h3>

            <p>
              فایل را اینجا رها کنید یا کلیک کنید
            </p>

            <input type="file" />

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

        <!-- PREVIEW -->
        <div class="form-card">

          <div class="card-header">
            <h2>
              پیش‌نمایش
            </h2>
          </div>

          <div class="preview-card">

            <div class="preview-image">
              <i class="mdi mdi-image-outline"></i>
            </div>

            <h3>
              {{ form.title || 'نام محصول' }}
            </h3>

            <p>
              {{ form.category || 'دسته‌بندی' }}
            </p>

            <strong>
              ${{ format(form.price || 0) }}
            </strong>

          </div>

        </div>

        <!-- ACTIONS -->
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
import { reactive } from "vue"

/* ===== FORM ===== */
const form = reactive({
  title: "",
  category: "",
  brand: "",
  description: "",

  price: "",
  discountPrice: "",
  stock: "",
  code: "",

  active: true,
  featured: false
})

/* ===== METHODS ===== */
const createProduct = () => {
  console.log(form)

  alert("محصول با موفقیت ثبت شد")
}

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