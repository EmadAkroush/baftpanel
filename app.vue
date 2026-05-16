<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<style>

html {
    direction: rtl;
    font-family: Roboto !important;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #405FF2;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #405FF2;
}
/* ---------- FONT FACE CUSTOM ---------- */
@font-face {
  font-family: "Roboto";
  src: url("./public/font/static/Roboto-Black.ttf") format("truetype");
  unicode-range: U+0030-0039; /* فقط اعداد لاتین 0–9 */
  font-display: swap;
}

</style>
