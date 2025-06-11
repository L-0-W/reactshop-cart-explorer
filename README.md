
# ReactShop - Mini E-commerce

Um protótipo funcional de loja virtual desenvolvido com React e TypeScript, consumindo dados da Fake Store API.

## 🚀 Funcionalidades

- **Listagem de Produtos**: Visualização de todos os produtos em cards responsivos
- **Detalhes do Produto**: Página detalhada com informações completas e características específicas
- **Filtro por Categoria**: Sistema de filtros por categoria via URL com roteamento
- **Carrinho de Compras**: Adição, remoção e gerenciamento de produtos no carrinho
- **Design Responsivo**: Interface adaptada para desktop e mobile
- **Navegação por URL**: Categorias acessíveis via parâmetros de URL para melhor UX
- **Características do Produto**: Exibição detalhada das especificações de cada produto

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **React Router** para navegação e roteamento
- **Axios** para consumo da API
- **Context API** para gerenciamento de estado global
- **Tailwind CSS** para estilização responsiva
- **shadcn/ui** para componentes de interface
- **Lucide React** para ícones
- **Fake Store API** como fonte de dados

## 📋 Conceitos Aplicados

- ✅ `useState` e `useEffect` para controle de estado e ciclo de vida
- ✅ Navegação com React Router (BrowserRouter, Routes, Route, useParams, useSearchParams)
- ✅ Consumo de API com axios e cache local
- ✅ Context API para estado global do carrinho
- ✅ TypeScript para tipagem forte
- ✅ Componentes reutilizáveis e modulares
- ✅ Design responsivo com mobile-first
- ✅ Roteamento por URL para categorias
- ✅ Otimização de performance com memo e lazy loading

## 🌐 API Endpoints Utilizados

- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Detalhes de um produto específico
- `GET /products/categories` - Lista todas as categorias
- `GET /products/category/:category` - Produtos de uma categoria específica

## 📱 Funcionalidades do Carrinho

- Adicionar produtos ao carrinho com animação
- Alterar quantidade de itens
- Remover produtos do carrinho
- Visualizar total da compra
- Contador de itens no header
- Persistência de estado durante a navegação

## 🎨 Interface e UX

- Cards de produtos responsivos com hover effects
- Sistema de favoritos (curtir produtos)
- Badges de categoria com ícones
- Avaliações com estrelas
- Loading states e animações
- Design moderno com gradientes
- Navegação intuitiva entre páginas

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
│   ├── ui/             # Componentes shadcn/ui
│   ├── Header.tsx      # Cabeçalho com navegação
│   ├── ProductCard.tsx # Card individual de produto
│   ├── ProductCharacteristics.tsx # Características do produto
│   └── LoadingSpinner.tsx # Indicador de carregamento
├── contexts/           # Context API (CartContext)
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Products.tsx    # Listagem com filtros
│   ├── ProductDetail.tsx # Detalhes do produto
│   ├── Cart.tsx        # Carrinho de compras
│   └── NotFound.tsx    # Página 404
├── services/           # Serviços para API
│   └── api.ts          # Configuração axios e endpoints
├── types/              # Tipos TypeScript
│   └── index.ts        # Definições de tipos
├── hooks/              # Hooks personalizados
└── lib/                # Utilitários e configurações
```

## 🚀 Funcionalidades Avançadas

- **Cache de API**: Sistema de cache local para melhor performance
- **Roteamento por URL**: Categorias acessíveis via parâmetros de URL
- **Responsividade Total**: Adaptação para todas as telas
- **Estados de Loading**: Indicadores visuais durante carregamento
- **Tratamento de Erros**: Páginas 404 e estados de erro
- **Otimização**: Lazy loading de imagens e memo em componentes

## 👥 Grupo

- Luiz Felipe de Oliveira Mello
- Cassiano Socorro
- Arthur Varizi
- Caio Braba
- João Luiz
- Gabriel Costa
- Daniel

---

**Projeto desenvolvido para fins educacionais - Demonstração de conceitos React avançados**
