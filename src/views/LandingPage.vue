<template>
  <main class="landing-page min-h-screen text-base-content">
    <div class="mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-10 pt-5 md:px-10">
      <header class="flex items-center justify-between rounded-2xl border border-base-300 bg-base-100/90 p-3 shadow-sm backdrop-blur">
        <div class="text-xl font-bold tracking-tight">Vaultly</div>
        <router-link to="/login" class="btn btn-primary btn-sm sm:btn-md">Sign in</router-link>
      </header>

      <section class="mt-10 grid items-center gap-10 md:mt-16 md:grid-cols-2">
        <div class="space-y-6">
          <p class="inline-flex rounded-full border border-base-300 bg-base-100 px-4 py-1 text-sm font-semibold">
            Smart cloud vault for teams
          </p>
          <h1 class="text-4xl font-black leading-tight sm:text-5xl">
            Keep every file private, searchable and instantly shareable
          </h1>
          <p class="max-w-xl text-base-content/70 sm:text-lg">
            Vaultly helps you upload videos and documents, control access, and deliver clean download links in seconds.
          </p>
          <div class="flex flex-wrap gap-3">
            <router-link to="/login" class="btn btn-primary btn-wide">Start now</router-link>
            <router-link to="/videos" class="btn btn-outline btn-wide">View videos</router-link>
          </div>
          <div class="stats grid grid-cols-3 rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div class="stat px-3 py-4">
              <div class="stat-title text-xs">Uptime</div>
              <div class="stat-value text-xl">99.9%</div>
            </div>
            <div class="stat px-3 py-4">
              <div class="stat-title text-xs">Avg upload</div>
              <div class="stat-value text-xl">2.3s</div>
            </div>
            <div class="stat px-3 py-4">
              <div class="stat-title text-xs">Assets</div>
              <div class="stat-value text-xl">1M+</div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-xl md:p-6">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-bold">Live workspace preview</h2>
            <span class="badge badge-success badge-sm">Encrypted</span>
          </div>
          <div class="space-y-3">
            <div class="rounded-xl border border-base-300 bg-base-200/70 p-3">
              <p class="text-sm font-semibold">marketing-launch.mp4</p>
              <progress class="progress progress-primary mt-2 w-full" value="88" max="100"></progress>
            </div>
            <div class="rounded-xl border border-base-300 bg-base-200/70 p-3">
              <p class="text-sm font-semibold">client-contract.pdf</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-xs text-base-content/70">Preview ready</span>
                <button class="btn btn-ghost btn-xs">Open</button>
              </div>
            </div>
            <div class="rounded-xl border border-base-300 bg-base-200/70 p-3">
              <p class="text-sm font-semibold">access-policy.docx</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-xs text-base-content/70">Shared with 4 members</span>
                <button class="btn btn-ghost btn-xs">Manage</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
        <article class="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <h3 class="text-lg font-bold">Secure by default</h3>
          <p class="mt-2 text-sm text-base-content/70">Token-based sessions and private file endpoints protect your data at every step.</p>
        </article>
        <article class="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <h3 class="text-lg font-bold">Fast media delivery</h3>
          <p class="mt-2 text-sm text-base-content/70">Upload once, stream smoothly with HLS, and keep playback responsive across devices.</p>
        </article>
        <article class="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <h3 class="text-lg font-bold">Simple team workflow</h3>
          <p class="mt-2 text-sm text-base-content/70">Organize content, share links, and keep every document visible to the right people.</p>
        </article>
      </section>

      <footer class="mt-10 border-t border-base-300 pt-5 text-sm text-base-content/60 md:mt-14">
        <p>Copyright 2026 Vaultly. Secure file and video management platform.</p>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.landing-page {
  background:
    radial-gradient(circle at 15% 20%, rgb(14 165 233 / 0.12), transparent 45%),
    radial-gradient(circle at 85% 0%, rgb(249 115 22 / 0.12), transparent 40%),
    linear-gradient(180deg, hsl(var(--b2)), hsl(var(--b1)));
}
</style>
