

# Goomer Lista Rango - Backend Challenge

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para criação de APIs RESTful.
- **PostgreSQL**: Banco de dados relacional.
- **pg**: Biblioteca para conectar e realizar consultas SQL diretamente.
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade do código.

---

### Pré-requisitos
Certifique-se de ter instalado:
- Node.js >= 16.x
- PostgreSQL

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/goomer_listarango
PORT=3000
```

Substitua `username`, `password` e `goomer_listarango` pelos dados do seu banco.

---

### Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd goomer-lista-rango
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
   `GET /restaurants`

2. **Cadastrar um novo restaurante**  
   `POST /restaurants`  
   **Body JSON**:
   ```json
   {
     "name": "Restaurante Exemplo",
     "address": "Rua Exemplo, 123",
     "openingHours": "Segunda a Sexta: 09:00-18:00; Sábado e Domingo: 11:00-20:00"
   }
   ```

3. **Obter detalhes de um restaurante**  
   `GET /restaurants/:id`

4. **Atualizar um restaurante**  
   `PUT /restaurants/:id`  
   **Body JSON** (apenas os campos a serem atualizados):
   ```json
   {
     "name": "Novo Nome do Restaurante"
   }
   ```

5. **Excluir um restaurante**  
   `DELETE /restaurants/:id`

---

### **Produtos**
1. **Listar produtos de um restaurante**  
   `GET /restaurants/:id/products`

2. **Cadastrar um novo produto**  
   `POST /restaurants/:id/products`  
   **Body JSON**:
   ```json
   {
     "name": "Produto Exemplo",
     "price": 15.99,
     "category": "Bebidas",
     "promotion": {
       "description": "Chopp pela metade do preço",
       "promoPrice": 7.99,
       "days": ["Segunda", "Terça"],
       "hours": "18:00-20:00"
     }
   }
   ```

3. **Atualizar um produto**  
   `PUT /restaurants/:id/products/:productId`  
   **Body JSON** (apenas os campos a serem atualizados):
   ```json
   {
     "price": 19.99
   }
   ```

4. **Excluir um produto**  
   `DELETE /restaurants/:id/products/:productId`

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

- Adicionar testes unitários com **Jest** ou outra biblioteca.
- Implementar autenticação e autorização (ex.: JWT).
- Melhorar a validação de dados.
- Adicionar suporte a armazenamento de imagens (para fotos de restaurantes e produtos).
- Criar endpoints paginados para melhorar a performance em grandes listas.
- Refatorar a estrutura para seguir mais estritamente os princípios do SOLID.

---

Agora é só salvar esse conteúdo no arquivo **README.md** do seu projeto e subir no repositório. 😊