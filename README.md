
# ReactShop - Mini E-commerce

Um protótipo funcional de loja virtual desenvolvido com React e TypeScript, consumindo dados da Fake Store API.

## 🚀 Funcionalidades

- **Listagem de Produtos**: Visualização de todos os produtos em cards responsivos
- **Detalhes do Produto**: Página detalhada com informações completas
- **Filtro por Categoria**: Sistema de filtros por categoria de produtos
- **Carrinho de Compras**: Adição, remoção e gerenciamento de produtos no carrinho
- **Design Responsivo**: Interface adaptada para desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **React Router** para navegação
- **Axios** para consumo da API
- **Context API** para gerenciamento de estado
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes
- **Fake Store API** como fonte de dados

## 📋 Conceitos Aplicados

- ✅ `useState` e `useEffect` para controle de estado e ciclo de vida
- ✅ Navegação com React Router (BrowserRouter, Routes, Route, useParams)
- ✅ Consumo de API com axios
- ✅ Context API para estado global
- ✅ TypeScript para tipagem
- ✅ Componentes reutilizáveis
- ✅ Design responsivo

## 🌐 API Endpoints Utilizados

- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Detalhes de um produto específico
- `GET /products/categories` - Lista todas as categorias
- `GET /products/category/:category` - Produtos de uma categoria específica

## 📱 Funcionalidades do Carrinho

- Adicionar produtos ao carrinho
- Alterar quantidade de itens
- Remover produtos do carrinho
- Visualizar total da compra
- Contador de itens no header

## 🔧 Como Executar

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Navegue até o diretório
cd reactshop

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

## 📂 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Context API (CartContext)
├── pages/              # Páginas da aplicação
├── services/           # Serviços para API
├── types/              # Tipos TypeScript
└── App.tsx             # Componente principal
```

## 👥 Grupo

Luiz Felipe de Oliveira Mello
Cassiano Socorro
Arthur Varizi
Caio Braba
João Luiz
Gabriel Costa
Daniel 

---
