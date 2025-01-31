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

### Configuração do Banco de Dados

Para configurar o banco de dados PostgreSQL com a estrutura das tabelas, siga os passos abaixo:

1. Acesse o PostgreSQL com o comando:
   ```bash
   psql -U postgres
   ```

2. Crie o banco de dados:
   ```sql
   CREATE DATABASE sistema_restaurantes;
   ```

3. Conecte-se ao banco de dados criado:
   ```bash
   \c sistema_restaurantes
   ```

4. Crie a tabela `restaurantes`:
   ```sql
   CREATE TABLE restaurantes (
       id SERIAL PRIMARY KEY,
       foto TEXT NOT NULL,
       nome VARCHAR(255) NOT NULL,
       endereco VARCHAR(255) NOT NULL
   );
   ```

5. Crie a tabela `horarios_restaurante`:
   ```sql
   CREATE TABLE horarios_restaurante (
       id SERIAL PRIMARY KEY,
       restaurante_id INTEGER NOT NULL,
       dia_da_semana VARCHAR(50) NOT NULL,
       hora_inicio TIME NOT NULL,
       hora_fim TIME NOT NULL,
       CONSTRAINT horarios_restaurante_check CHECK (hora_inicio <= hora_fim),
       CONSTRAINT horarios_restaurante_restaurante_id_fkey FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
   );
   ```

6. Crie a tabela `produtos`:
   ```sql
   CREATE TABLE produtos (
       id SERIAL PRIMARY KEY,
       restaurante_id INTEGER NOT NULL,
       foto TEXT NOT NULL,
       nome VARCHAR(255) NOT NULL,
       preco NUMERIC(10,2) NOT NULL,
       categoria VARCHAR(50) NOT NULL,
       CONSTRAINT produtos_restaurante_id_fkey FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
   );
   ```

7. Crie a tabela `promocoes_produtos`:
   ```sql
   CREATE TABLE promocoes_produtos (
       id SERIAL PRIMARY KEY,
       produto_id INTEGER NOT NULL,
       descricao TEXT NOT NULL,
       preco_promocional NUMERIC(10,2) NOT NULL,
       dia_da_semana VARCHAR(50) NOT NULL,
       hora_inicio TIME NOT NULL,
       hora_fim TIME NOT NULL,
       CONSTRAINT promocoes_produtos_check CHECK (hora_inicio <= hora_fim),
       CONSTRAINT promocoes_produtos_hora_fim_check CHECK ((EXTRACT(minute FROM hora_fim)::integer % 15) = 0),
       CONSTRAINT promocoes_produtos_hora_inicio_check CHECK ((EXTRACT(minute FROM hora_inicio)::integer % 15) = 0),
       CONSTRAINT promocoes_produtos_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
   );
   ```

---

## Endpoints da API

### **Restaurantes**
1. **Listar todos os restaurantes**  
   `GET /api/restaurantes`

2. **Cadastrar um novo restaurante**  
   `POST /api/restaurantes`  
   **Body JSON**:
   ```json
   {
     "foto": "URL da Foto",
     "nome": "Nome",
     "endereco": "Endereço"
   }
   ```

3. **Obter detalhes de um restaurante**  
   `GET /api/restaurantes/:id`

4. **Atualizar um restaurante**  
   `PUT /api/restaurantes/:id`  
   **Body JSON**:
   ```json
   {
     "foto": "URL da Foto",
     "nome": "Novo Nome",
     "endereco": "Endereço"
   }
   ```

5. **Excluir um restaurante**  
   `DELETE /api/restaurantes/:id`

---

### **Produtos**
1. **Listar produtos de um restaurante**  
   `GET /api/produtos`

2. **Cadastrar um novo produto**  
   `POST /api/produtos`  
   **Body JSON**:
   ```json
   {
     "restaurante_id": "ID do Restaurante",
     "foto": "URL da Foto",
     "nome": "Nome",
     "preco": "Preço",
     "categoria": "EX:Doce"
   }
   ```

3. **Obter detalhes de um produto**  
   `GET /api/produtos/:id`

4. **Atualizar um produto**  
   `PUT /api/produtos/:id`  
   **Body JSON**:
   ```json
   {
     "restaurante_id": "ID do Restaurante",
     "foto": "URL da Foto",
     "nome": "Nome",
     "preco": "Preço",
     "categoria": "EX:Nova Categoria"
   }
   ```

5. **Excluir um produto**  
   `DELETE /api/produtos/:id`

---

### **Promoções**
1. **Listar todas as promoções**  
   `GET /api/promocoes`

2. **Cadastrar uma nova promoção**  
   `POST /api/promocoes`  
   **Body JSON**:
   ```json
   {
     "produto_id": "ID do Produto",
     "descricao": "Descrição",
     "preco_promocional": "Preço Promocional",
     "dia_da_semana": "Dia da Semana",
     "hora_inicio": "Hora de Início",
     "hora_fim": "Hora de Fim"
   }
   ```

3. **Obter detalhes de uma promoção**  
   `GET /api/promocoes/:id`

4. **Atualizar uma promoção**  
   `PUT /api/promocoes/:id`  
   **Body JSON**:
   ```json
   {
     "produto_id": "ID do Produto",
     "descricao": "Descrição",
     "preco_promocional": "Preço Promocional",
     "dia_da_semana": "Dia da Semana",
     "hora_inicio": "Hora de Início",
     "hora_fim": "Hora de Fim"
   }
   ```

5. **Excluir uma promoção**  
   `DELETE /api/promocoes/:id`

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

- URGENTE: Melhorar a qualidade das requisições, como a de atualizar, pois só muda se tiver todos os dados do restaurante. Nesse modo, é necessário fazer uma requisição de dados para, em seguida, mudar apenas um ou atualizar de PUT para PATCH, como na rota 'restaurantes'.
- Implementar autenticação e autorização, para segurança e uma forma de privar algumas rotas de acordo com o nível dos usuários.
- Melhorar a validação de dados. Acho que faria com "Zod".
- Adicionar suporte a armazenamento de imagens (para fotos de restaurantes e produtos), mas acho que URL, embora demore carregar, é melhor do que armazenar o binário no banco de dados.
- Criar endpoints paginados para melhorar a performance em grandes listas.
- Refatorar a estrutura para seguir mais estritamente os princípios do SOLID.

---

