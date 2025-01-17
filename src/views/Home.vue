<script setup></script>

<template>
  <main class="h-[100vh] bg-[#f3f5f5] flex justify-center items-center">
    <div class="rounded w-full md:w-3/4 bg-white p-5 border border-[#f3f5f5]">
      <div class="">
        <img src="@/assets/images/logo.png" class="w-40" alt="" />
      </div>

      <hr class="mt-5 border-t border-[#f3f5f5]" />

      <div class="mt-5 flex justify-between">
        <button
          class="bg-[#1B56DB] hover:bg-blue-950 transition-all text-white flex py-2 px-3 rounded"
        >
          <i class="bi bi-plus text-2xl text-white"></i>
          <span class="self-center">Add new user</span>
        </button>

        <button
          class="border border-[#f3f5f5] px-4 py-2 rounded self-center hover:bg-slate-50 transition-all"
        >
          Delete all
        </button>
      </div>
    </div>
  </main>
</template>
