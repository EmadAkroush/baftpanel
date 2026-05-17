<template>
  <div class="hero-card">

    <div class="hero-left">

      <div class="hero-avatar">
        {{ user.firstName.charAt(0) }}
      </div>

      <div>

        <h1 class="hero-name">
          {{ user.firstName }}
          {{ user.lastName }}
        </h1>

        <p class="hero-email">
          {{ user.email }}
        </p>

        <div class="hero-badges">

          <div
            class="status-badge"
            :class="user.isActive ? 'active' : 'inactive'"
          >
            <span></span>

            {{
              user.isActive
                ? 'فعال'
                : 'غیرفعال'
            }}
          </div>

          <div
            class="verify-badge"
            :class="
              user.isVerified
                ? 'verified'
                : 'not-verified'
            "
          >
            <i
              :class="
                user.isVerified
                  ? 'mdi mdi-check-decagram'
                  : 'mdi mdi-close-circle-outline'
              "
            ></i>

            <span>
              {{
                user.isVerified
                  ? 'احراز شده'
                  : 'احراز نشده'
              }}
            </span>
          </div>

        </div>

      </div>

    </div>

    <div class="hero-right">

      <div class="mini-stat">
        <span>کل درآمد</span>

        <strong>
          ${{ format(user.totalIncome) }}
        </strong>
      </div>

      <div class="mini-stat">
        <span>مجموع برداشت</span>

        <strong>
          ${{ format(user.withdrawalTotalBalance) }}
        </strong>
      </div>

      <div class="mini-stat">
        <span>VX Code</span>

        <strong>
          {{ user.vxCode }}
        </strong>
      </div>

    </div>

  </div>
</template>

<script setup>

/* PROPS */
defineProps({
  user: {
    type: Object,
    required: true
  }
})

/* FORMAT FUNCTION */
const format = (val) => {
  return Number(val || 0).toLocaleString("fa-IR")
}

</script>

<style scoped>

.hero-card {
  background: white;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  border: 1px solid rgba(217,165,179,.18);
}

.hero-left {
  display: flex;
  gap: 20px;
  align-items: center;
}

.hero-avatar {
  width: 100px;
  height: 100px;
  border-radius: 28px;
  background: linear-gradient(135deg,#5B2A4A,#C8A96B);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 800;
}

.hero-name {
  font-size: 32px;
  font-weight: 800;
  color: #1F1F24;
}

.hero-email {
  margin-top: 8px;
  color: #8B5E74;
}

.hero-badges {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-right {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.mini-stat {
  min-width: 150px;
  background: #F8F5F2;
  padding: 18px;
  border-radius: 20px;
}

.mini-stat span {
  color: #8B5E74;
  font-size: 13px;
}

.mini-stat strong {
  display: block;
  margin-top: 10px;
  font-size: 22px;
  color: #1F1F24;
}

.status-badge,
.verify-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.status-badge span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.active {
  background: rgba(34,197,94,.12);
  color: #16A34A;
}

.active span {
  background: #16A34A;
}

.inactive {
  background: rgba(239,68,68,.12);
  color: #DC2626;
}

.inactive span {
  background: #DC2626;
}

.verified {
  background: rgba(34,197,94,.12);
  color: #16A34A;
}

.not-verified {
  background: rgba(239,68,68,.12);
  color: #DC2626;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 768px) {

  .hero-card {
    padding: 20px;
    border-radius: 24px;
  }

  .hero-left {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-name {
    font-size: 26px;
  }

  .hero-avatar {
    width: 84px;
    height: 84px;
    font-size: 30px;
  }

  .hero-right {
    width: 100%;
  }

  .mini-stat {
    width: 100%;
  }

}

</style>