# Projeto 110

Aplicativo mobile pessoal para acompanhamento de treinos, evolucao fisica, peso, medidas corporais e progresso de saude.

O Projeto 110 esta sendo construido de forma gradual, com foco em aprendizado, clareza, boas praticas e evolucao sustentavel.

## Status atual

Fase atual: planejamento inicial do produto.

Neste momento, o foco do projeto e definir:

- Visao do produto.
- Escopo do MVP.
- Epicos.
- Historias de usuario.
- Regras de negocio.
- Stack inicial.
- Arquitetura simples.
- Primeira sprint.

Ainda nao estamos na fase de implementacao do app.

## Objetivo do MVP

O MVP deve permitir que o usuario:

- Cadastre treinos simples.
- Organize treinos por grupos, como Treino A, Treino B e Treino C.
- Cadastre exercicios dentro dos treinos.
- Registre treinos realizados.
- Informe carga, repeticoes e observacoes.
- Consulte historico de treinos.
- Registre peso corporal.
- Registre medidas corporais.
- Veja um dashboard simples de progresso.

## Principios do projeto

- Comecar simples.
- Evitar overengineering.
- Priorizar funcionamento local.
- Usar base de dados local desde o inicio.
- Nao usar backend no MVP.
- Nao usar autenticacao no MVP.
- Adicionar bibliotecas apenas quando houver necessidade clara.
- Manter o projeto compreensivel para fins de aprendizado.

## Stack inicial aprovada

A stack inicial do Projeto 110 sera:

- Expo.
- React Native.
- TypeScript.
- React Navigation.
- SQLite via `expo-sqlite`.
- StyleSheet do React Native.
- Jest para testes unitarios.
- Estado local com hooks no inicio.

Neste primeiro momento, nao sera usado backend, autenticacao, ORM ou biblioteca de estado global.

## Documentacao do projeto

O planejamento principal esta em:

- [docs/PROJETO_110_PLANEJAMENTO.md](docs/PROJETO_110_PLANEJAMENTO.md)

Esse documento deve ser usado como memoria viva do projeto, registrando decisoes, backlog, TODOs, sprint inicial e planos futuros.

## Primeira sprint prevista

Sprint 1 - Fundacao tecnica e treinos simples.

Objetivo:

- Definir a stack inicial.
- Escolher o banco local.
- Criar a base do app.
- Configurar testes unitarios com Jest.
- Criar o fluxo inicial de cadastro e listagem de treinos.
- Garantir que os dados sejam persistidos localmente.

## Fora do MVP inicial

- Backend.
- Login/autenticacao.
- Sincronizacao em nuvem.
- Compartilhamento social.
- Inteligencia artificial.
- Integracao com smartwatch.
- Graficos avancados.
- Controle alimentar completo.

## Proximos passos

- Detalhar modelo inicial do banco local.
- Definir estrutura inicial de pastas.
- Criar historias da Sprint 1 no GitHub.
- Criar milestone da Sprint 1.
- Iniciar implementacao somente apos as decisoes iniciais estarem claras.
