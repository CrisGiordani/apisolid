# App

GymPass style app.

## RFs (Requisitos funcionais)
## Assemelhan-se aos casos de uso

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado; (cadastrado?)
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10Km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)
## Toda regra de negócio está ligada a um ou mais RFs

- [x] O usuário não deve poder se cadastrar com um e-mail existente;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)
## São requisitos que não partem do cliente; requisitos mais técnicos

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados postgres;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
