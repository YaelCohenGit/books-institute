document.addEventListener("DOMContentLoaded", () => {
    // קוד לטיפול במודל (Modal)
    const modal = document.getElementById("gif-modal");
    const gifImage = document.getElementById("gif-image");
    const closeBtn = document.querySelector(".modal-content .close");

    document.querySelectorAll(".view-toc").forEach(button => {
        button.addEventListener("click", () => {
            const gifSrc = button.dataset.gif;
            gifImage.src = gifSrc;
            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        gifImage.src = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            gifImage.src = "";
        }
    });

    const langButtons = {
        en: document.getElementById("lang-en"),
        es: document.getElementById("lang-es"),
        he: document.getElementById("lang-he") 
    };

    const updateLanguageAttribute = (lang) => {
        document.documentElement.setAttribute("lang", lang);
    };
    
    langButtons.he.addEventListener("click", () => {
        updateLanguageAttribute("he");
        loadTranslations("he");
    });
    
    
    const elementsToTranslate = {
        about: document.querySelector("nav ul li a[href='#about']"),
        books: document.querySelector("nav ul li a[href='#books']"),
        contact: document.querySelector("nav ul li a[href='#contact']"),
        heroTitle: document.querySelector(".hero h1"),
        ctaButton: document.querySelector(".hero .cta-button"),
        featuredBooks: document.querySelector("#books h2"),
        aboutTitle: document.querySelector("#about h2"), // כותרת About Us
        aboutText: document.querySelectorAll("#about p"), // פסקאות About Us
        contactTitle: document.querySelector("#contact h2"), // כותרת Contact
        contactLabels: document.querySelectorAll("#contact label"), // תוויות טופס יצירת קשר
        contactButton: document.querySelector("#contact button"), // כפתור הטופס
    };
    

    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`./translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations: ${response.status}`);
            }
            const translations = await response.json();
            console.log(translations); // לבדוק את האובייקט
    
            for (const key in elementsToTranslate) {
                const element = elementsToTranslate[key];
                // תרגום פסקאות או תוויות מרובות
                if (key === "aboutText" || key === "contactLabels") {
                    element.forEach((el, index) => {
                        if (translations[key] && translations[key][index]) {
                            el.textContent = translations[key][index];
                        }
                    });
                }
                // תרגום טקסט של אלמנט בודד
                else if (element && translations[key]) {
                    element.textContent = translations[key];
                }
            }
        } catch (error) {
            console.error("Error loading translations:", error);
        }
    };
    
    


    langButtons.en.addEventListener("click", () => loadTranslations("en"));
    langButtons.es.addEventListener("click", () => loadTranslations("es"));
    langButtons.he.addEventListener("click", () => loadTranslations("he"));

});
