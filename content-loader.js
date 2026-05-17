/**
 * PM Diary — Content Loader v2
 * Lee cada sección desde su propio archivo en /content/
 */

async function loadJSON(file) {
    const res = await fetch(`/content/${file}.json`);
    if (!res.ok) throw new Error(`No se pudo cargar content/${file}.json`);
    return res.json();
}

async function loadContent() {
    try {
        const [site, nav, hero, mockup, proof, pillars, quote, themes, beta, footer] =
            await Promise.all([
                loadJSON('site'), loadJSON('nav'), loadJSON('hero'),
                loadJSON('mockup'), loadJSON('proof'), loadJSON('pillars'),
                loadJSON('quote'), loadJSON('themes'), loadJSON('beta'), loadJSON('footer'),
            ]);

        document.title = site.title;
        document.querySelector('meta[name="description"]').content = site.description;
// Logo icon
const logoEl = document.getElementById('logo-icon-el');
if (logoEl) {
  if (site.logo_icon) {
    logoEl.innerHTML = `<img src="${site.logo_icon}" style="width:100%;height:100%;object-fit:contain;border-radius:6px;" alt="Logo"/>`;
  } else {
    logoEl.textContent = '◈'; // ← símbolo original como fallback
  }
}

// Favicon
const faviconEl = document.getElementById('favicon-link');
if (site.favicon && faviconEl) {
  faviconEl.href = site.favicon;
}
        document.getElementById('nav-logo-text').textContent = nav.logo_text;
        document.getElementById('nav-logo-sub').textContent = nav.logo_sub;
        document.getElementById('nav-link-1').textContent = nav.link_1_text;
        document.getElementById('nav-link-1').href = nav.link_1_href;
        document.getElementById('nav-link-2').textContent = nav.link_2_text;
        document.getElementById('nav-link-2').href = nav.link_2_href;
        document.getElementById('nav-cta').textContent = nav.cta_text;
        document.getElementById('nav-cta').href = nav.cta_href;

        document.getElementById('hero-badge-text').textContent = hero.badge;
        document.getElementById('hero-title-line1').textContent = hero.title_line1;
        document.getElementById('hero-title-line2').textContent = hero.title_line2;
        document.getElementById('hero-title-highlight').innerHTML = hero.title_highlight;
        document.getElementById('hero-sub').textContent = hero.subtitle;
        document.getElementById('hero-cta-primary').textContent = hero.cta_primary_text;
        document.getElementById('hero-cta-primary').href = hero.cta_primary_href;
        document.getElementById('hero-cta-ghost').textContent = hero.cta_ghost_text;
        document.getElementById('hero-cta-ghost').href = hero.cta_ghost_href;
        document.getElementById('hero-note').textContent = hero.note;

        document.getElementById('mockup-greeting').textContent = mockup.greeting;
        document.getElementById('mockup-progress').textContent = mockup.tasks_progress;
        document.getElementById('mockup-banner').textContent = mockup.banner_quote;
        document.getElementById('mockup-stat1-n').textContent = mockup.stat_1_number;
        document.getElementById('mockup-stat1-l').textContent = mockup.stat_1_label;
        document.getElementById('mockup-stat2-n').textContent = mockup.stat_2_number;
        document.getElementById('mockup-stat2-l').textContent = mockup.stat_2_label;
        document.getElementById('mockup-stat3-n').textContent = mockup.stat_3_number;
        document.getElementById('mockup-stat3-l').textContent = mockup.stat_3_label;
        document.getElementById('mockup-chart-label').textContent = mockup.chart_label;
        document.getElementById('mockup-badge-urgent').textContent = mockup.badge_urgent;
        document.getElementById('mockup-badge-foda').textContent = mockup.badge_foda;

        document.getElementById('proof-label').textContent = proof.label;
        document.getElementById('proof-text').textContent = proof.text + ' ';
        document.getElementById('proof-text-strong').textContent = proof.text_strong;

        document.getElementById('pillars-tag').textContent = pillars.tag;
        document.getElementById('pillars-title').textContent = pillars.title;
        document.getElementById('pillars-sub').textContent = pillars.subtitle;
        pillars.items.forEach((p, i) => {
            const icon = document.getElementById(`pillar-${i}-icon`);
            const title = document.getElementById(`pillar-${i}-title`);
            const desc = document.getElementById(`pillar-${i}-desc`);
            if (icon) icon.textContent = p.icon;
            if (title) title.textContent = p.title;
            if (desc) desc.textContent = p.desc;
        });

        document.getElementById('quote-text').innerHTML = quote.text;
        document.getElementById('quote-sub').textContent = quote.sub;

        document.getElementById('themes-tag').textContent = themes.tag;
        document.getElementById('themes-title').textContent = themes.title;
        document.getElementById('themes-sub').textContent = themes.subtitle;

        document.getElementById('beta-title').textContent = beta.title;
        document.getElementById('beta-sub').textContent = beta.subtitle;
        document.getElementById('f-name').placeholder = beta.placeholder_name;
        document.getElementById('f-email').placeholder = beta.placeholder_email;
        document.getElementById('f-role').options[0].textContent = beta.placeholder_role;
        document.getElementById('beta-btn').textContent = beta.btn_text;
        document.getElementById('beta-note-text').textContent = beta.note_text + ' ';
        document.getElementById('beta-note-link').textContent = beta.note_link_text;
        document.getElementById('beta-note-link').href = beta.note_link_href;
        document.getElementById('beta-success-title').textContent = beta.success_title;
        document.getElementById('beta-success-sub').textContent = beta.success_sub;
        document.getElementById('beta-success-btn').textContent = beta.success_btn_text;
        document.getElementById('beta-success-btn').href = beta.success_btn_href;

        document.getElementById('footer-logo').textContent = footer.logo;
        document.getElementById('footer-sub').textContent = footer.sub;
        document.getElementById('footer-copy').textContent = footer.copy;

        const savedTheme = localStorage.getItem('pm_landing_theme') || site.default_theme;
        setTheme(savedTheme);

    } catch (err) {
        console.warn('Error cargando content:', err);
    }
}

loadContent();