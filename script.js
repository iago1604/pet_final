// script.js

// 1. DADOS (Mock Data - Lista Atualizada de Animais para Adoção)
const MOCK_PETS = [
    {
        id: 1, 
        name: 'Apollo', 
        type: 'Cachorro', 
        breed: 'Golden Retriever', 
        age: '3 anos', 
        gender: 'Macho',
        imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800',
        description: 'Apollo é o cachorro mais sorridente que você vai conhecer! Ama nadar, pegar bolinhas e ser o centro das atenções. Perfeito para famílias com crianças e quintal grande.',
        traits: ['Sociável', 'Ativo', 'Ama Água'], 
        adopted: false
    },
    {
        id: 2, 
        name: 'Maya', 
        type: 'Gato', 
        breed: 'SRD (Tigrada)', 
        age: '8 meses', 
        gender: 'Fêmea',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800',
        description: 'Maya foi resgatada de uma tempestade e hoje busca um sofá quentinho. Ela é curiosa, adora observar passarinhos pela janela e ronrona alto quando recebe carinho no pescoço.',
        traits: ['Curiosa', 'Carinhosa', 'Apartamento'], 
        adopted: false
    },
    {
        id: 3, 
        name: 'Bidu', 
        type: 'Cachorro', 
        breed: 'Terrier Mix', 
        age: '5 anos', 
        gender: 'Macho',
        imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800',
        description: 'Bidu é um lorde. Educado, faz as necessidades no lugar certo e adora andar de carro. Seu passatempo favorito é ficar deitado nos pés do dono enquanto ele trabalha.',
        traits: ['Educado', 'Calmo', 'Companheiro'], 
        adopted: false
    },
    {
        id: 4, 
        name: 'Fumaça', 
        type: 'Gato', 
        breed: 'Persa Cinza', 
        age: '4 anos', 
        gender: 'Macho',
        imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800',
        description: 'Com seu olhar penetrante, Fumaça parece julgar seus atos, mas na verdade só quer sachê. É um gato independente, ideal para quem trabalha fora e quer um amigo tranquilo ao chegar em casa.',
        traits: ['Independente', 'Tranquilo', 'Majestoso'], 
        adopted: false
    },
    {
        id: 5, 
        name: 'Pipoca', 
        type: 'Cachorro', 
        breed: 'Vira-lata (Filhote)', 
        age: '3 meses', 
        gender: 'Fêmea',
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800',
        description: 'Pipoca é pura alegria caótica! Ainda está aprendendo a andar na coleira. Procura uma família com paciência para ensinar e disposição para muitas brincadeiras de morder.',
        traits: ['Filhote', 'Energia Alta', 'Brincalhona'], 
        adopted: false
    },
    {
        id: 6, 
        name: 'Bartolomeu', 
        type: 'Cachorro', 
        breed: 'Basset Hound', 
        age: '7 anos', 
        gender: 'Macho',
        imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800',
        description: 'Bartô, para os íntimos. Com seus olhos doces e orelhas longas, ele conquista qualquer um. É um cão sênior que só quer curtir a aposentadoria com sonecas longas e petiscos.',
        traits: ['Sênior', 'Preguiçoso', 'Dócil'], 
        adopted: false
    },
    {
        id: 7, 
        name: 'Lola & Lilo', 
        type: 'Gato', 
        breed: 'Siameses', 
        age: '2 anos', 
        gender: 'Fêmeas',
        imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800',
        description: 'Irmãs inseparáveis! Fazemos tudo juntas. Lola é a protetora e Lilo a aventureira. Buscamos uma adoção dupla para não separarmos nosso laço eterno de amizade.',
        traits: ['Dupla', 'Vocal', 'Amorosas'], 
        adopted: false
    },
    {
        id: 8, 
        name: 'Thor', 
        type: 'Cachorro', 
        breed: 'Pitbull', 
        age: '4 anos', 
        gender: 'Macho',
        imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=800',
        description: 'Apesar da cara de bravo, Thor é um bobão. Acredita ser um cachorro de colo (pesa 30kg). Super dócil com humanos, mas prefere ser filho único (sem outros animais).',
        traits: ['Forte', 'Protetor', 'Carente'], 
        adopted: false
    }
];

// 2. ESTADO DA APLICAÇÃO (State)
let state = {
    category: 'Todos',
    search: '',
    selectedPetId: null
};

// 3. FUNÇÕES PRINCIPAIS E DE RENDERIZAÇÃO

// Renderiza a grade de cards
function renderPets() {
    const grid = document.getElementById('pets-grid');
    grid.innerHTML = ''; // Limpa o grid atual

    // Filtragem
    const filtered = MOCK_PETS.filter(pet => {
        const matchCat = state.category === 'Todos' || pet.type === state.category;
        const matchSearch = pet.name.toLowerCase().includes(state.search.toLowerCase()) || 
                            pet.breed.toLowerCase().includes(state.search.toLowerCase());
        return matchCat && matchSearch;
    });

    // Caso nenhum pet seja encontrado
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400">
            <p>Nenhum amigo encontrado com esses filtros. Tente mudar a busca.</p>
        </div>`;
        return;
    }

    // Geração do HTML dos Cards
    filtered.forEach(pet => {
        const card = document.createElement('div');
        // Classes Tailwind para o Card (inclui hover effects)
        card.className = "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-200/40 hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full";
        // Adiciona evento de clique para abrir detalhes
        card.onclick = () => openPetDetail(pet.id);

        card.innerHTML = `
            <div class="h-64 overflow-hidden relative">
                <img src="${pet.imageUrl}" alt="${pet.name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-brand-orange shadow-sm">${pet.breed}</div>
            </div>
            <div class="p-6 flex flex-col flex-1">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-2xl font-black text-brand-black group-hover:text-brand-orange transition">${pet.name}</h3>
                    <span class="text-gray-400 font-medium text-sm">${pet.age}</span>
                </div>
                <div class="flex gap-2 mb-4 flex-wrap">
                    ${pet.traits.map(t => `<span class="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-100">${t}</span>`).join('')}
                </div>
                <div class="mt-auto flex items-center text-brand-orange font-bold text-sm">
                    Conhecer ${pet.name} <i data-lucide="arrow-right" class="ml-2 h-4 w-4"></i>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Atualiza ícones Lucide nos novos elementos inseridos
    lucide.createIcons();
}

// Filtra por Categoria (clique nos botões Cães, Gatos, etc)
function setCategory(cat) {
    state.category = cat;
    
    // Atualiza visualmente qual botão está ativo
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.dataset.type === cat) {
            btn.className = "filter-btn px-6 py-2 rounded-full font-bold transition bg-brand-orange text-white shadow-md";
        } else {
            btn.className = "filter-btn px-6 py-2 rounded-full font-bold transition text-gray-500 hover:text-brand-orange hover:bg-orange-50";
        }
    });
    
    // Re-renderiza a lista com o novo filtro
    renderPets();
}

// Navegação simples (Scroll) e reset de views
function handleNavigate(sectionId) {
    closePetDetail(); // Garante que a tela de detalhes feche
    
    // Pequeno atraso para a animação
    setTimeout(() => {
        const el = document.getElementById(sectionId);
        if(el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// 4. SISTEMA DE DETALHES DO PET
function openPetDetail(id) {
    const pet = MOCK_PETS.find(p => p.id === id);
    if (!pet) return;

    const detailContainer = document.getElementById('pet-detail-view');
    const listContainer = document.getElementById('list-view');
    
    // Troca visibilidade das seções
    listContainer.classList.add('hidden');
    detailContainer.classList.remove('hidden');
    window.scrollTo({top:0, behavior:'smooth'}); // Rola para o topo

    // Gera HTML de Detalhe
    detailContainer.innerHTML = `
        <button onclick="closePetDetail()" class="mb-6 text-gray-500 hover:text-brand-orange flex items-center gap-2 font-medium transition">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Voltar para lista
        </button>
        
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div class="h-96 md:h-auto relative bg-gray-100">
                <img src="${pet.imageUrl}" class="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div class="p-8 md:p-12 flex flex-col justify-center bg-white">
                <div class="flex items-center gap-3 mb-2">
                    <span class="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">${pet.type}</span>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-black mb-4 text-brand-black">${pet.name}</h1>
                <p class="text-xl text-gray-500 mb-6 flex items-center gap-2">
                     ${pet.breed} • ${pet.age} • ${pet.gender}
                </p>
                
                <p class="text-gray-700 text-lg leading-relaxed mb-8 border-l-4 border-brand-orange pl-4">
                    ${pet.description}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-8">
                    ${pet.traits.map(t => `<span class="bg-orange-50 text-brand-orange border border-orange-100 px-4 py-2 rounded-lg font-medium">${t}</span>`).join('')}
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button onclick="openModal('adopt')" class="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-orange-200 text-center flex items-center justify-center gap-2">
                        Adotar ${pet.name} <i data-lucide="heart" class="w-5 h-5 fill-current"></i>
                    </button>
                    <button class="px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-brand-orange hover:text-brand-orange font-bold transition flex items-center justify-center gap-2">
                         <i data-lucide="share-2" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Atualiza ícones na view de detalhes
    lucide.createIcons();
}

function closePetDetail() {
    document.getElementById('pet-detail-view').classList.add('hidden');
    document.getElementById('list-view').classList.remove('hidden');
}

// 5. SISTEMA DE MODAL (Pop-ups)
function openModal(type) {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');

    // Botão Fechar padrão
    let html = `<button onclick="closeModal()" class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"><i data-lucide="x" class="w-5 h-5"></i></button>`;

    // Conteúdo condicional
    if (type === 'donate') {
        html += `
            <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <i data-lucide="gift" class="text-brand-orange h-10 w-10"></i>
            </div>
            <h3 class="text-2xl font-black text-brand-black mb-3">Doar Ração & Amor</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">
                Aceitamos doações em nossa sede ou via PIX para manter as barriguinhas cheias.
            </p>
            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                <p class="text-xs uppercase font-bold text-gray-400 mb-1">Chave PIX (Email)</p>
                <p class="font-mono text-lg font-bold select-all cursor-pointer hover:text-brand-orange">doacao@petconnect.com</p>
            </div>
            <button onclick="closeModal()" class="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                Combinado, vou ajudar!
            </button>
        `;
    } else if (type === 'volunteer') {
        html += `
            <div class="w-20 h-20 bg-brand-black rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl">
                <i data-lucide="heart-handshake" class="h-10 w-10"></i>
            </div>
            <h3 class="text-2xl font-black text-brand-black mb-3">Seja Voluntário</h3>
            <p class="text-gray-600 mb-6">
                Precisamos de passeadores, fotógrafos e muito carinho nos finais de semana!
            </p>
            <a href="mailto:voluntarios@petconnect.com" class="block w-full bg-brand-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition shadow-lg mb-3">
                Enviar Email
            </a>
            <button onclick="closeModal()" class="w-full text-gray-500 font-semibold py-2 hover:text-brand-black">Cancelar</button>
        `;
    } else if (type === 'match') {
        html += `
            <div class="w-20 h-20 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                <i data-lucide="sparkles" class="h-10 w-10"></i>
            </div>
            <h3 class="text-2xl font-black text-brand-black mb-3">IA Matcher</h3>
            <p class="text-gray-600 mb-6">
                Nossa Inteligência Artificial está analisando seu estilo de vida para encontrar o pet perfeito... (Simulação)
            </p>
            <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
                <div class="h-full bg-brand-orange w-2/3"></div>
            </div>
            <button onclick="closeModal()" class="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition">Ver Resultados</button>
        `;
    } else if (type === 'adopt') {
        html += `
             <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <i data-lucide="check-circle" class="h-10 w-10"></i>
            </div>
            <h3 class="text-2xl font-black text-brand-black mb-2">Interesse Registrado!</h3>
            <p class="text-gray-600 mb-6">O abrigo entrará em contato em breve para agendar uma visita.</p>
            <button onclick="closeModal()" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-lg">Ótimo!</button>
        `;
    }

    content.innerHTML = html;
    lucide.createIcons(); // Renderiza ícones dentro do modal recém criado
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}

// 6. INICIALIZAÇÃO DA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    // Configura o ouvinte de busca
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.search = e.target.value;
            renderPets(); // Filtra em tempo real
        });
    }

    // Renderiza a lista inicial
    renderPets();
    
    // Inicia ícones
    lucide.createIcons();
});