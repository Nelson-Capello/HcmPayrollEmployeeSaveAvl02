# HcmPayrollEmployeeSaveAvl02
Informações e código sobre o desenvolvimento da Avaliação SDK - Questão 1


Questão com escopo fechado.

1. Desenvolver uma regra de validação na Admissão do Colaborador, na primitiva /hcm/payroll/employeeSave, para realizar as seguintes validações:
•	Validar obrigatoriedade do campo "Matrícula" (Esse campo nativamente não é obrigatório na G7) e não permitir realizar uma Admissão com o campo "Indicativo de Admissão" com o valor diferente de "Normal". Esses dois campos estão presentes na aba Contrato da Tela de admissão.
•	Em uma alteração de colaborador (Colaborador anteriormente já cadastrado), implementar uma validação que impeça o usuário de alterar o nome do Colaborador.

(Dica) O nome do colaborador presente no payload é o atual (possivelmente alterado) e o nome antigo (está salvo na base) estará na entidade employee. Dessa forma realizar uma consulta na entidade de colaborador para realizar a comparação. Entidade: /hcm/payroll/entities/employee/

•	Para os colaboradores com tipo de contrato "1 - Empregado". A Escala selecionada deve obrigatoriamente estar no range de códigos de 1 a 10 e ser do tipo permanente. Qualquer tipo diferente desse a admissão deve ser bloqueada, orientando o usuário através de uma mensagem de validação.

(Dica) Lembrar que é necessário fazer uma consulta na entidade de escalas para buscar essas informações. Essa consulta pode ser feita através de uma chamada GET na primitiva: /hcm/payroll/entities/workshift/, passando como parâmetro na rota o tableId da escala, obtida através do payload da admissão. Essa chamada será necessária para buscar o código G5 da escala, bem como seu tipo "WorkshiftType".
