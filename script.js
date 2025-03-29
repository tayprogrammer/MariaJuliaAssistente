// script.js - MariaJuliaAssistente

document.addEventListener('DOMContentLoaded', () => {
    // Configurações iniciais
    const header = document.querySelector('.nav-termos');
    const backToTopButton = document.createElement('button');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-termos a');
    
    // 1. Scroll suave com compensação do header fixo
    function configureSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualiza a URL sem recarregar a página
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // 2. Botão "Voltar ao Topo"
    function setupBackToTop() {
        backToTopButton.innerHTML = '↑';
        backToTopButton.className = 'back-to-top';
        backToTopButton.ariaLabel = 'Voltar ao topo da página';
        document.body.appendChild(backToTopButton);

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            backToTopButton.style.display = window.scrollY > 500 ? 'block' : 'none';
        });
    }

    // 3. Data da última atualização
    function displayLastUpdated() {
        const lastUpdatedElement = document.querySelector('.ultima-atualizacao');
        if (lastUpdatedElement) {
            const lastModified = new Date(document.lastModified);
            lastUpdatedElement.textContent = `Última atualização: ${lastModified.toLocaleDateString('pt-BR')}`;
        }
    }

    // 4. Controle de links externos
    function handleExternalLinks() {
        document.querySelectorAll('a').forEach(link => {
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.addEventListener('click', (e) => {
                    if (!confirm('Você está sendo redirecionado para um site externo. Deseja continuar?')) {
                        e.preventDefault();
                    }
                });
            }
        });
    }

    // 5. Destaque da seção ativa
    function setActiveSection() {
        const observerOptions = {
            rootMargin: '-50px 0px -50px 0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-termos a[href="#${id}"]`);

                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // 6. Inicialização de todas as funções
    function init() {
        configureSmoothScroll();
        setupBackToTop();
        displayLastUpdated();
        handleExternalLinks();
        setActiveSection();
        
        // Garante que o header não cubra o conteúdo
        document.documentElement.style.scrollPaddingTop = `${header.offsetHeight}px`;
    }

    init();

    // 7. Atualização dinâmica em redimensionamento
    window.addEventListener('resize', () => {
        document.documentElement.style.scrollPaddingTop = `${header.offsetHeight}px`;
    });
});
