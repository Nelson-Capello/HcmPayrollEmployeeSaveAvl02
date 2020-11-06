
/**
 * Nome da primitiva : employeeSave
 * Nome do dominio : hcm
 * Nome do serviço : payroll
 * Nome do tenant : trn07027732
 * * Avaliação do Treinamento SeniorX Novas Tecnologias, escopo 1
 **/

exports.handler = async (event) => {
  
  //let tokenSeniorX = event.headers['X-Senior-Token'];
  let body = parseBody(event);
  let vAlfCodRetorno = "200";
  let vAlfMsgErro = "";
  
  if (!body.sheetContract.registernumber) {
    vAlfCodRetorno = "400";
    vAlfMsgErro = vAlfMsgErro + "Matrícula do Colaborador deve ser preenchida, verifique na guia Contrato; ";
  }
  
  // o campo é de preenchimento obrigatório garantido pela plataforma, por isso não precisa testar se está preenchido;
  if (body.sheetContract.admissionOriginType.value !== 'Normal') {
    vAlfCodRetorno = "400";
    vAlfMsgErro = vAlfMsgErro + "Tipo de Admissão não deve ser diferente de 'Normal', verifique na guia Contrato; ";
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
