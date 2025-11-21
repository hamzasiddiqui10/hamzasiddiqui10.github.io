(function(){
  // Theme toggle: toggles 'theme-dark' class on <html> and persists in localStorage
  const storageKey = 'site-theme';
  const className = 'theme-dark';

  function applyTheme(theme){
    const root = document.documentElement;
    if(theme === 'dark') root.classList.add(className);
    else root.classList.remove(className);
  }

  function getPreferredTheme(){
    const stored = localStorage.getItem(storageKey);
    if(stored) return stored;
    // fallback to system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function toggleTheme(){
    const current = document.documentElement.classList.contains(className) ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try{ localStorage.setItem(storageKey, next); }catch(e){}
    updateToggleUI(next);
  }

  function updateToggleUI(theme){
    const btn = document.getElementById('themeToggleBtn');
    if(!btn) return;
    btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  // init
  document.addEventListener('DOMContentLoaded', function(){
    const theme = getPreferredTheme();
    applyTheme(theme);
    updateToggleUI(theme);

    // delegate clicks from any toggle button
    document.addEventListener('click', function(e){
      const t = e.target.closest && e.target.closest('#themeToggleBtn');
      if(t) toggleTheme();
    });

    // react to system changes if user hasn't explicitly set
    try{
      if(!localStorage.getItem(storageKey) && window.matchMedia){
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          applyTheme(e.matches ? 'dark' : 'light');
          updateToggleUI(e.matches ? 'dark' : 'light');
        });
      }
    }catch(e){/* ignore */}
  });
})();
