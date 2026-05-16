/**
 * PM Diary — Content Loader
 * Lee content.json y vuelca cada campo en su elemento HTML.
 * Para editar textos: solo modifica content.json, no toques este archivo.
 */

fetch('/content.json')
    .then(r => r.json())
    .then(c => {

        /* ── SITE META ─────────────────────────────────────── */
        document.title = c.site.title;
        document.querySelector('meta[name="description"]').content = c.site.description;

        /* ── NAV ────────────────────────────────────────────── */
        document.getElementById('nav-logo-text').textContent = c.nav.logo_text;
        document.getElementById('nav-logo-sub').textContent = c.nav.logo_sub;
        document.getElementById('nav-link-1').textContent = c.nav.link_1_text;
        document.getElementById('nav-link-1').href = c.nav.link_1_href;
        document.getElementById('nav-link-2').textContent = c.nav.link_2_text;
        document.getElementById('nav-link-2').href = c.nav.link_2_href;
        document.getElementById('nav-cta').textContent = c.nav.cta_text;
        document.getElementById('nav-cta').href = c.nav.cta_href;

        /* ── HERO ────────────────────────────────────────────── */
        document.getElementById('hero-badge-text').textContent = c.hero.badge;
        document.getElementById('hero-title-line1').textContent = c.hero.title_line1;
        document.getElementById('hero-title-line2').textContent = c.hero.title_line2;
        document.getElementById('hero-title-highlight').innerHTML = c.hero.title_highlight;
        document.getElementById('hero-sub').textContent = c.hero.subtitle;
        document.getElementById('hero-cta-primary').textContent = c.hero.cta_primary_text;
        document.getElementById('hero-cta-primary').href = c.hero.cta_primary_href;
        document.getElementById('hero-cta-ghost').textContent = c.hero.cta_ghost_text;
        document.getElementById('hero-cta-ghost').href = c.hero.cta_ghost_href;
        document.getElementById('hero-note').textContent = c.hero.note;

        /* ── MOCKUP ──────────────────────────────────────────── */
        document.getElementById('mockup-greeting').textContent = c.mockup.greeting;
        document.getElementById('mockup-progress').textContent = c.mockup.tasks_progress;
        document.getElementById('mockup-banner').textContent = c.mockup.banner_quote;
        document.getElementById('mockup-stat1-n').textContent = c.mockup.stat_1_number;
        document.getElementById('mockup-stat1-l').textContent = c.mockup.stat_1_label;
        document.getElementById('mockup-stat2-n').textContent = c.mockup.stat_2_number;
        document.getElementById('mockup-stat2-l').textContent = c.mockup.stat_2_label;
        document.getElementById('mockup-stat3-n').textContent = c.mockup.stat_3_number;
        document.getElementById('mockup-stat3-l').textContent = c.mockup.stat_3_label;
        document.getElementById('mockup-chart-label').textContent = c.mockup.chart_label;
        document.getElementById('mockup-badge-urgent').textContent = c.mockup.badge_urgent;
        document.getElementById('mockup-badge-foda').textContent = c.mockup.badge_foda;

        /* ── PROOF ───────────────────────────────────────────── */
        document.getElementById('proof-label').textContent = c.proof.label;
        document.getElementById('proof-text').textContent = c.proof.text + ' ';
        document.getElementById('proof-text-strong').textContent = c.proof.text_strong;

        /* ── PILLARS SECTION ─────────────────────────────────── */
        document.getElementById('pillars-tag').textContent = c.pillars_section.tag;
        document.getElementById('pillars-title').textContent = c.pillars_section.title;
        document.getElementById('pillars-sub').textContent = c.pillars_section.subtitle;

        /* ── PILLARS (4 tarjetas) ────────────────────────────── */
        c.pillars.forEach((p, i) => {
            document.getElementById(`pillar-${i}-icon`).textContent = p.icon;
            document.getElementById(`pillar-${i}-title`).textContent = p.title;
            document.getElementById(`pillar-${i}-desc`).textContent = p.desc;
        });

        /* ── QUOTE ───────────────────────────────────────────── */
        document.getElementById('quote-text').innerHTML = c.quote.text;
        document.getElementById('quote-sub').textContent = c.quote.sub;

        /* ── THEMES SECTION ──────────────────────────────────── */
        document.getElementById('themes-tag').textContent = c.themes_section.tag;
        document.getElementById('themes-title').textContent = c.themes_section.title;
        document.getElementById('themes-sub').textContent = c.themes_section.subtitle;

        /* ── BETA ────────────────────────────────────────────── */
        document.getElementById('beta-title').textContent = c.beta.title;
        document.getElementById('beta-sub').textContent = c.beta.subtitle;
        document.getElementById('f-name').placeholder = c.beta.placeholder_name;
        document.getElementById('f-email').placeholder = c.beta.placeholder_email;
        document.getElementById('f-role').options[0].textContent = c.beta.placeholder_role;
        document.getElementById('beta-btn').textContent = c.beta.btn_text;
        document.getElementById('beta-note-text').textContent = c.beta.note_text + ' ';
        document.getElementById('beta-note-link').textContent = c.beta.note_link_text;
        document.getElementById('beta-note-link').href = c.beta.note_link_href;
        document.getElementById('beta-success-title').textContent = c.beta.success_title;
        document.getElementById('beta-success-sub').textContent = c.beta.success_sub;
        document.getElementById('beta-success-btn').textContent = c.beta.success_btn_text;
        document.getElementById('beta-success-btn').href = c.beta.success_btn_href;

        /* ── FOOTER ──────────────────────────────────────────── */
        document.getElementById('footer-logo').textContent = c.footer.logo;
        document.getElementById('footer-sub').textContent = c.footer.sub;
        document.getElementById('footer-copy').textContent = c.footer.copy;

        /* ── TEMA POR DEFECTO ────────────────────────────────── */
        const savedTheme = localStorage.getItem('pm_landing_theme') || c.site.default_theme;
        setTheme(savedTheme);

    })
    .catch(err => {
        console.warn('content.json no encontrado, mostrando contenido base del HTML.', err);
    });