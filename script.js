// Configurações iniciais
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll suave para seções
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100; // Compensação para a nav fixa
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

    // 2. Destaque dinâmico de seções
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('secao-ativa');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // 3. Botão "Voltar ao Topo"
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.ariaLabel = 'Voltar ao topo da página';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        backToTop.style.display = (window.scrollY > 500) ? 'block' : 'none';
    });

    // 4. Data da última atualização
    const lastUpdated = document.createElement('p');
    lastUpdated.className = 'ultima-atualizacao';
    lastUpdated.innerHTML = `Última atualização: ${new Date(document.lastModified).toLocaleDateString('pt-BR')}`;
    document.querySelector('section[aria-labelledby="atualizacoes"]').appendChild(lastUpdated);

    // 5. Interação com links de contato
    document.querySelectorAll('address a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!confirm('Você está sendo redirecionado para um recurso externo. Continuar?')) {
                e.preventDefault();
            }
        });
    });

    console.log('Política de Privacidade - Funcionalidades carregadas com sucesso!');
});
