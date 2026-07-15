(function () {
  const pokemonInput = document.getElementById("pokemon-input");
  const btnBuscar = document.getElementById("btn-buscar");
  const pokemonCard = document.getElementById("pokemon-card");
  const erroMsg = document.getElementById("erro-msg");
  const pokemonImg = document.getElementById("pokemon-img");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonId = document.getElementById("pokemon-id");
  const pokemonTypes = document.getElementById("pokemon-types");
  const pokemonHeight = document.getElementById("pokemon-height");
  const pokemonWeight = document.getElementById("pokemon-weight");
  const btnAudio = document.getElementById("btn-audio");
  const pokemonCry = document.getElementById("pokemon-cry");
  const pokemonDescription = document.getElementById("pokemon-description");
  const btnMega = document.getElementById("btn-mega");
  let nomeMegaDisponivel = null; // Guarda o nome da evolução se houver

  // Dicionário de cores para cada tipo de Pokémon
  const coresTipos = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705746",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
    normal: "#A8A878",
  };

  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("pokedex-theme", newTheme);

    const checkbox = document.getElementById("theme-checkbox");
    checkbox.checked = newTheme === "light";
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem("pokedex-theme");
    const checkbox = document.getElementById("theme-checkbox");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      checkbox.checked = savedTheme === "light";
    } else {
      // Se não tiver tema salvo, começa com claro
      document.documentElement.setAttribute("data-theme", "light");
      checkbox.checked = true;
    }
  }

  document
    .getElementById("theme-checkbox")
    .addEventListener("change", toggleTheme);

  async function buscarPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase().trim()}`;
    pokemonCard.classList.add("hidden");
    erroMsg.classList.add("hidden");

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Pokémon não encontrado");
      const data = await response.json();

      // Busca a descrição (enredo) na PokeAPI Species
      let descricao = "Sem descrição disponível.";
      try {
        const speciesResponse = await fetch(data.species.url);
        if (speciesResponse.ok) {
          const speciesData = await speciesResponse.json();
          const entradaTexto =
            speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "pt"
            ) ||
            speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            );

          if (entradaTexto) {
            descricao = entradaTexto.flavor_text.replace(/\f/g, " ");
          }
        }
      } catch (e) {
        console.error("Erro ao buscar descrição", e);
      }

      // Passa os dados do pokémon e a descrição para renderizar
      renderizarPokemon(data, descricao);
    } catch (error) {
      erroMsg.classList.remove("hidden");
      limparCard();
    }
  }

  function renderizarPokemon(pokemon, descricao) {
    erroMsg.classList.add("hidden");
    pokemonCard.classList.remove("hidden");

    pokemonName.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonId.textContent = `#${String(pokemon.id).padStart(3, "0")}`;

    const imgUrl =
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default ||
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
    pokemonImg.src = imgUrl;
    pokemonImg.alt = pokemon.name;

    const heightInM = (pokemon.height / 10).toFixed(1);
    const weightInKg = (pokemon.weight / 10).toFixed(1);
    pokemonHeight.textContent = `${heightInM}m`;
    pokemonWeight.textContent = `${weightInKg}kg`;

    // 1. ADICIONADO: Exibe a descrição/enredo na tela
    pokemonDescription.textContent = descricao;

    // 2. ADICIONADO: Aplica a cor dinâmica baseada no primeiro tipo
    const tipoPrincipal = pokemon.types[0].type.name;
    const corDeFundo = coresTipos[tipoPrincipal] || "var(--color-bg)";

    // 3. ADICIONADO: Configura o som/grito do Pokémon
    if (pokemon.cries && pokemon.cries.latest) {
      pokemonCry.src = pokemon.cries.latest;
      btnAudio.classList.remove("hidden");
    } else {
      btnAudio.classList.add("hidden");
    }

    pokemonTypes.innerHTML = "";
    pokemon.types.forEach((item) => {
      const typeName = item.type.name;
      const span = document.createElement("span");
      span.className = `type-badge type-${typeName}`;
      span.textContent = typeName;
      pokemonTypes.appendChild(span);


      const listaMegas = {
        "charizard": "charizard-mega-x",
        "mewtwo": "mewtwo-mega-x",
        "gengar": "gengar-mega",
        "lucario": "lucario-mega",
        "gyarados": "gyarados-mega",
        "blaziken": "blaziken-mega"
      };
  
      const nomeAtual = pokemon.name.toLowerCase();
  
      if (listaMegas[nomeAtual]) {
        nomeMegaDisponivel = listaMegas[nomeAtual];
        btnMega.textContent = "🧬";
        btnMega.classList.remove("hidden");
      } else if (nomeAtual.includes("-mega")) {
        
        nomeMegaDisponivel = nomeAtual.split("-mega")[0];
        btnMega.textContent = "↩️";
        btnMega.classList.remove("hidden");
      } else {
        btnMega.classList.add("hidden");
      }

    });
  }
  function limparCard() {
    pokemonName.textContent = "—";
    pokemonId.textContent = "#000";
    pokemonImg.src = "";
    pokemonImg.alt = "Pokémon";
    pokemonTypes.innerHTML = "";
    pokemonHeight.textContent = "—";
    pokemonWeight.textContent = "—";
    btnMega.classList.add("hidden");

    pokemonDescription.textContent = "—";
    btnAudio.classList.add("hidden");
    pokemonCard.style.backgroundColor = "var(--color-bg)";
  }
  function handleSearch() {
    const valor = pokemonInput.value.trim();
    if (valor) {
      buscarPokemon(valor);
    } else {
      pokemonCard.classList.add("hidden");
      erroMsg.classList.add("hidden");
      limparCard();
    }
  }

  btnBuscar.addEventListener("click", handleSearch);
  pokemonInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  pokemonInput.addEventListener("input", () => {
    if (!pokemonCard.classList.contains("hidden")) return;
    erroMsg.classList.add("hidden");
  });
  btnAudio.addEventListener("click", () => pokemonCry.play());
  loadTheme();
  buscarPokemon("pikachu");
  btnMega.addEventListener("click", () => {
    if (nomeMegaDisponivel) {
      buscarPokemon(nomeMegaDisponivel);
    }
  });

  btnMega.addEventListener("click", function(e) {
    e.stopPropagation(); // Evita conflitos
    if (nomeMegaDisponivel) {
      buscarPokemon(nomeMegaDisponivel);
    }
  });

})();
