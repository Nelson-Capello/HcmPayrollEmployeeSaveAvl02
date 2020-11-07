
/**
 * Nome da primitiva : employeeSave
 * Nome do dominio : hcm
 * Nome do serviço : payroll
 * Nome do tenant : trn07027732
 * * Avaliação do Treinamento SeniorX Novas Tecnologias, escopo 1
 **/

const axios = require('axios');

exports.handler = async (event) => {
  
  let tokenSeniorX = event.headers['X-Senior-Token'];
  let body = parseBody(event);
  let vAlfCodRetorno = "200";
  let vAlfMsgErro = "";
  
  const instance = axios.create({
    baseURL: 'https://platform-homologx.senior.com.br/t/senior.com.br/bridge/1.0/rest/',
    headers: {'Authorization': tokenSeniorX}
  });
  
  if (!body.sheetContract.registernumber) {
    vAlfCodRetorno = "400";
    vAlfMsgErro = vAlfMsgErro + "Matrícula do Colaborador deve ser preenchida, verifique na guia Contrato; ";
  }
  
  // o campo é de preenchimento obrigatório garantido pela plataforma, por isso não precisa testar se está preenchido;
  if (body.sheetContract.admissionOriginType.value !== 'Normal') {
    vAlfCodRetorno = "400";
    vAlfMsgErro = vAlfMsgErro + "Tipo de Admissão não deve ser diferente de 'Normal', verifique na guia Contrato; ";
  }
  
  //validação de alteração do nome do colaborador
  if (body.sheetInitial.employee) {
    let vAlfDadosColaborador = await instance.get(`/hcm/payroll/entities/employee/${body.sheetInitial.employee.tableId}`);
    //monta o nome do colaborador a partir do retorno dos dados da base
    let vAlfNomeColaborador = vAlfDadosColaborador.data.person.firstname + ' ';
    //vAlfNomeColaborador = vAlfNomeColaborador + vAlfDadosColaborador.data.person.middlename !== '' ? vAlfDadosColaborador.data.person.middlename + ' ' : '';
    if (vAlfDadosColaborador.data.person.middlename !== '') {
      vAlfNomeColaborador = vAlfNomeColaborador + vAlfDadosColaborador.data.person.middlename + ' ';
    }
    vAlfNomeColaborador = vAlfNomeColaborador + vAlfDadosColaborador.data.person.lastname;
    
    if (vAlfNomeColaborador !== body.sheetInitial.person.name) {
      vAlfCodRetorno = "400";
      vAlfMsgErro = vAlfMsgErro + "Não é permitido alterar o Nome do Colaborador, verifique na guia Pessoais; ";
    }
  }
  
  //validação da escala por tipo de contrato
  if (body.sheetInitial.contractType.value == '1 - Empregado') {
    let vAlfEscalaColaborador = await instance.get(`/hcm/payroll/entities/workshift/${body.sheetWorkSchedule.workshift.tableId}`);
    if (vAlfEscalaColaborador.data.code < 1 || vAlfEscalaColaborador.data.code > 10) {
      vAlfCodRetorno = "400";
      vAlfMsgErro = vAlfMsgErro + "Escala para colaboradores tipo /'1 - Empregado/' tem que ser de 1 a 10, verifique na guia Horário; ";
    }
    if (vAlfEscalaColaborador.data.workshiftType !== 'Permanent') {
      vAlfCodRetorno = "400";
      vAlfMsgErro = vAlfMsgErro + "Escala para colaboradores tipo /'1 - Empregado/' tem que ser /'Permanente/', verifique na guia Horário; ";
    }
  }
  
  
  // manda o retorno;
  if (vAlfCodRetorno === "200") {
    return sendRes(vAlfCodRetorno, event.body);
  } else {
    return sendRes(vAlfCodRetorno, vAlfMsgErro);
  }
  
};


const parseBody = (event) => {
  return typeof event.body === 'string' ?  JSON.parse(event.body) : event.body || {};
};

const sendRes = (status, body) => {

  var response = {
    statusCode: status,
    headers: {
      "Content-Type": "application/json"
    },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };

  return response;
};
