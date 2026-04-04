import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en'|'hi'|'mr'|'fr'|'de'|'es'|'it'|'pt'|'ru'|'ar'|'sw'|'ja'|'zh'|'ko';

export interface LanguageMeta { label: string; native: string; flag: string; dir: 'ltr'|'rtl'; group: string; }

export const LANG_META: Record<Language, LanguageMeta> = {
  en: { label:'English',    native:'English',    flag:'🇬🇧', dir:'ltr', group:'Indian & Global' },
  hi: { label:'Hindi',      native:'हिंदी',       flag:'🇮🇳', dir:'ltr', group:'Indian & Global' },
  mr: { label:'Marathi',    native:'मराठी',       flag:'🇮🇳', dir:'ltr', group:'Indian & Global' },
  fr: { label:'French',     native:'Français',   flag:'🇫🇷', dir:'ltr', group:'European' },
  de: { label:'German',     native:'Deutsch',    flag:'🇩🇪', dir:'ltr', group:'European' },
  es: { label:'Spanish',    native:'Español',    flag:'🇪🇸', dir:'ltr', group:'European' },
  it: { label:'Italian',    native:'Italiano',   flag:'🇮🇹', dir:'ltr', group:'European' },
  pt: { label:'Portuguese', native:'Português',  flag:'🇧🇷', dir:'ltr', group:'European' },
  ru: { label:'Russian',    native:'Русский',    flag:'🇷🇺', dir:'ltr', group:'European' },
  ar: { label:'Arabic',     native:'العربية',    flag:'🇸🇦', dir:'rtl', group:'Middle East & Africa' },
  sw: { label:'Swahili',    native:'Kiswahili',  flag:'🇰🇪', dir:'ltr', group:'Middle East & Africa' },
  ja: { label:'Japanese',   native:'日本語',      flag:'🇯🇵', dir:'ltr', group:'Asia' },
  zh: { label:'Chinese',    native:'中文',        flag:'🇨🇳', dir:'ltr', group:'Asia' },
  ko: { label:'Korean',     native:'한국어',      flag:'🇰🇷', dir:'ltr', group:'Asia' },
};

export const LANG_GROUPS = ['Indian & Global','European','Middle East & Africa','Asia'];

export interface T {
  // Nav
  nav_home:string; nav_products:string; nav_services:string; nav_about:string; nav_contact:string; nav_cta:string;
  // Hero
  hero_badge:string; hero_h1:string; hero_h2:string; hero_h3:string; hero_sub:string; hero_cta1:string; hero_cta2:string;
  // Stats
  stats_clients:string; stats_clients_l:string; stats_products:string; stats_products_l:string;
  stats_team:string; stats_team_l:string; stats_countries:string; stats_countries_l:string;
  // Products
  prod_label:string; prod_title:string; prod_sub:string;
  prod_r_name:string; prod_r_tag:string; prod_r_desc:string; prod_r_cta:string;
  prod_ca_name:string; prod_ca_tag:string; prod_ca_desc:string; prod_ca_cta:string;
  prod_soon:string; prod_view_all:string;
  // Services
  svc_label:string; svc_title:string; svc_sub:string;
  svc_1_t:string; svc_1_d:string; svc_2_t:string; svc_2_d:string;
  svc_3_t:string; svc_3_d:string; svc_4_t:string; svc_4_d:string; svc_cta:string;
  // Mission
  miss_label:string; miss_title:string; miss_quote:string; vis_title:string; vis_quote:string;
  // Contact
  contact_label:string; contact_title:string; contact_sub:string;
  contact_name:string; contact_email:string; contact_msg:string; contact_send:string;
  contact_address:string; contact_address_val:string;
  // Footer
  footer_tag:string; footer_legal:string; footer_privacy:string; footer_terms:string;
  footer_copy:string; footer_love:string;
}

// ─────────────────────────────────────────────────────────────
const EN: T = {
  nav_home:'Home', nav_products:'Products', nav_services:'Services', nav_about:'About', nav_contact:'Contact', nav_cta:'Get in Touch',
  hero_badge:'AI-Native · Made in India 🇮🇳',
  hero_h1:'We Build Software', hero_h2:'That Gives India', hero_h3:'Its Time Back.',
  hero_sub:'Vriddhi One engineers AI-powered products and bespoke digital solutions that simplify complex problems — so every Indian dreamer can focus on what matters most.',
  hero_cta1:'Explore Products', hero_cta2:'Start a Project',
  stats_clients:'20+', stats_clients_l:'Happy Clients', stats_products:'2', stats_products_l:'Products Live',
  stats_team:'10+', stats_team_l:'Team Members', stats_countries:'3', stats_countries_l:'Countries',
  prod_label:'Our Products', prod_title:'Built for India.\nReady for the World.', prod_sub:'Purpose-built software solving real problems for India\'s next generation of digital-first users.',
  prod_r_name:'RoomiesNest', prod_r_tag:'Find your perfect roommate.', prod_r_desc:'AI-powered roommate matching with verified profiles, smart compatibility scoring, and safe connections — zero hassle.', prod_r_cta:'Explore RoomiesNest',
  prod_ca_name:'CA Hunt', prod_ca_tag:'Find the right CA in minutes.', prod_ca_desc:'Connect with verified Chartered Accountants matched to your needs. Compare expertise, reviews, and pricing in one place.', prod_ca_cta:'Explore CA Hunt',
  prod_soon:'Coming Soon', prod_view_all:'View All Products',
  svc_label:'What We Do', svc_title:'End-to-End Digital Solutions.', svc_sub:'We partner with founders and enterprises to architect, build, and scale intelligent software systems.',
  svc_1_t:'Custom Software Development', svc_1_d:'Full-stack web and mobile applications built on modern, scalable architecture tailored to your business workflows.',
  svc_2_t:'AI & LLM Integration', svc_2_d:'Deploy autonomous AI agents and LLM-powered automations that cut operational overhead and accelerate decisions.',
  svc_3_t:'Product Consultancy', svc_3_d:'From idea validation to go-to-market — we define, design, and deliver digital products that win users and investors.',
  svc_4_t:'Digital Transformation', svc_4_d:'Modernize legacy systems and build the intelligent infrastructure your enterprise needs to lead in an AI-first world.',
  svc_cta:'Discuss Your Project',
  miss_label:'Our Purpose', miss_title:'A Mission Worth Building For.',
  miss_quote:'To democratize digital innovation in India by building intuitive, purpose-driven software that simplifies complex life-tasks for the next generation of digital-first thinkers.',
  vis_title:'Our Vision', vis_quote:'To build an India where technology isn\'t a hurdle to clear, but a wind at your back — making the path from a simple idea to a world-changing reality feel natural for everyone.',
  contact_label:'Get in Touch', contact_title:'Let\'s Build Something Great.', contact_sub:'Tell us about your project and we\'ll get back to you within 24 hours.',
  contact_name:'Your Name', contact_email:'Email Address', contact_msg:'Tell us about your project...', contact_send:'Send Message',
  contact_address:'Address', contact_address_val:'Pune, Maharashtra, India',
  footer_tag:'Building India\'s digital future, one product at a time.', footer_legal:'Legal',
  footer_privacy:'Privacy Policy', footer_terms:'Terms of Service',
  footer_copy:'© 2025 Vriddhi One. All rights reserved.', footer_love:'Made with ❤️ in India',
};

const HI: T = {
  nav_home:'होम', nav_products:'उत्पाद', nav_services:'सेवाएं', nav_about:'हमारे बारे में', nav_contact:'संपर्क', nav_cta:'संपर्क करें',
  hero_badge:'AI-नेटिव · मेड इन इंडिया 🇮🇳',
  hero_h1:'हम सॉफ्टवेयर बनाते हैं', hero_h2:'जो भारत को देता है', hero_h3:'उसका समय वापस।',
  hero_sub:'Vriddhi One AI-संचालित उत्पाद और डिजिटल समाधान बनाती है जो जटिल समस्याओं को सरल बनाते हैं।',
  hero_cta1:'उत्पाद देखें', hero_cta2:'प्रोजेक्ट शुरू करें',
  stats_clients:'20+', stats_clients_l:'खुश ग्राहक', stats_products:'2', stats_products_l:'लाइव उत्पाद',
  stats_team:'10+', stats_team_l:'टीम सदस्य', stats_countries:'3', stats_countries_l:'देश',
  prod_label:'हमारे उत्पाद', prod_title:'भारत के लिए बना।\nदुनिया के लिए तैयार।', prod_sub:'भारत की अगली पीढ़ी के उपयोगकर्ताओं की वास्तविक समस्याएं हल करने वाला सॉफ्टवेयर।',
  prod_r_name:'RoomiesNest', prod_r_tag:'परफेक्ट रूममेट खोजें।', prod_r_desc:'AI-संचालित रूममेट मैचिंग प्लेटफॉर्म — सत्यापित प्रोफाइल, स्मार्ट मिलान, शून्य परेशानी।', prod_r_cta:'RoomiesNest देखें',
  prod_ca_name:'CA Hunt', prod_ca_tag:'मिनटों में सही CA खोजें।', prod_ca_desc:'अपनी जरूरतों के अनुसार सत्यापित CA से जुड़ें। विशेषज्ञता, समीक्षाएं और मूल्य तुलना करें।', prod_ca_cta:'CA Hunt देखें',
  prod_soon:'जल्द आ रहा है', prod_view_all:'सभी उत्पाद देखें',
  svc_label:'हम क्या करते हैं', svc_title:'संपूर्ण डिजिटल समाधान।', svc_sub:'हम संस्थापकों और उद्यमों के साथ बुद्धिमान सॉफ्टवेयर सिस्टम बनाने में सहयोग करते हैं।',
  svc_1_t:'कस्टम सॉफ्टवेयर डेवलपमेंट', svc_1_d:'आधुनिक आर्किटेक्चर पर वेब और मोबाइल एप्लिकेशन।',
  svc_2_t:'AI और LLM इंटीग्रेशन', svc_2_d:'स्वायत्त AI एजेंट और LLM ऑटोमेशन तैनात करें।',
  svc_3_t:'प्रोडक्ट कंसल्टेंसी', svc_3_d:'विचार से लॉन्च तक — हम डिजिटल उत्पाद डिजाइन और वितरित करते हैं।',
  svc_4_t:'डिजिटल ट्रांसफॉर्मेशन', svc_4_d:'लेगसी सिस्टम को आधुनिक बनाएं और AI-फर्स्ट इन्फ्रास्ट्रक्चर बनाएं।',
  svc_cta:'अपना प्रोजेक्ट डिस्कस करें',
  miss_label:'हमारा उद्देश्य', miss_title:'एक उद्देश्य जिसके लिए निर्माण के योग्य है।',
  miss_quote:'भारत में डिजिटल नवाचार को लोकतांत्रिक बनाना — सहज सॉफ्टवेयर बनाकर जो डिजिटल-फर्स्ट विचारकों के लिए जटिल जीवन-कार्यों को सरल बनाता है।',
  vis_title:'हमारा विजन', vis_quote:'एक ऐसा भारत बनाना जहाँ तकनीक बाधा नहीं बल्कि पीठ के पीछे हवा हो।',
  contact_label:'संपर्क करें', contact_title:'कुछ शानदार बनाते हैं।', contact_sub:'अपने प्रोजेक्ट के बारे में बताएं और हम 24 घंटे में जवाब देंगे।',
  contact_name:'आपका नाम', contact_email:'ईमेल पता', contact_msg:'अपने प्रोजेक्ट के बारे में बताएं...', contact_send:'संदेश भेजें',
  contact_address:'पता', contact_address_val:'पुणे, महाराष्ट्र, भारत',
  footer_tag:'एक समय में एक उत्पाद — भारत का डिजिटल भविष्य बना रहे हैं।', footer_legal:'कानूनी',
  footer_privacy:'गोपनीयता नीति', footer_terms:'सेवा की शर्तें',
  footer_copy:'© 2025 Vriddhi One. सर्वाधिकार सुरक्षित।', footer_love:'भारत में ❤️ के साथ बनाया',
};

const MR: T = {
  nav_home:'होम', nav_products:'उत्पादे', nav_services:'सेवा', nav_about:'आमच्याबद्दल', nav_contact:'संपर्क', nav_cta:'संपर्क करा',
  hero_badge:'AI-नेटिव्ह · मेड इन इंडिया 🇮🇳',
  hero_h1:'आम्ही सॉफ्टवेअर बनवतो', hero_h2:'जे भारताला देते', hero_h3:'त्याचा वेळ परत।',
  hero_sub:'Vriddhi One AI-चालित उत्पादे आणि डिजिटल उपाय तयार करते जे जटिल समस्या सोप्या करतात।',
  hero_cta1:'उत्पादे पहा', hero_cta2:'प्रकल्प सुरू करा',
  stats_clients:'20+', stats_clients_l:'समाधानी ग्राहक', stats_products:'2', stats_products_l:'लाइव्ह उत्पादे',
  stats_team:'10+', stats_team_l:'टीम सदस्य', stats_countries:'3', stats_countries_l:'देश',
  prod_label:'आमची उत्पादे', prod_title:'भारतासाठी बनवले।\nजगासाठी तयार।', prod_sub:'भारताच्या पुढील पिढीसाठी वास्तविक समस्या सोडवणारे सॉफ्टवेअर।',
  prod_r_name:'RoomiesNest', prod_r_tag:'परफेक्ट रूममेट शोधा।', prod_r_desc:'AI-चालित रूममेट मॅचिंग — सत्यापित प्रोफाइल, स्मार्ट जुळणी, शून्य त्रास।', prod_r_cta:'RoomiesNest पहा',
  prod_ca_name:'CA Hunt', prod_ca_tag:'काही मिनिटांत योग्य CA शोधा।', prod_ca_desc:'तुमच्या गरजांनुसार सत्यापित CA शोधा। तज्ञता, पुनरावलोकने आणि किंमत तुलना करा।', prod_ca_cta:'CA Hunt पहा',
  prod_soon:'लवकरच येत आहे', prod_view_all:'सर्व उत्पादे पहा',
  svc_label:'आम्ही काय करतो', svc_title:'संपूर्ण डिजिटल उपाय।', svc_sub:'आम्ही संस्थापक आणि उद्योगांसोबत बुद्धिमान सॉफ्टवेअर बनवतो।',
  svc_1_t:'कस्टम सॉफ्टवेअर डेव्हलपमेंट', svc_1_d:'आधुनिक आर्किटेक्चरवर वेब आणि मोबाइल अॅप्लिकेशन।',
  svc_2_t:'AI आणि LLM इंटिग्रेशन', svc_2_d:'स्वायत्त AI एजंट आणि LLM ऑटोमेशन तैनात करा।',
  svc_3_t:'प्रोडक्ट कन्सल्टन्सी', svc_3_d:'कल्पनेपासून लॉन्चपर्यंत — डिजिटल उत्पादे डिझाइन आणि वितरित करतो।',
  svc_4_t:'डिजिटल ट्रान्सफॉर्मेशन', svc_4_d:'लेगसी सिस्टम आधुनिक करा आणि AI-फर्स्ट इन्फ्रास्ट्रक्चर तयार करा।',
  svc_cta:'तुमचा प्रकल्प चर्चा करा',
  miss_label:'आमचा उद्देश', miss_title:'बांधण्यायोग्य एक मिशन।',
  miss_quote:'भारतात डिजिटल नवकल्पना लोकशाही बनवणे — सहज सॉफ्टवेअर तयार करून जे डिजिटल-फर्स्ट विचारवंतांसाठी जटिल कार्ये सोपी करते।',
  vis_title:'आमचे व्हिजन', vis_quote:'असा भारत बनवणे जिथे तंत्रज्ञान अडथळा नाही, तर पाठीशी वारा आहे।',
  contact_label:'संपर्क करा', contact_title:'काहीतरी उत्कृष्ट बनवूया।', contact_sub:'तुमच्या प्रकल्पाबद्दल सांगा आणि आम्ही 24 तासांत उत्तर देऊ।',
  contact_name:'तुमचे नाव', contact_email:'ईमेल पत्ता', contact_msg:'तुमच्या प्रकल्पाबद्दल सांगा...', contact_send:'संदेश पाठवा',
  contact_address:'पत्ता', contact_address_val:'पुणे, महाराष्ट्र, भारत',
  footer_tag:'एका वेळी एक उत्पाद — भारताचे डिजिटल भविष्य घडवत आहोत।', footer_legal:'कायदेशीर',
  footer_privacy:'गोपनीयता धोरण', footer_terms:'सेवेच्या अटी',
  footer_copy:'© 2025 Vriddhi One. सर्व हक्क राखीव।', footer_love:'भारतात ❤️ ने बनवले',
};

const FR: T = {
  nav_home:'Accueil', nav_products:'Produits', nav_services:'Services', nav_about:'À propos', nav_contact:'Contact', nav_cta:'Nous Contacter',
  hero_badge:'IA Native · Fabriqué en Inde 🇮🇳',
  hero_h1:'Nous Construisons des Logiciels', hero_h2:'Qui Redonnent', hero_h3:'Du Temps à l\'Inde.',
  hero_sub:'Vriddhi One crée des produits IA et des solutions numériques qui simplifient les problèmes complexes des entreprises indiennes.',
  hero_cta1:'Voir les Produits', hero_cta2:'Démarrer un Projet',
  stats_clients:'20+', stats_clients_l:'Clients Satisfaits', stats_products:'2', stats_products_l:'Produits Live',
  stats_team:'10+', stats_team_l:'Membres de l\'Équipe', stats_countries:'3', stats_countries_l:'Pays',
  prod_label:'Nos Produits', prod_title:'Conçu pour l\'Inde.\nPrêt pour le Monde.', prod_sub:'Des logiciels ciblés résolvant de vrais problèmes pour les utilisateurs digitaux de la prochaine génération.',
  prod_r_name:'RoomiesNest', prod_r_tag:'Trouvez votre colocataire idéal.', prod_r_desc:'Plateforme de matching IA avec profils vérifiés, score de compatibilité intelligent et connexions sécurisées.', prod_r_cta:'Explorer RoomiesNest',
  prod_ca_name:'CA Hunt', prod_ca_tag:'Trouvez le bon CA en minutes.', prod_ca_desc:'Connectez-vous avec des comptables vérifiés adaptés à vos besoins.', prod_ca_cta:'Explorer CA Hunt',
  prod_soon:'Bientôt', prod_view_all:'Voir Tous les Produits',
  svc_label:'Ce Que Nous Faisons', svc_title:'Solutions Numériques Complètes.', svc_sub:'Nous collaborons avec les fondateurs et entreprises pour architec­ter des systèmes intelligents.',
  svc_1_t:'Développement Logiciel', svc_1_d:'Applications web et mobile sur architecture moderne et évolutive.',
  svc_2_t:'Intégration IA & LLM', svc_2_d:'Déploiement d\'agents IA autonomes et d\'automatisations LLM.',
  svc_3_t:'Conseil Produit', svc_3_d:'De la validation d\'idée au lancement — nous concevons des produits gagnants.',
  svc_4_t:'Transformation Digitale', svc_4_d:'Modernisation des systèmes legacy et infrastructure IA pour les entreprises.',
  svc_cta:'Discuter de Votre Projet',
  miss_label:'Notre Mission', miss_title:'Une Mission qui Vaut la Peine.',
  miss_quote:'Démocratiser l\'innovation numérique en Inde en créant des logiciels intuitifs qui simplifient les tâches complexes du quotidien.',
  vis_title:'Notre Vision', vis_quote:'Construire une Inde où la technologie n\'est pas un obstacle mais un vent dans le dos.',
  contact_label:'Contactez-nous', contact_title:'Construisons Quelque Chose de Grand.', contact_sub:'Parlez-nous de votre projet et nous vous répondrons sous 24 heures.',
  contact_name:'Votre Nom', contact_email:'Adresse E-mail', contact_msg:'Parlez-nous de votre projet...', contact_send:'Envoyer',
  contact_address:'Adresse', contact_address_val:'Pune, Maharashtra, Inde',
  footer_tag:'Construire l\'avenir numérique de l\'Inde, un produit à la fois.', footer_legal:'Légal',
  footer_privacy:'Politique de Confidentialité', footer_terms:'Conditions d\'Utilisation',
  footer_copy:'© 2025 Vriddhi One. Tous droits réservés.', footer_love:'Fait avec ❤️ en Inde',
};

const DE: T = {
  nav_home:'Startseite', nav_products:'Produkte', nav_services:'Dienstleistungen', nav_about:'Über uns', nav_contact:'Kontakt', nav_cta:'Kontakt aufnehmen',
  hero_badge:'KI-nativ · Hergestellt in Indien 🇮🇳',
  hero_h1:'Wir Entwickeln Software', hero_h2:'Die Indien', hero_h3:'Seine Zeit Zurückgibt.',
  hero_sub:'Vriddhi One entwickelt KI-gestützte Produkte und digitale Lösungen, die komplexe Probleme für indische Unternehmen vereinfachen.',
  hero_cta1:'Produkte Entdecken', hero_cta2:'Projekt Starten',
  stats_clients:'20+', stats_clients_l:'Zufriedene Kunden', stats_products:'2', stats_products_l:'Live-Produkte',
  stats_team:'10+', stats_team_l:'Teammitglieder', stats_countries:'3', stats_countries_l:'Länder',
  prod_label:'Unsere Produkte', prod_title:'Für Indien Gebaut.\nFür die Welt Bereit.', prod_sub:'Zweckorientierte Software, die echte Probleme für die digitale Generation löst.',
  prod_r_name:'RoomiesNest', prod_r_tag:'Finden Sie Ihren perfekten Mitbewohner.', prod_r_desc:'KI-Mitbewohner-Matching mit verifizierten Profilen und intelligentem Kompatibilitätsscore.', prod_r_cta:'RoomiesNest Erkunden',
  prod_ca_name:'CA Hunt', prod_ca_tag:'Den richtigen CA in Minuten finden.', prod_ca_desc:'Verbinden Sie sich mit verifizierten Wirtschaftsprüfern, die zu Ihren Bedürfnissen passen.', prod_ca_cta:'CA Hunt Erkunden',
  prod_soon:'Demnächst', prod_view_all:'Alle Produkte Ansehen',
  svc_label:'Was Wir Tun', svc_title:'End-to-End Digitale Lösungen.', svc_sub:'Wir arbeiten mit Gründern und Unternehmen zusammen, um intelligente Softwaresysteme zu entwickeln.',
  svc_1_t:'Custom Software-Entwicklung', svc_1_d:'Webund Mobile-Anwendungen auf moderner, skalierbarer Architektur.',
  svc_2_t:'KI & LLM Integration', svc_2_d:'Autonome KI-Agenten und LLM-Automatisierungen bereitstellen.',
  svc_3_t:'Produktberatung', svc_3_d:'Von der Ideenvalidierung bis zum Marktstart.',
  svc_4_t:'Digitale Transformation', svc_4_d:'Legacy-Systeme modernisieren und KI-Infrastruktur aufbauen.',
  svc_cta:'Ihr Projekt Besprechen',
  miss_label:'Unsere Mission', miss_title:'Eine Mission, Die Es Wert Ist.',
  miss_quote:'Digitale Innovation in Indien zu demokratisieren, indem intuitive Software entwickelt wird, die komplexe Alltagsaufgaben vereinfacht.',
  vis_title:'Unsere Vision', vis_quote:'Ein Indien aufzubauen, wo Technologie kein Hindernis ist, sondern Rückenwind.',
  contact_label:'Kontakt', contact_title:'Lasst uns Etwas Großartiges Bauen.', contact_sub:'Erzählen Sie uns von Ihrem Projekt und wir melden uns innerhalb von 24 Stunden.',
  contact_name:'Ihr Name', contact_email:'E-Mail-Adresse', contact_msg:'Erzählen Sie uns von Ihrem Projekt...', contact_send:'Nachricht Senden',
  contact_address:'Adresse', contact_address_val:'Pune, Maharashtra, Indien',
  footer_tag:'Indiens digitale Zukunft gestalten, ein Produkt nach dem anderen.', footer_legal:'Rechtliches',
  footer_privacy:'Datenschutzrichtlinie', footer_terms:'Nutzungsbedingungen',
  footer_copy:'© 2025 Vriddhi One. Alle Rechte vorbehalten.', footer_love:'Mit ❤️ in Indien gemacht',
};

const ES: T = {
  nav_home:'Inicio', nav_products:'Productos', nav_services:'Servicios', nav_about:'Nosotros', nav_contact:'Contacto', nav_cta:'Contáctenos',
  hero_badge:'IA Nativa · Hecho en India 🇮🇳',
  hero_h1:'Construimos Software', hero_h2:'Que Le Devuelve', hero_h3:'El Tiempo a India.',
  hero_sub:'Vriddhi One crea productos IA y soluciones digitales que simplifican problemas complejos para las empresas indias.',
  hero_cta1:'Ver Productos', hero_cta2:'Iniciar Proyecto',
  stats_clients:'20+', stats_clients_l:'Clientes Felices', stats_products:'2', stats_products_l:'Productos Live',
  stats_team:'10+', stats_team_l:'Miembros del Equipo', stats_countries:'3', stats_countries_l:'Países',
  prod_label:'Nuestros Productos', prod_title:'Creado para India.\nListo para el Mundo.', prod_sub:'Software diseñado para resolver problemas reales de la próxima generación de usuarios digitales.',
  prod_r_name:'RoomiesNest', prod_r_tag:'Encuentra tu compañero ideal.', prod_r_desc:'Plataforma de matching con IA, perfiles verificados y puntuación de compatibilidad inteligente.', prod_r_cta:'Explorar RoomiesNest',
  prod_ca_name:'CA Hunt', prod_ca_tag:'Encuentra el CA correcto en minutos.', prod_ca_desc:'Conecta con contadores certificados que se adaptan a tus necesidades.', prod_ca_cta:'Explorar CA Hunt',
  prod_soon:'Próximamente', prod_view_all:'Ver Todos los Productos',
  svc_label:'Lo Que Hacemos', svc_title:'Soluciones Digitales Completas.', svc_sub:'Colaboramos con fundadores y empresas para arquitectar sistemas de software inteligentes.',
  svc_1_t:'Desarrollo de Software', svc_1_d:'Aplicaciones web y móviles en arquitectura moderna y escalable.',
  svc_2_t:'Integración de IA y LLM', svc_2_d:'Agentes IA autónomos y automatizaciones LLM.',
  svc_3_t:'Consultoría de Producto', svc_3_d:'Desde la validación de ideas hasta el lanzamiento.',
  svc_4_t:'Transformación Digital', svc_4_d:'Modernización de sistemas legacy e infraestructura IA.',
  svc_cta:'Hablar de tu Proyecto',
  miss_label:'Nuestra Misión', miss_title:'Una Misión que Vale la Pena.',
  miss_quote:'Democratizar la innovación digital en India creando software intuitivo que simplifica tareas complejas del día a día.',
  vis_title:'Nuestra Visión', vis_quote:'Construir una India donde la tecnología no sea un obstáculo sino el viento a tu favor.',
  contact_label:'Contacto', contact_title:'Construyamos Algo Grande.', contact_sub:'Cuéntenos su proyecto y nos pondremos en contacto en 24 horas.',
  contact_name:'Tu Nombre', contact_email:'Correo Electrónico', contact_msg:'Cuéntanos sobre tu proyecto...', contact_send:'Enviar Mensaje',
  contact_address:'Dirección', contact_address_val:'Pune, Maharashtra, India',
  footer_tag:'Construyendo el futuro digital de India, un producto a la vez.', footer_legal:'Legal',
  footer_privacy:'Política de Privacidad', footer_terms:'Términos de Servicio',
  footer_copy:'© 2025 Vriddhi One. Todos los derechos reservados.', footer_love:'Hecho con ❤️ en India',
};

const IT: T = { ...ES,
  nav_home:'Home', nav_products:'Prodotti', nav_services:'Servizi', nav_about:'Chi Siamo', nav_contact:'Contatti', nav_cta:'Contattaci',
  hero_badge:'IA Nativa · Fatto in India 🇮🇳',
  hero_h1:'Costruiamo Software', hero_h2:'Che Restituisce', hero_h3:"Il Tempo all'India.",
  hero_sub:"Vriddhi One crea prodotti AI e soluzioni digitali che semplificano problemi complessi per le imprese indiane.",
  hero_cta1:'Esplora i Prodotti', hero_cta2:'Inizia un Progetto',
  stats_clients_l:'Clienti Soddisfatti', stats_products_l:'Prodotti Live', stats_team_l:'Membri del Team', stats_countries_l:'Paesi',
  prod_label:'I Nostri Prodotti', svc_label:'Cosa Facciamo', miss_label:'La Nostra Missione',
  contact_label:'Contattaci', contact_title:'Costruiamo Qualcosa di Grande.', contact_send:'Invia Messaggio',
  footer_copy:'© 2025 Vriddhi One. Tutti i diritti riservati.', footer_love:'Fatto con ❤️ in India',
};

const PT: T = { ...ES,
  nav_home:'Início', nav_products:'Produtos', nav_services:'Serviços', nav_about:'Sobre', nav_contact:'Contato', nav_cta:'Entre em Contato',
  hero_badge:'IA Nativa · Feito na Índia 🇮🇳',
  hero_h1:'Construímos Software', hero_h2:'Que Devolve', hero_h3:'O Tempo à Índia.',
  hero_sub:'Vriddhi One cria produtos IA e soluções digitais que simplificam problemas complexos.',
  hero_cta1:'Ver Produtos', hero_cta2:'Iniciar Projeto',
  stats_clients_l:'Clientes Satisfeitos', stats_products_l:'Produtos Ativos', stats_team_l:'Membros da Equipe', stats_countries_l:'Países',
  prod_label:'Nossos Produtos', svc_label:'O Que Fazemos', miss_label:'Nossa Missão',
  contact_label:'Contato', contact_title:'Vamos Construir Algo Grande.', contact_send:'Enviar Mensagem',
  footer_copy:'© 2025 Vriddhi One. Todos os direitos reservados.', footer_love:'Feito com ❤️ na Índia',
};

const RU: T = {
  nav_home:'Главная', nav_products:'Продукты', nav_services:'Услуги', nav_about:'О нас', nav_contact:'Контакты', nav_cta:'Связаться',
  hero_badge:'ИИ-нативный · Сделано в Индии 🇮🇳',
  hero_h1:'Мы Создаём Программное', hero_h2:'Обеспечение, Которое', hero_h3:'Возвращает Время Индии.',
  hero_sub:'Vriddhi One создаёт продукты на основе ИИ и цифровые решения, упрощающие сложные задачи для индийских предприятий.',
  hero_cta1:'Смотреть Продукты', hero_cta2:'Начать Проект',
  stats_clients:'20+', stats_clients_l:'Довольных Клиентов', stats_products:'2', stats_products_l:'Активных Продукта',
  stats_team:'10+', stats_team_l:'Членов Команды', stats_countries:'3', stats_countries_l:'Страны',
  prod_label:'Наши Продукты', prod_title:'Создано для Индии.\nГотово для Мира.', prod_sub:'Целеустремлённое программное обеспечение, решающее реальные проблемы.',
  prod_r_name:'RoomiesNest', prod_r_tag:'Найдите идеального соседа.', prod_r_desc:'ИИ-платформа подбора соседей с верифицированными профилями.', prod_r_cta:'Изучить RoomiesNest',
  prod_ca_name:'CA Hunt', prod_ca_tag:'Найдите нужного CA за минуты.', prod_ca_desc:'Подключайтесь к верифицированным бухгалтерам, соответствующим вашим потребностям.', prod_ca_cta:'Изучить CA Hunt',
  prod_soon:'Скоро', prod_view_all:'Все Продукты',
  svc_label:'Что Мы Делаем', svc_title:'Комплексные Цифровые Решения.', svc_sub:'Мы сотрудничаем с основателями и предприятиями для создания интеллектуальных систем.',
  svc_1_t:'Разработка ПО', svc_1_d:'Веб- и мобильные приложения на современной архитектуре.',
  svc_2_t:'Интеграция ИИ и LLM', svc_2_d:'Автономные ИИ-агенты и LLM-автоматизации.',
  svc_3_t:'Продуктовый Консалтинг', svc_3_d:'От проверки идеи до выхода на рынок.',
  svc_4_t:'Цифровая Трансформация', svc_4_d:'Модернизация устаревших систем и ИИ-инфраструктура.',
  svc_cta:'Обсудить Ваш Проект',
  miss_label:'Наша Миссия', miss_title:'Миссия, Ради Которой Стоит Строить.',
  miss_quote:'Демократизация цифровых инноваций в Индии путём создания интуитивного программного обеспечения.',
  vis_title:'Наше Видение', vis_quote:'Построить Индию, где технологии — не препятствие, а попутный ветер.',
  contact_label:'Свяжитесь', contact_title:'Создадим Что-то Великое.', contact_sub:'Расскажите нам о своём проекте, и мы ответим в течение 24 часов.',
  contact_name:'Ваше Имя', contact_email:'Адрес Электронной Почты', contact_msg:'Расскажите о вашем проекте...', contact_send:'Отправить',
  contact_address:'Адрес', contact_address_val:'Пуна, Махараштра, Индия',
  footer_tag:'Строим цифровое будущее Индии, один продукт за раз.', footer_legal:'Правовое',
  footer_privacy:'Политика Конфиденциальности', footer_terms:'Условия Использования',
  footer_copy:'© 2025 Vriddhi One. Все права защищены.', footer_love:'Сделано с ❤️ в Индии',
};

const AR: T = {
  nav_home:'الرئيسية', nav_products:'المنتجات', nav_services:'الخدمات', nav_about:'من نحن', nav_contact:'اتصل بنا', nav_cta:'تواصل معنا',
  hero_badge:'ذكاء اصطناعي · صنع في الهند 🇮🇳',
  hero_h1:'نبني برامج', hero_h2:'تُعيد للهند', hero_h3:'وقتها الثمين.',
  hero_sub:'تُنشئ Vriddhi One منتجات مدعومة بالذكاء الاصطناعي وحلولاً رقمية تبسط المشكلات المعقدة للشركات الهندية.',
  hero_cta1:'استكشف المنتجات', hero_cta2:'ابدأ مشروعاً',
  stats_clients:'٢٠+', stats_clients_l:'عميل سعيد', stats_products:'٢', stats_products_l:'منتجات مباشرة',
  stats_team:'١٠+', stats_team_l:'أعضاء الفريق', stats_countries:'٣', stats_countries_l:'دول',
  prod_label:'منتجاتنا', prod_title:'مصمم للهند.\nجاهز للعالم.', prod_sub:'برامج هادفة تحل مشاكل حقيقية للجيل الرقمي القادم.',
  prod_r_name:'RoomiesNest', prod_r_tag:'اعثر على شريك الغرفة المثالي.', prod_r_desc:'منصة مطابقة ذكية بالذكاء الاصطناعي مع ملفات شخصية موثقة.', prod_r_cta:'استكشف RoomiesNest',
  prod_ca_name:'CA Hunt', prod_ca_tag:'اعثر على المحاسب المناسب في دقائق.', prod_ca_desc:'تواصل مع محاسبين قانونيين موثقين يناسبون احتياجاتك.', prod_ca_cta:'استكشف CA Hunt',
  prod_soon:'قريباً', prod_view_all:'عرض جميع المنتجات',
  svc_label:'ما نفعله', svc_title:'حلول رقمية شاملة.', svc_sub:'نتعاون مع المؤسسين والشركات لبناء أنظمة برمجية ذكية.',
  svc_1_t:'تطوير برمجيات مخصصة', svc_1_d:'تطبيقات ويب وموبايل على بنية حديثة وقابلة للتوسع.',
  svc_2_t:'تكامل الذكاء الاصطناعي و LLM', svc_2_d:'نشر عوامل الذكاء الاصطناعي وأتمتة LLM.',
  svc_3_t:'استشارات المنتج', svc_3_d:'من التحقق من الفكرة حتى الإطلاق.',
  svc_4_t:'التحول الرقمي', svc_4_d:'تحديث الأنظمة القديمة وبناء البنية التحتية للذكاء الاصطناعي.',
  svc_cta:'ناقش مشروعك',
  miss_label:'مهمتنا', miss_title:'مهمة تستحق البناء من أجلها.',
  miss_quote:'ديمقراطية الابتكار الرقمي في الهند من خلال بناء برامج بديهية تبسط المهام المعقدة اليومية.',
  vis_title:'رؤيتنا', vis_quote:'بناء هند حيث التكنولوجيا ليست عقبة بل ريح خلفك.',
  contact_label:'تواصل معنا', contact_title:'لنبني شيئاً عظيماً.', contact_sub:'أخبرنا عن مشروعك وسنرد خلال 24 ساعة.',
  contact_name:'اسمك', contact_email:'عنوان البريد الإلكتروني', contact_msg:'أخبرنا عن مشروعك...', contact_send:'إرسال الرسالة',
  contact_address:'العنوان', contact_address_val:'بيون، ماهاراشترا، الهند',
  footer_tag:'نبني مستقبل الهند الرقمي، منتجاً واحداً في كل مرة.', footer_legal:'قانوني',
  footer_privacy:'سياسة الخصوصية', footer_terms:'شروط الخدمة',
  footer_copy:'© 2025 Vriddhi One. جميع الحقوق محفوظة.', footer_love:'صنع بـ ❤️ في الهند',
};

const SW: T = {
  nav_home:'Nyumbani', nav_products:'Bidhaa', nav_services:'Huduma', nav_about:'Kuhusu', nav_contact:'Wasiliana', nav_cta:'Wasiliana Nasi',
  hero_badge:'AI-Native · Imetengenezwa India 🇮🇳',
  hero_h1:'Tunajenga Programu', hero_h2:'Inayoirudishia India', hero_h3:'Muda Wake.',
  hero_sub:'Vriddhi One inaunda bidhaa za AI na suluhisho za kidijitali zinazosahilisha matatizo changamano.',
  hero_cta1:'Angalia Bidhaa', hero_cta2:'Anza Mradi',
  stats_clients:'20+', stats_clients_l:'Wateja Wafuraha', stats_products:'2', stats_products_l:'Bidhaa Zinazoishi',
  stats_team:'10+', stats_team_l:'Wanachama wa Timu', stats_countries:'3', stats_countries_l:'Nchi',
  prod_label:'Bidhaa Zetu', prod_title:'Iliyoundwa kwa India.\nIko Tayari kwa Dunia.', prod_sub:'Programu inayolenga kutatua matatizo halisi ya watumiaji wa dijitali.',
  prod_r_name:'RoomiesNest', prod_r_tag:'Tafuta mwenzi wako bora wa chumba.', prod_r_desc:'Jukwaa la kuoanisha la AI na wasifu uliothibitishwa.', prod_r_cta:'Chunguza RoomiesNest',
  prod_ca_name:'CA Hunt', prod_ca_tag:'Pata CA sahihi kwa dakika.', prod_ca_desc:'Unganika na wahasibu walioidhinishwa wanaofaa mahitaji yako.', prod_ca_cta:'Chunguza CA Hunt',
  prod_soon:'Hivi Karibuni', prod_view_all:'Ona Bidhaa Zote',
  svc_label:'Tunachofanya', svc_title:'Suluhisho Kamili za Kidijitali.', svc_sub:'Tunashirikiana na waanzilishi na makampuni kuunda mifumo ya programu yenye akili.',
  svc_1_t:'Uendelezaji wa Programu', svc_1_d:'Programu za wavuti na simu kwenye usanifu wa kisasa.',
  svc_2_t:'Ujumuishaji wa AI na LLM', svc_2_d:'Mawakala huru wa AI na uendeshaji otomatiki wa LLM.',
  svc_3_t:'Ushauri wa Bidhaa', svc_3_d:'Kutoka uthibitishaji wa wazo hadi uzinduzi.',
  svc_4_t:'Mabadiliko ya Kidijitali', svc_4_d:'Kisasa mifumo ya zamani na jenga miundombinu ya AI.',
  svc_cta:'Jadili Mradi Wako',
  miss_label:'Dhamira Yetu', miss_title:'Dhamira Inayostahili Kujenga.',
  miss_quote:'Kudemokrasia uvumbuzi wa kidijitali nchini India kwa kuunda programu inayosahilisha kazi ngumu za maisha.',
  vis_title:'Maono Yetu', vis_quote:'Kujenga India ambayo teknolojia si kikwazo bali upepo wa nyuma.',
  contact_label:'Wasiliana', contact_title:'Tuunde Kitu Kikubwa.', contact_sub:'Tuambie kuhusu mradi wako na tutajibu ndani ya saa 24.',
  contact_name:'Jina Lako', contact_email:'Anwani ya Barua Pepe', contact_msg:'Tuambie kuhusu mradi wako...', contact_send:'Tuma Ujumbe',
  contact_address:'Anwani', contact_address_val:'Pune, Maharashtra, India',
  footer_tag:'Kujenga mustakabali wa kidijitali wa India, bidhaa moja kwa wakati.', footer_legal:'Kisheria',
  footer_privacy:'Sera ya Faragha', footer_terms:'Masharti ya Huduma',
  footer_copy:'© 2025 Vriddhi One. Haki zote zimehifadhiwa.', footer_love:'Imetengenezwa kwa ❤️ nchini India',
};

const JA: T = {
  nav_home:'ホーム', nav_products:'製品', nav_services:'サービス', nav_about:'会社概要', nav_contact:'お問い合わせ', nav_cta:'お問い合わせ',
  hero_badge:'AIネイティブ · インド製 🇮🇳',
  hero_h1:'私たちはソフトウェアを', hero_h2:'構築し、インドに', hero_h3:'時間を取り戻します。',
  hero_sub:'Vriddhi OneはAI駆動の製品とデジタルソリューションを開発し、インドのビジネスが直面する複雑な問題を簡素化します。',
  hero_cta1:'製品を見る', hero_cta2:'プロジェクトを開始',
  stats_clients:'20+', stats_clients_l:'満足した顧客', stats_products:'2', stats_products_l:'稼働中の製品',
  stats_team:'10+', stats_team_l:'チームメンバー', stats_countries:'3', stats_countries_l:'国',
  prod_label:'私たちの製品', prod_title:'インドのために構築。\n世界への準備完了。', prod_sub:'次世代のデジタルファーストユーザーの本当の問題を解決する目的志向のソフトウェア。',
  prod_r_name:'RoomiesNest', prod_r_tag:'理想のルームメイトを見つけよう。', prod_r_desc:'AIを活用したルームメイトマッチングプラットフォーム。', prod_r_cta:'RoomiesNest を見る',
  prod_ca_name:'CA Hunt', prod_ca_tag:'数分で適切なCAを見つけよう。', prod_ca_desc:'あなたのニーズに合った認定会計士とつながる。', prod_ca_cta:'CA Hunt を見る',
  prod_soon:'近日公開', prod_view_all:'すべての製品を見る',
  svc_label:'私たちの仕事', svc_title:'エンドツーエンドのデジタルソリューション。', svc_sub:'創業者や企業と協力してインテリジェントなソフトウェアシステムを構築します。',
  svc_1_t:'カスタムソフトウェア開発', svc_1_d:'現代的なアーキテクチャに基づいたウェブ・モバイルアプリ。',
  svc_2_t:'AIとLLMの統合', svc_2_d:'自律型AIエージェントとLLM自動化のデプロイ。',
  svc_3_t:'プロダクトコンサルティング', svc_3_d:'アイデア検証からローンチまで。',
  svc_4_t:'デジタルトランスフォーメーション', svc_4_d:'レガシーシステムの近代化とAIインフラの構築。',
  svc_cta:'プロジェクトについて相談',
  miss_label:'私たちの使命', miss_title:'構築する価値のある使命。',
  miss_quote:'インドでデジタルイノベーションを民主化し、日常の複雑なタスクを簡素化する直感的なソフトウェアを構築する。',
  vis_title:'私たちのビジョン', vis_quote:'テクノロジーが障害ではなく追い風になるインドを構築する。',
  contact_label:'お問い合わせ', contact_title:'素晴らしいものを作りましょう。', contact_sub:'プロジェクトについて教えてください。24時間以内にご返答します。',
  contact_name:'お名前', contact_email:'メールアドレス', contact_msg:'プロジェクトについて教えてください...', contact_send:'送信',
  contact_address:'住所', contact_address_val:'プネ、マハーラーシュトラ州、インド',
  footer_tag:'一度に一つの製品でインドのデジタルな未来を構築。', footer_legal:'法的情報',
  footer_privacy:'プライバシーポリシー', footer_terms:'利用規約',
  footer_copy:'© 2025 Vriddhi One. 無断複写・転載を禁じます。', footer_love:'インドで❤️を込めて制作',
};

const ZH: T = {
  nav_home:'首页', nav_products:'产品', nav_services:'服务', nav_about:'关于我们', nav_contact:'联系我们', nav_cta:'立即联系',
  hero_badge:'AI原生 · 印度制造 🇮🇳',
  hero_h1:'我们构建软件', hero_h2:'为印度', hero_h3:'夺回时间。',
  hero_sub:'Vriddhi One 开发AI驱动的产品和数字解决方案，简化印度企业面临的复杂问题。',
  hero_cta1:'探索产品', hero_cta2:'启动项目',
  stats_clients:'20+', stats_clients_l:'满意客户', stats_products:'2', stats_products_l:'在线产品',
  stats_team:'10+', stats_team_l:'团队成员', stats_countries:'3', stats_countries_l:'国家',
  prod_label:'我们的产品', prod_title:'为印度而建。\n为世界准备。', prod_sub:'为下一代数字优先用户解决实际问题的软件。',
  prod_r_name:'RoomiesNest', prod_r_tag:'找到你完美的室友。', prod_r_desc:'AI驱动的室友匹配平台，经过验证的个人资料，智能兼容性评分。', prod_r_cta:'探索 RoomiesNest',
  prod_ca_name:'CA Hunt', prod_ca_tag:'几分钟内找到合适的CA。', prod_ca_desc:'与符合您需求的认证会计师建立联系。', prod_ca_cta:'探索 CA Hunt',
  prod_soon:'即将推出', prod_view_all:'查看所有产品',
  svc_label:'我们的工作', svc_title:'端到端数字解决方案。', svc_sub:'我们与创始人和企业合作，构建智能软件系统。',
  svc_1_t:'定制软件开发', svc_1_d:'基于现代可扩展架构的网页和移动应用。',
  svc_2_t:'AI和LLM集成', svc_2_d:'部署自主AI代理和LLM自动化。',
  svc_3_t:'产品咨询', svc_3_d:'从创意验证到产品上市。',
  svc_4_t:'数字化转型', svc_4_d:'遗留系统现代化和AI基础设施建设。',
  svc_cta:'讨论您的项目',
  miss_label:'我们的使命', miss_title:'值得为之构建的使命。',
  miss_quote:'通过构建直观、目的驱动的软件来民主化印度的数字创新，简化复杂的日常任务。',
  vis_title:'我们的愿景', vis_quote:'建立一个技术不是障碍而是顺风的印度。',
  contact_label:'联系我们', contact_title:'让我们共建伟大。', contact_sub:'告诉我们您的项目，我们将在24小时内回复。',
  contact_name:'您的姓名', contact_email:'电子邮件地址', contact_msg:'告诉我们您的项目...', contact_send:'发送消息',
  contact_address:'地址', contact_address_val:'印度马哈拉施特拉邦浦那',
  footer_tag:'一次一个产品，构建印度的数字未来。', footer_legal:'法律',
  footer_privacy:'隐私政策', footer_terms:'服务条款',
  footer_copy:'© 2025 Vriddhi One. 保留所有权利。', footer_love:'在印度用❤️制作',
};

const KO: T = {
  nav_home:'홈', nav_products:'제품', nav_services:'서비스', nav_about:'회사소개', nav_contact:'문의', nav_cta:'문의하기',
  hero_badge:'AI 네이티브 · 인도 제조 🇮🇳',
  hero_h1:'우리는 소프트웨어를', hero_h2:'만들어 인도에', hero_h3:'시간을 돌려줍니다.',
  hero_sub:'Vriddhi One은 AI 기반 제품과 디지털 솔루션을 개발하여 인도 기업의 복잡한 문제를 단순화합니다.',
  hero_cta1:'제품 보기', hero_cta2:'프로젝트 시작',
  stats_clients:'20+', stats_clients_l:'만족 고객', stats_products:'2', stats_products_l:'라이브 제품',
  stats_team:'10+', stats_team_l:'팀 멤버', stats_countries:'3', stats_countries_l:'국가',
  prod_label:'우리의 제품', prod_title:'인도를 위해 구축.\n세계를 위해 준비.', prod_sub:'차세대 디지털 퍼스트 사용자를 위한 실제 문제를 해결하는 소프트웨어.',
  prod_r_name:'RoomiesNest', prod_r_tag:'완벽한 룸메이트를 찾으세요.', prod_r_desc:'AI 기반 룸메이트 매칭 플랫폼, 인증된 프로필, 스마트 호환성 점수.', prod_r_cta:'RoomiesNest 탐색',
  prod_ca_name:'CA Hunt', prod_ca_tag:'몇 분 안에 적합한 CA를 찾으세요.', prod_ca_desc:'당신의 필요에 맞는 공인 회계사와 연결하세요.', prod_ca_cta:'CA Hunt 탐색',
  prod_soon:'출시 예정', prod_view_all:'모든 제품 보기',
  svc_label:'우리가 하는 일', svc_title:'엔드투엔드 디지털 솔루션.', svc_sub:'창업자 및 기업과 협력하여 지능형 소프트웨어 시스템을 구축합니다.',
  svc_1_t:'맞춤 소프트웨어 개발', svc_1_d:'현대적인 아키텍처 기반 웹 및 모바일 애플리케이션.',
  svc_2_t:'AI & LLM 통합', svc_2_d:'자율 AI 에이전트 및 LLM 자동화 배포.',
  svc_3_t:'제품 컨설팅', svc_3_d:'아이디어 검증부터 시장 출시까지.',
  svc_4_t:'디지털 전환', svc_4_d:'레거시 시스템 현대화 및 AI 인프라 구축.',
  svc_cta:'프로젝트 논의하기',
  miss_label:'우리의 사명', miss_title:'구축할 가치가 있는 사명.',
  miss_quote:'직관적인 소프트웨어를 구축하여 인도의 디지털 혁신을 민주화하고 복잡한 일상 작업을 단순화합니다.',
  vis_title:'우리의 비전', vis_quote:'기술이 장애물이 아니라 순풍이 되는 인도를 건설합니다.',
  contact_label:'문의하기', contact_title:'무언가 위대한 것을 만들어봅시다.', contact_sub:'프로젝트에 대해 알려주시면 24시간 이내에 연락드리겠습니다.',
  contact_name:'이름', contact_email:'이메일 주소', contact_msg:'프로젝트에 대해 알려주세요...', contact_send:'메시지 보내기',
  contact_address:'주소', contact_address_val:'인도 마하라슈트라주 푸네',
  footer_tag:'한 번에 하나의 제품으로 인도의 디지털 미래를 구축합니다.', footer_legal:'법적 고지',
  footer_privacy:'개인정보 처리방침', footer_terms:'이용약관',
  footer_copy:'© 2025 Vriddhi One. 모든 권리 보유.', footer_love:'인도에서 ❤️로 제작',
};

const MAP: Record<Language, T> = { en:EN, hi:HI, mr:MR, fr:FR, de:DE, es:ES, it:IT, pt:PT, ru:RU, ar:AR, sw:SW, ja:JA, zh:ZH, ko:KO };

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private _lang = signal<Language>((localStorage.getItem('v1_lang') as Language) || 'en');

  readonly lang   = this._lang.asReadonly();
  readonly t      = computed(() => MAP[this._lang()]);
  readonly meta   = computed(() => LANG_META[this._lang()]);
  readonly isRtl  = computed(() => LANG_META[this._lang()].dir === 'rtl');
  readonly groups = LANG_GROUPS;
  readonly allLangs = Object.keys(LANG_META) as Language[];

  getLangsInGroup(group: string): Language[] {
    return this.allLangs.filter(k => LANG_META[k].group === group);
  }

  set(lang: Language): void {
    this._lang.set(lang);
    localStorage.setItem('v1_lang', lang);
    document.documentElement.lang = lang;
  }
}
