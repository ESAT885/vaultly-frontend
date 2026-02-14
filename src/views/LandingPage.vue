<template>
  <div class="min-h-screen bg-base-200">
    <!-- Navbar -->
    <div class="navbar bg-base-100 shadow-md px-6">
      <div class="flex-1">
        <a class="text-2xl font-bold text-primary">Vaulty</a>
      </div>
      <div class="flex-none gap-2">
        <router-link to="/login" class="btn btn-ghost">Login</router-link>
        <router-link to="/register" class="btn btn-primary">Get Started</router-link>
      </div>
    </div>

    <!-- Hero -->
    <div class="hero min-h-[80vh]">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-5xl font-bold">
            Secure Your Files in One Place
          </h1>
          <p class="py-6 text-lg opacity-80">
            Upload and manage your videos, PDFs and documents securely.
            Simple. Fast. Private.
          </p>
          <router-link to="/register" class="btn btn-primary btn-lg">
            Start Storing
          </router-link>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="grid md:grid-cols-3 gap-6 px-8 pb-20">
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">📹 Video Storage</h2>
          <p>Stream and manage HLS videos securely.</p>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">📄 PDF & Docs</h2>
          <p>Upload and preview your documents instantly.</p>
        </div>
      </div>

      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">🔐 Secure Access</h2>
          <p>JWT authentication and protected storage.</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer footer-center p-6 bg-base-100">
      <aside>
        <p>© 2026 Vaulty - Secure File Storage</p>
      </aside>
    </footer>
  </div>
</template>
