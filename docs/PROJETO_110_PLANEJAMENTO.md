# Projeto 110 - Planejamento e Controle

Este documento serve como memoria viva do Projeto 110.

Use este arquivo para registrar a visao do produto, decisoes tomadas, escopo do MVP, planos futuros, backlog, TODOs e historico de evolucao do app.

## 1. Visao do produto

O Projeto 110 e um aplicativo mobile pessoal para acompanhar treinos, evolucao fisica, peso, medidas corporais e progresso de saude.

O objetivo inicial e construir um MVP simples, funcional e local, que ajude o usuario a registrar sua rotina de treino e acompanhar sua evolucao ao longo do tempo.

O projeto tambem tem objetivo educacional: aprender desenvolvimento mobile, arquitetura simples, boas praticas, organizacao de produto e evolucao gradual de software.

## 2. Objetivo do MVP

O MVP deve permitir que o usuario:

- Cadastre treinos simples.
- Organize treinos por grupos, como Treino A, Treino B e Treino C.
- Cadastre exercicios dentro de cada treino.
- Registre treinos realizados.
- Informe carga, repeticoes e observacoes dos exercicios realizados.
- Consulte historico de treinos.
- Registre peso corporal.
- Registre medidas corporais.
- Veja um dashboard simples de progresso.

## 3. Escopo do MVP

Status: validado como escopo inicial do MVP.

### Dentro do MVP

- Cadastro de treinos.
- Cadastro de exercicios por treino.
- Registro de execucao de treino.
- Historico basico de treinos realizados.
- Registro de peso corporal.
- Registro de medidas corporais.
- Dashboard simples.
- Funcionamento local no dispositivo.
- Base de dados local desde o inicio.

### Ordem sugerida de entrega

1. Base tecnica, banco local, testes e cadastro de treinos.
2. Cadastro de exercicios dentro dos treinos.
3. Registro de treino realizado.
4. Historico de treinos realizados.
5. Registro de peso e medidas corporais.
6. Dashboard simples de progresso.

### Fora do MVP inicial

- Backend.
- Autenticacao.
- Sincronizacao em nuvem.
- Compartilhamento social.
- Planos de treino automaticos.
- Inteligencia artificial.
- Integracao com smartwatch.
- Graficos avancados.
- Controle alimentar completo.

## 4. Diretriz tecnica inicial

O app deve usar uma base de dados local desde o primeiro momento.

### Decisao preliminar

Usar banco local e uma boa decisao para o Projeto 110 porque o app tera dados relacionais e historicos, como:

- Treinos.
- Exercicios.
- Exercicios vinculados a treinos.
- Treinos realizados.
- Series, cargas e repeticoes registradas.
- Peso corporal por data.
- Medidas corporais por data.

### Decisao aprovada

O Projeto 110 usara a seguinte stack inicial:

- Expo.
- React Native.
- TypeScript.
- React Navigation.
- SQLite via `expo-sqlite`.
- StyleSheet do React Native.
- Jest para testes unitarios.
- Estado local com hooks no inicio.

Neste primeiro momento, nao sera usado backend, autenticacao, ORM ou biblioteca de estado global.

### Justificativa

Essa stack reduz complexidade inicial, favorece aprendizado, permite evolucao gradual e atende ao requisito de funcionamento local com banco de dados desde o inicio.

Jest entra desde a fundacao do projeto para permitir testes unitarios simples de regras, validacoes, funcoes auxiliares e acesso a dados quando fizer sentido.

### Banco local

O banco local aprovado para o Projeto 110 e SQLite via `expo-sqlite`.

A implementacao inicial deve usar `expo-sqlite` diretamente, sem ORM. Essa escolha mantem o projeto mais simples para aprendizado e evita adicionar uma camada de abstracao antes da necessidade real.

### Estrategia inicial de banco

- Usar SQL explicito e pequeno.
- Criar uma camada simples de acesso a dados por modulo.
- Comecar com migrations simples.
- Usar `PRAGMA user_version` para controlar a versao do banco.
- Gerar IDs pela aplicacao.
- Usar datas em formato ISO string.
- Evitar exclusao definitiva quando o dado puder ter historico futuro.

### Tabelas previstas para o MVP

- `workouts`
- `workout_exercises`
- `workout_sessions`
- `workout_session_exercises`
- `body_weights`
- `body_measurements`

### Tabela inicial da Sprint 1

Na Sprint 1, a unica tabela necessaria e `workouts`.

```sql
CREATE TABLE workouts (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Regras da tabela `workouts`

- `name` e obrigatorio.
- `id` deve ser gerado pela aplicacao.
- `created_at` e `updated_at` devem usar formato ISO string.
- `is_active` deve ser usado para ocultar treinos sem apagar dados.
- A lista principal deve exibir apenas treinos com `is_active = 1`.

### Testes relacionados ao banco

No inicio, os testes unitarios com Jest devem focar em:

- Validacao de nome obrigatorio.
- Normalizacao dos dados antes de salvar.
- Mapeamento entre dados do banco e objetos usados no app.
- Regras pequenas de negocio.

Testes de integracao mais completos com SQLite podem ser avaliados depois que a estrutura inicial estiver funcionando.

### Padrao de organizacao de telas

Cada tela deve ficar em uma pasta propria dentro de `src/screens`.

Padrao:

```txt
src/screens/NomeDaTela/
  index.tsx
  styles.ts
```

- `index.tsx` deve conter o componente da tela.
- `styles.ts` deve conter os estilos da tela.
- Esse padrao evita arquivos grandes e separa melhor estrutura visual de regras de apresentacao.

## 5. Epicos

### Epico 1 - Gestao de treinos

Permitir que o usuario crie e organize treinos simples, como Treino A, Treino B e Treino C.

### Epico 2 - Gestao de exercicios

Permitir que o usuario cadastre exercicios dentro de cada treino.

### Epico 3 - Registro de treino realizado

Permitir que o usuario registre o treino executado em uma data, informando carga, repeticoes e observacoes.

### Epico 4 - Historico de treinos

Permitir que o usuario consulte treinos realizados anteriormente.

### Epico 5 - Acompanhamento corporal

Permitir registro de peso e medidas corporais.

### Epico 6 - Dashboard de progresso

Exibir resumo simples do progresso do usuario.

### Epico 7 - Base tecnica local

Definir stack, estrutura inicial do app, navegacao, banco local e organizacao de codigo.

## 6. Historias de usuario iniciais

## Historia de usuario 1 - Cadastrar treino

Como usuario do Projeto 110,  
quero cadastrar um treino com nome,  
para organizar minha rotina de exercicios.

### Criterios de aceite

- [ ] Deve ser possivel criar um treino com nome.
- [ ] O nome do treino deve ser obrigatorio.
- [ ] O treino criado deve aparecer em uma lista.
- [ ] O treino deve ser salvo na base de dados local.

### Regras de negocio

- Um treino deve ter um identificador unico.
- Um treino pode existir sem exercicios inicialmente.
- Nao sera necessario vincular o treino a dias da semana no MVP.

### Observacoes tecnicas

- Usar banco local desde o inicio.
- Evitar camada tecnica complexa demais na primeira versao.

## Historia de usuario 2 - Listar treinos

Como usuario do Projeto 110,  
quero visualizar meus treinos cadastrados,  
para escolher qual rotina vou consultar ou executar.

### Criterios de aceite

- [ ] Deve existir uma tela de lista de treinos.
- [ ] A lista deve carregar os treinos salvos localmente.
- [ ] Quando nao houver treinos, deve aparecer um estado vazio simples.

### Regras de negocio

- A lista deve exibir apenas treinos ativos.
- A ordenacao inicial pode ser por data de criacao ou nome.

### Observacoes tecnicas

- A estrategia de exclusao sera definida depois: exclusao definitiva ou status ativo/inativo.

## Historia de usuario 3 - Cadastrar exercicio em treino

Como usuario do Projeto 110,  
quero adicionar exercicios a um treino,  
para saber o que devo executar em cada sessao.

### Criterios de aceite

- [ ] Deve ser possivel adicionar exercicio a um treino.
- [ ] O exercicio deve ter nome obrigatorio.
- [ ] O exercicio pode ter series, repeticoes planejadas e observacao.

### Regras de negocio

- Um exercicio pertence a um treino.
- Um treino pode ter varios exercicios.
- Carga nao precisa ser planejada previamente.

### Observacoes tecnicas

- Comecar com campos simples.
- Evitar biblioteca de exercicios no MVP.

## Historia de usuario 4 - Registrar treino realizado

Como usuario do Projeto 110,  
quero registrar um treino realizado,  
para acompanhar o que fiz em cada dia.

### Criterios de aceite

- [ ] Deve ser possivel selecionar um treino existente.
- [ ] Deve ser possivel registrar carga e repeticoes por exercicio.
- [ ] Deve ser possivel salvar a data do treino.
- [ ] O registro deve ser salvo no banco local.

### Regras de negocio

- Todo treino realizado deve ter data.
- Carga e repeticoes podem variar a cada execucao.
- Observacoes devem ser opcionais.

### Observacoes tecnicas

- Esse registro sera a base do historico.
- Cronometro fica fora do MVP.

## Historia de usuario 5 - Ver historico de treinos

Como usuario do Projeto 110,  
quero visualizar meu historico de treinos,  
para acompanhar minha consistencia.

### Criterios de aceite

- [ ] Deve existir uma lista de treinos realizados.
- [ ] Cada item deve mostrar data e nome do treino.
- [ ] Deve ser possivel abrir um registro para ver detalhes.

### Regras de negocio

- O historico deve ser ordenado do mais recente para o mais antigo.
- Registros antigos nao devem ser apagados automaticamente.

### Observacoes tecnicas

- Comecar com lista simples.
- Filtros avancados ficam para depois.

## Historia de usuario 6 - Registrar peso corporal

Como usuario do Projeto 110,  
quero registrar meu peso corporal,  
para acompanhar minha evolucao fisica.

### Criterios de aceite

- [ ] Deve ser possivel registrar peso e data.
- [ ] Deve ser possivel ver registros anteriores.
- [ ] O peso deve aceitar valor decimal.

### Regras de negocio

- A data e obrigatoria.
- O peso e obrigatorio.
- Pode existir mais de um registro, mas o ideal e um registro por dia.

### Observacoes tecnicas

- Graficos complexos ficam para depois.
- O ultimo peso pode aparecer no dashboard.

## Historia de usuario 7 - Registrar medidas corporais

Como usuario do Projeto 110,  
quero registrar medidas corporais,  
para acompanhar mudancas alem do peso.

### Criterios de aceite

- [ ] Deve ser possivel registrar medidas com data.
- [ ] Deve ser possivel registrar cintura, braco, peito, quadril e perna.
- [ ] Campos de medida podem ser opcionais individualmente.

### Regras de negocio

- A data e obrigatoria.
- Pelo menos uma medida deve ser informada.
- Medidas devem aceitar valores decimais.

### Observacoes tecnicas

- Comecar com campos fixos.
- Medidas customizadas ficam para depois.

## Historia de usuario 8 - Visualizar dashboard

Como usuario do Projeto 110,  
quero ver um dashboard simples,  
para entender rapidamente meu progresso.

### Criterios de aceite

- [ ] Deve mostrar ultimo peso registrado.
- [ ] Deve mostrar quantidade de treinos realizados.
- [ ] Deve mostrar ultimo treino feito.
- [ ] Deve mostrar estados vazios quando nao houver dados.

### Regras de negocio

- O dashboard deve usar apenas dados locais.
- O dashboard deve continuar funcionando mesmo com poucos dados.

### Observacoes tecnicas

- Priorizar informacoes simples.
- Graficos ficam para uma etapa posterior.

## 7. Regras de negocio iniciais

- O app funcionara localmente no dispositivo.
- O app usara base de dados local desde o primeiro momento.
- Nao havera login no MVP.
- Nao havera backend no MVP.
- Um treino representa uma rotina planejada.
- Um treino pode conter varios exercicios.
- Um exercicio pertence a um treino.
- Um treino realizado representa uma execucao em uma data.
- O treino cadastrado e o modelo.
- O treino realizado e o historico da execucao.
- Carga e repeticoes reais devem ser registradas na execucao do treino.
- Peso corporal deve ter data e valor.
- Medidas corporais devem ter data e pelo menos uma medida preenchida.
- O historico deve preservar registros antigos.
- O dashboard deve ser simples e baseado nos dados ja cadastrados.

## 8. Planejamento da primeira sprint

# Sprint 1 - Fundacao tecnica e treinos simples

Status: concluida.

## Objetivo da sprint

Criar a base inicial do Projeto 110 com banco local e permitir que o usuario cadastre e visualize treinos simples.

## Escopo da sprint

- Definir stack inicial.
- Definir banco de dados local.
- Configurar testes unitarios com Jest.
- Criar estrutura inicial do app.
- Criar navegacao basica.
- Criar modelo inicial de treino.
- Criar persistencia local de treinos.
- Criar tela de listagem de treinos.
- Criar fluxo simples para cadastrar treino.

## Fora do escopo

- Cadastro completo de exercicios.
- Registro de treino realizado.
- Historico de treinos realizados.
- Peso corporal.
- Medidas corporais.
- Dashboard.
- Backend.
- Autenticacao.

## Historias incluidas

- Historia de usuario 1 - Cadastrar treino.
- Historia de usuario 2 - Listar treinos.

## Tarefas tecnicas

- Definir tecnologia do banco local.
- Definir estrutura inicial de pastas.
- Criar projeto React Native com TypeScript.
- Configurar Jest para testes unitarios.
- Configurar navegacao inicial.
- Criar tabela/estrutura de treinos no banco local.
- Criar camada simples de acesso a dados para treinos.
- Criar tela de lista de treinos.
- Criar tela ou formulario de novo treino.
- Validar persistencia local.

## Criterio de conclusao da sprint

A sprint sera considerada concluida quando:

- [x] O app abrir corretamente.
- [x] O banco local estiver definido e funcionando.
- [x] Jest estiver configurado e com ao menos um teste unitario simples executando.
- [x] O usuario conseguir cadastrar um treino com nome.
- [x] O treino cadastrado aparecer na lista.
- [x] Os dados permanecerem salvos apos fechar e abrir o app.
- [x] A estrutura inicial estiver simples e compreensivel.

## Resumo da entrega da Sprint 1

- Projeto Expo criado com React Native e TypeScript.
- Navegacao inicial configurada com React Navigation.
- Banco local configurado com SQLite via `expo-sqlite`.
- Tabela `workouts` criada via migration simples.
- Cadastro simples de treino implementado.
- Listagem de treinos salvos implementada.
- Persistencia local validada no Expo Go.
- Jest configurado com teste unitario inicial.
- Estrutura de telas padronizada com `index.tsx` e `styles.ts`.
- Ajuste de safe area aplicado para evitar sobreposicao com a navegacao do Android.

## 9. Planejamento da segunda sprint

# Sprint 2 - Exercicios do treino e gestao de treinos

Status: planejada.

## Objetivo da sprint

Permitir que o usuario gerencie melhor os treinos cadastrados e adicione exercicios dentro de cada treino.

A Sprint 2 deve evoluir o app da seguinte forma:

- O usuario cria um treino.
- O usuario consegue abrir esse treino.
- O usuario consegue editar ou excluir esse treino.
- O usuario consegue cadastrar exercicios dentro desse treino.
- O usuario consegue visualizar os exercicios do treino.

## Escopo da sprint

- Criar tela de detalhe do treino.
- Permitir abrir um treino pela lista.
- Permitir alterar nome de um treino cadastrado.
- Permitir excluir treino cadastrado.
- Criar tabela `workout_exercises`.
- Criar repository de exercicios.
- Criar cadastro simples de exercicio dentro de um treino.
- Listar exercicios dentro do treino.
- Criar testes unitarios para regras de exercicio.
- Atualizar documentacao ao final da sprint.

## Fora do escopo

- Registrar treino realizado.
- Registrar carga executada.
- Historico de treinos realizados.
- Peso corporal.
- Medidas corporais.
- Dashboard.
- Edicao de exercicio.
- Exclusao de exercicio.
- Biblioteca pronta de exercicios.
- Series avancadas por exercicio.

## Historias incluidas

- Abrir detalhe de um treino.
- Alterar treino cadastrado.
- Excluir treino cadastrado.
- Cadastrar exercicio dentro de um treino.
- Listar exercicios de um treino.

## Historia de usuario - Abrir detalhe de treino

Como usuario do Projeto 110,  
quero abrir um treino cadastrado,  
para visualizar e gerenciar os exercicios desse treino.

### Criterios de aceite

- [ ] Deve ser possivel tocar em um treino da lista.
- [ ] O app deve abrir uma tela de detalhe do treino.
- [ ] A tela deve mostrar o nome do treino.
- [ ] A tela deve mostrar estado vazio quando nao houver exercicios.

### Regras de negocio

- Apenas treinos ativos devem aparecer na lista principal.
- O detalhe deve receber o identificador do treino.

### Observacoes tecnicas

- Criar rota `WorkoutDetails`.
- Passar `workoutId` por parametro de navegacao.

## Historia de usuario - Alterar treino cadastrado

Como usuario do Projeto 110,  
quero alterar o nome de um treino cadastrado,  
para corrigir ou melhorar a organizacao da minha rotina.

### Criterios de aceite

- [ ] Deve ser possivel acessar uma acao de editar treino.
- [ ] Deve ser possivel alterar o nome do treino.
- [ ] Nome vazio nao deve ser aceito.
- [ ] A lista deve refletir o nome atualizado.
- [ ] A data de atualizacao deve ser alterada.

### Regras de negocio

- Apenas o nome do treino sera editado nesta sprint.
- O treino deve continuar com o mesmo `id`.
- A edicao nao deve apagar exercicios vinculados ao treino.

### Observacoes tecnicas

- Reaproveitar regras de validacao de nome de treino.
- Criar funcao `updateWorkoutName` no repository de treinos.

## Historia de usuario - Excluir treino cadastrado

Como usuario do Projeto 110,  
quero excluir um treino cadastrado,  
para remover treinos criados por engano ou que nao uso mais.

### Criterios de aceite

- [ ] Deve existir uma acao para excluir treino.
- [ ] Deve haver confirmacao antes de excluir.
- [ ] O treino excluido nao deve aparecer na lista principal.
- [ ] A exclusao deve preservar possibilidade de historico futuro.

### Regras de negocio

- A exclusao deve ser logica, alterando `is_active` para `0`.
- O registro nao deve ser apagado fisicamente do banco.
- Exercicios vinculados ao treino podem ficar inativos em uma etapa futura; nesta sprint, o foco e ocultar o treino da lista.

### Observacoes tecnicas

- Criar funcao `deactivateWorkout` no repository de treinos.
- Usar confirmacao nativa simples antes da exclusao.

## Historia de usuario - Cadastrar exercicio em treino

Como usuario do Projeto 110,  
quero cadastrar exercicios dentro de um treino,  
para organizar quais movimentos fazem parte da minha rotina.

### Criterios de aceite

- [ ] Deve ser possivel cadastrar exercicio dentro de um treino.
- [ ] O nome do exercicio deve ser obrigatorio.
- [ ] Deve ser possivel informar series planejadas.
- [ ] Deve ser possivel informar repeticoes planejadas.
- [ ] Observacao deve ser opcional.
- [ ] O exercicio deve aparecer na lista do treino apos salvar.

### Regras de negocio

- Um exercicio pertence a um treino.
- Um treino pode ter varios exercicios.
- Nome do exercicio e obrigatorio.
- Series e repeticoes podem ser opcionais no primeiro momento.

### Observacoes tecnicas

- Criar tabela `workout_exercises`.
- Comecar sem biblioteca pronta de exercicios.

## Historia de usuario - Listar exercicios do treino

Como usuario do Projeto 110,  
quero visualizar os exercicios cadastrados em um treino,  
para saber o que faz parte da rotina selecionada.

### Criterios de aceite

- [ ] A tela de detalhe deve listar exercicios do treino.
- [ ] Quando nao houver exercicios, deve mostrar estado vazio.
- [ ] A lista deve atualizar apos cadastrar novo exercicio.

### Regras de negocio

- A lista deve exibir apenas exercicios ativos.
- Os exercicios devem pertencer ao treino selecionado.

### Observacoes tecnicas

- Criar funcao `listExercisesByWorkout` no repository de exercicios.

## Modelo aprovado para exercicios

```sql
CREATE TABLE workout_exercises (
  id TEXT PRIMARY KEY NOT NULL,
  workout_id TEXT NOT NULL,
  name TEXT NOT NULL,
  muscle_group TEXT,
  equipment TEXT,
  planned_sets INTEGER,
  planned_reps TEXT,
  planned_weight REAL,
  rest_seconds INTEGER,
  notes TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (workout_id) REFERENCES workouts(id)
);
```

## Regras do modelo de exercicios

- `name` e obrigatorio.
- `workout_id` vincula o exercicio ao treino.
- `muscle_group` e opcional.
- `equipment` e opcional.
- `planned_sets` e opcional.
- `planned_reps` deve ser texto para aceitar formatos reais, como `8-12`, `15/12/10` ou `ate a falha`.
- `planned_weight` representa carga planejada, nao carga executada.
- `rest_seconds` representa descanso planejado entre series.
- `notes` guarda observacoes de execucao ou orientacoes tecnicas.
- `sort_order` define a ordem do exercicio dentro do treino.
- `is_active` permite exclusao logica.
- A execucao real do treino sera tratada futuramente em tabelas de sessao, nao em `workout_exercises`.

## Planejamento crescente de UX para exercicios

Para evitar criar campos no banco e esquecer de implementar na interface, cada campo tera uma fase planejada de uso.

| Campo | Uso no banco | UX na Sprint 2 | UX futura |
|---|---|---|---|
| `name` | Obrigatorio | Campo obrigatorio | Mantem |
| `muscle_group` | Opcional | Campo opcional simples | Pode virar seletor padronizado |
| `equipment` | Opcional | Campo opcional simples | Pode virar seletor padronizado |
| `planned_sets` | Opcional | Campo numerico opcional | Pode ter validacoes melhores |
| `planned_reps` | Opcional | Campo texto opcional | Pode receber sugestoes/padroes |
| `planned_weight` | Opcional | Campo numerico opcional | Pode integrar evolucao de carga |
| `rest_seconds` | Opcional | Campo numerico opcional | Pode virar seletor de descanso |
| `notes` | Opcional | Campo texto opcional | Mantem |
| `sort_order` | Controle interno | Definido automaticamente | Pode permitir reordenacao manual |
| `is_active` | Controle interno | Nao aparece na UX | Usado em exclusao logica |

Na Sprint 2, a interface deve expor os campos principais de planejamento do exercicio, mesmo que com componentes simples.
Campos internos como `sort_order` e `is_active` nao devem aparecer diretamente para o usuario.

## Tarefas tecnicas

- Criar migration versao 2 do banco.
- Criar tabela `workout_exercises`.
- Criar tipos de exercicio.
- Criar repository de exercicios.
- Criar regras simples de validacao de exercicio.
- Criar testes unitarios para regras de exercicio.
- Criar tela de detalhe do treino.
- Criar tela de cadastro de exercicio.
- Atualizar navegacao com novas rotas.
- Permitir abrir treino pela lista.
- Permitir editar nome do treino.
- Permitir excluir treino com exclusao logica.
- Listar exercicios dentro do treino.

## Criterio de conclusao da sprint

A sprint sera considerada concluida quando:

- [ ] O usuario conseguir abrir um treino cadastrado.
- [ ] O usuario conseguir alterar o nome de um treino.
- [ ] O usuario conseguir excluir um treino da lista principal.
- [ ] O usuario conseguir cadastrar exercicio dentro de um treino.
- [ ] O exercicio aparecer na lista do treino.
- [ ] Os exercicios permanecerem salvos apos fechar e abrir o app.
- [ ] A migration do banco estiver funcionando.
- [ ] Existir pelo menos um teste unitario para regra de exercicio.
- [ ] A documentacao da Sprint 2 estiver atualizada.

## 10. Planos futuros

### Curto prazo

- Detalhar cadastro de exercicios dentro de treinos.
- Detalhar edicao e exclusao de treinos.
- Definir ajustes pequenos de UX identificados apos uso inicial.

### Medio prazo

- Adicionar exercicios aos treinos.
- Registrar treino realizado.
- Criar historico.
- Registrar peso e medidas.
- Criar dashboard simples.

### Longo prazo

- Melhorar graficos.
- Criar backup/exportacao dos dados.
- Avaliar sincronizacao em nuvem.
- Avaliar autenticacao.
- Avaliar recursos inteligentes somente depois do MVP validado.

## 11. TODO do projeto

### Produto

- [x] Revisar escopo do MVP.
- [x] Validar epicos.
- [x] Validar historias iniciais.
- [x] Priorizar backlog.
- [x] Definir o que entra na Sprint 1.
- [x] Planejar Sprint 2.

### Tecnico

- [x] Discutir stack do app.
- [x] Escolher tecnologia do banco local.
- [x] Decidir se sera usado Expo ou React Native CLI.
- [x] Definir biblioteca de navegacao.
- [x] Definir estrategia simples para migracoes do banco.
- [x] Configurar Jest para testes unitarios.
- [x] Definir estrutura inicial de pastas.

### GitHub

- [x] Criar repositorio ou validar repositorio atual.
- [ ] Criar labels para backlog.
- [ ] Criar milestones.
- [x] Criar issues das historias da Sprint 1.
- [ ] Criar milestone da Sprint 1.

## 12. Historico de decisoes

### 2026-04-25 - Inicio do planejamento

- Projeto definido como app mobile pessoal para acompanhamento de treinos e evolucao fisica.
- MVP limitado a funcionamento local.
- Backend e autenticacao ficaram fora do MVP.
- Definido que o projeto deve priorizar aprendizado, clareza e evolucao gradual.

### 2026-04-25 - Escopo do MVP validado

- MVP aprovado com foco em treinos, exercicios, registros de treino, historico, peso, medidas e dashboard simples.
- Definido que a entrega deve ser gradual, com Sprint 1 limitada a fundacao tecnica, banco local, testes, cadastro e listagem de treinos.
- Confirmado que backend, autenticacao, sincronizacao em nuvem, inteligencia artificial, graficos avancados e controle alimentar ficam fora do MVP inicial.

### 2026-04-25 - Banco local desde o inicio

- Decidido que o app deve usar uma base de dados local desde a primeira versao.
- Definido SQLite via `expo-sqlite` como banco local do app.
- Definido uso de SQL direto, sem ORM no primeiro momento.
- Definido uso de migrations simples com `PRAGMA user_version`.
- Definida tabela `workouts` como primeira tabela da Sprint 1.

### 2026-04-25 - Stack inicial aprovada

- Definido uso de Expo, React Native e TypeScript.
- Definido uso de React Navigation para navegacao.
- Definido uso de SQLite via `expo-sqlite` como banco local.
- Definido uso de StyleSheet do React Native para estilos no inicio.
- Definido uso de Jest para testes unitarios desde a fundacao.
- Decidido nao usar backend, autenticacao, ORM ou estado global no primeiro momento.

### 2026-04-25 - Sprint 1 concluida

- Base mobile criada com Expo, React Native e TypeScript.
- Navegacao inicial entregue.
- Banco local com SQLite configurado.
- Cadastro e listagem de treinos simples entregues.
- Persistencia local validada no Expo Go.
- Jest configurado com teste unitario inicial.
- Primeiro bug de layout Android corrigido com safe area.
- Sprint 1 encerrada com foco mantido no escopo planejado.

### 2026-04-25 - Sprint 2 planejada

- Sprint 2 definida com foco em exercicios dentro de treinos.
- Incluida gestao de treinos cadastrados: alterar nome e excluir treino.
- Definido que exclusao de treino deve ser logica, usando `is_active = 0`.
- Registro de treino realizado, historico, peso, medidas e dashboard continuam fora da Sprint 2.
