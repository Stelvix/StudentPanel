<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="nav-content">
        <div class="logo">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">Annuaire<span>Étudiants</span></span>
        </div>

        <div class="nav-links">
          <router-link to="/" class="nav-link"> <i class="icon-home"></i> Accueil </router-link>
          <router-link to="/newStudent" class="nav-link-new">
            <i class="icon-home"></i> Nouvel élève
          </router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f4f7f6;
  color: #2c3e50;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.8rem 2rem;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 1.2rem;
  color: #42b883;
}

.logo-text span {
  color: #35495e;
  font-weight: 400;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #35495e;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.nav-link-new {
  text-decoration: none;
  color: #35495e;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgb(102, 102, 243);
  color: white;
}

.nav-link:hover {
  background-color: rgba(66, 184, 131, 0.1);
  color: #42b883;
}

.router-link-active {
  color: #42b883;
  background-color: rgba(66, 184, 131, 0.1);
}
.router-link > .nav-link-new {
  text-decoration: none;
  color: #35495e;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: blue;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
