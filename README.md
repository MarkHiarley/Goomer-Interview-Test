

# Goomer Lista Rango - Backend Challenge

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para criação de APIs RESTful.
- **PostgreSQL**: Banco de dados relacional.
- **pg**: Biblioteca para conectar e realizar consultas SQL diretamente.
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade do código.

---

### Estrutura do Projeto
goomer/
├── app/
│   ├── server.ts            # Inicialização do servidor e configuração principal
│   ├── src/
│   │   ├── database/
│   │   │   └── pgconnect.ts     # Conexão com o banco de dados PostgreSQL
│   │   ├── routes/
│   │   │   ├── index.ts         # Roteador principal
│   │   │   ├── horarios.ts      # Rotas para gerenciamento de horários
│   │   │   ├── produtos.ts      # Rotas para gerenciamento de produtos
│   │   │   ├── promocoes.ts     # Rotas para gerenciamento de promoções
│   │   │   └── restaurantes.ts  # Rotas para gerenciamento de restaurantes
├── .env                     # Configurações de variáveis de ambiente
├── tsconfig.json            # Configuração do TypeScript
├── package.json             # Configurações de dependências do projeto
├── README.md                # Documentação do projeto
└── .gitignore               # Arquivos e pastas ignorados no Git

---

### Pré-requisitos
Certifique-se de ter instalado:
- Node.js >= 16.x
- PostgreSQL

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
DB_USER=postgres
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=sistema_restaurantes
```

Substitua `postgres`, `root` e `sistema_restaurantes` pelos dados do seu banco.

---

### Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile o projeto:
   ```bash
   npm run build
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

Para desenvolvimento:
```bash
npm run dev
```

---

## Endpoints da API

### **Restaurantes**
1. **Listar todos os restaurantes**  
   `GET api/restaurantes`

2. **Cadastrar um novo restaurante**  
   `POST api/restaurantes`  
   **Body JSON**:
   ```json
   {
    "foto": "URL da Foto",
    "nome":"Nome",
    "endereco":"Endereço"
   } 
   ```

3. **Obter detalhes de um restaurante**  
   `GET /restaurantes/:id`

4. **Atualizar um restaurante**  
   `PUT api/restaurantes/:id`  
   **Body JSON**
   ```json
   {
     "foto": "URL da Foto",
     "nome":"Novo Nome",
     "endereco":"Endereço"
   }
   ```

5. **Excluir um restaurante**  
   `DELETE /restaurantes/id`

---

### **Produtos**
1. **Listar produtos de um restaurante**  
   `GET /api/produtos`

2. **Cadastrar um novo produto**  
   `POST /api/produtos`  
   **Body JSON**:
   ```json
  {
    "restaurante_id":"ID do Restaurante",
    "foto":"URL da Foto",
    "nome":"Nome",
    "preco": "Preco",
    "categoria":"EX:Doce"
   }
   ```

3. **Atualizar um produto**  
   `PUT /restaurants/:id/products/:productId`  
   **Body JSON** 
   ```json
  {
    "restaurante_id":"ID do Restaurante",
    "foto":"URL da Foto",
    "nome":"Nome",
    "preco": "Preco",
    "categoria":"EX:Nova Categoria"
   }
   ```

4. **Excluir um produto**  
   `DELETE /api/produto/id`

---

## Scripts Disponíveis

- **Iniciar o servidor em produção**:
  ```bash
  npm start
  ```

- **Iniciar o servidor em modo de desenvolvimento**:
  ```bash
  npm run dev
  ```

- **Gerar arquivos de build**:
  ```bash
  npm run build
  ```

---

## Melhorias Futuras

- URGENTE: Melhorar qualidade de Requisicões, como a de atualizar pq so muda se tiver todos os dados do restaurante, nesse modo precisando fazer uma REQ de dados para a seguir mudar so 1 ou atualizar de PUT para PATCH, como na rota 'restaurantes'.
- Implementar autenticação e autorização, para seguranca e uma forma de privar algumas rotas de acordo com o nivel dos usuarios
- Melhorar a validação de dados. acho que faria com "Zod"
- Adicionar suporte a armazenamento de imagens (para fotos de restaurantes e produtos), mas acho que url embora demore carregar, é melhor do que armazenar o binario no banco de dados
- Criar endpoints paginados para melhorar a performance em grandes listas.
- Refatorar a estrutura para seguir mais estritamente os princípios do SOLID.

---

