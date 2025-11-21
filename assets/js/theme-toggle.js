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
    // Support both button and checkbox slide toggle
    const el = document.getElementById('themeToggleBtn');
    if(!el) return;
    if(el.tagName === 'INPUT' && el.type === 'checkbox'){
      el.checked = theme === 'dark';
      el.setAttribute('aria-pressed', String(theme === 'dark'));
      // update emoji label if present
      const lbl = el.closest('.switch') && el.closest('.switch').querySelector('.label');
      if(lbl) lbl.textContent = theme === 'dark' ? '☀️' : '🌙';
    } else {
      // fallback: button
      el.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
      el.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }

  // init
  document.addEventListener('DOMContentLoaded', function(){
    const theme = getPreferredTheme();
    applyTheme(theme);
    updateToggleUI(theme);

    // delegate clicks from any toggle button
    // Handle clicks for button-style toggles and changes for checkbox-style toggles
    document.addEventListener('click', function(e){
      const t = e.target.closest && e.target.closest('#themeToggleBtn');
      if(t && t.tagName !== 'INPUT') toggleTheme();
    });
    document.addEventListener('change', function(e){
      if(e.target && e.target.id === 'themeToggleBtn' && e.target.tagName === 'INPUT'){
        // checkbox changed
        const next = e.target.checked ? 'dark' : 'light';
        applyTheme(next);
        try{ localStorage.setItem(storageKey, next); }catch(e){}
        updateToggleUI(next);
      }
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
