# 🎮 Pokédex Interativa

![GitHub repo size](https://img.shields.io/github/repo-size/mellpg/Pok-dex?style=for-the-badge&color=ef5350)
![GitHub language count](https://img.shields.io/github/languages/count/mellpg/Pok-dex?style=for-the-badge&color=feca1b)
![GitHub last commit](https://img.shields.io/github/last-commit/mellpg/Pok-dex?style=for-the-badge&color=3b4cca)

Uma aplicação interativa e moderna desenvolvida para explorar o universo Pokémon. Esta Pokédex consome dados em tempo real diretamente da **PokeAPI**, oferecendo uma experiência rica com recursos visuais dinâmicos, efeitos sonoros e detalhes profundos de cada criatura.

---
## 🤳🏻 Demonstração 
<video src="https://github.com/mellpg/Pok-dex/raw/main/poke-demo.mp4" autoplay loop muted playsinline width="100%"></video>



## ✨ Funcionalidades

* 🔍 **Busca Inteligente:** Encontre qualquer Pokémon instantaneamente digitando o seu nome ou o número do ID oficial.
* 🎨 **Interface Dinâmica:** O esquema de cores e o plano de fundo da aplicação adaptam-se automaticamente com base no tipo principal do Pokémon selecionado (ex: Fogo = Vermelho/Laranja, Água = Azul).
* 🔊 **Áudio Integrado:** Ouça o som/grito original (cry) do Pokémon ao abrir a sua carta de informações.
* 📊 **Status Detalhados:** Exibição clara das estatísticas base (HP, Ataque, Defesa, Velocidade, etc.) através de barras visuais.
* 🏷️ **Tipos e Descrições:** Lista os tipos do Pokémon com badges estilizadas e exibe a descrição oficial extraída dos jogos.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e ecossistemas:

* **[Python](https://www.python.org/)** - Linguagem base do projeto.
* **[Django] (https://www.djangoproject.com/)** - Backend
* **[HTML5] (https://developer.mozilla.org/pt-BR/docs/Web/HTML)** - Frontend
* **[CSS3] (https://developer.mozilla.org/pt-BR/docs/Web/CSS)** - Frontend
* **[JavaScript] (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Frontend
* **[PokeAPI](https://pokeapi.co/)** - API RESTful pública utilizada para obter todos os dados atualizados dos Pokémon.
* **[Requests](https://requests.readthedocs.io/)** - Biblioteca HTTP para consumo da API.

---

## 📦 Como Executar o Projeto

Siga os passos abaixo para clonar o repositório e rodar a aplicação na sua máquina local:

### 📋 Pré-requisitos

Antes de começar, certifique-se de que tem o **Python 3.8+** e o **Git** instalados no seu computador.

### 🔧 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/mellpg/Pok-dex.git](https://github.com/mellpg/Pok-dex.git)
2. **Instale as dependências necessárias:**
   ```bash
   pip install -r requirements.txt
3. **Inicie a aplicação:**
   ```bash
   python manage.py runserver
