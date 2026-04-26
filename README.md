# Projeto 110

Aplicativo mobile pessoal para acompanhamento de treinos, evolucao fisica, peso, medidas corporais e progresso de saude.

O Projeto 110 esta sendo construido de forma gradual, com foco em aprendizado, clareza, boas praticas e evolucao sustentavel.

## Status atual

Fase atual: Sprint 1 concluida.

O planejamento inicial do produto foi validado e a primeira entrega tecnica foi concluida.

O app ja possui:

- Base Expo com React Native e TypeScript.
- Navegacao inicial.
- Banco local com SQLite.
- Cadastro simples de treinos.
- Listagem de treinos salvos.
- Persistencia local validada no Expo Go.
- Testes unitarios com Jest.

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

## Como rodar o app

Instale as dependencias:

```bash
npm install
```

Inicie o Expo:

```bash
npm start
```

No Windows, se o PowerShell bloquear `npx`, use o executavel `.cmd`:

```bash
npx.cmd expo start
```

## Como rodar os testes

Execute:

```bash
npm test
```

No Windows, se necessario:

```bash
npm.cmd test
```

## Sprint 1 concluida

Sprint 1 - Fundacao tecnica e treinos simples.

Entregas:

- Stack inicial definida.
- App mobile criado.
- Navegacao inicial configurada.
- SQLite configurado com tabela `workouts`.
- Cadastro de treino implementado.
- Listagem de treinos implementada.
- Persistencia local validada.
- Jest configurado com teste unitario inicial.
- Safe area ajustada para Android.

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

- Planejar Sprint 2.
- Detalhar cadastro de exercicios dentro dos treinos.
- Evoluir o modelo de dados para exercicios.
- Manter as proximas entregas pequenas e validadas no Expo Go.
