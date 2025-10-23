const db = require("../db");

// Script para verificar atividades com prazo expirado e aplicar auto-resposta
function checkExpiredActivities() {
  console.log("Verificando atividades com prazo expirado...");
  
  // Buscar atividades com prazo expirado que ainda têm alunos pendentes
  db.query(
    `SELECT a.id, a.titulo, a.questoes, a.data_entrega
     FROM atividades a
     WHERE a.data_entrega < NOW() 
     AND EXISTS (
       SELECT 1 FROM atividade_alunos aa 
       WHERE aa.atividade_id = a.id 
       AND aa.status = 'pendente'
     )`,
    (err, atividades) => {
      if (err) {
        console.error("Erro ao buscar atividades expiradas:", err);
        return;
      }
      
      if (atividades.length === 0) {
        console.log("Nenhuma atividade com prazo expirado encontrada.");
        return;
      }
      
      console.log(`Encontradas ${atividades.length} atividades com prazo expirado.`);
      
      atividades.forEach(atividade => {
        console.log(`Processando atividade: ${atividade.titulo}`);
        
        try {
          const questoes = JSON.parse(atividade.questoes || '[]');
          const respostasPadrao = questoes.map(q => ({
            questaoId: q.id,
            resposta: q.respostaPadrao || (q.tipo === 'multipla' ? q.alternativas?.[0] : ''),
            correta: q.respostaPadrao ? true : false
          }));
          
          // Aplicar auto-resposta para todos os alunos pendentes desta atividade
          db.query(
            `UPDATE atividade_alunos 
             SET status='entregue', entregue_em=NOW(), respostas=?, nota=0
             WHERE atividade_id=? AND status='pendente'`,
            [JSON.stringify(respostasPadrao), atividade.id],
            (err, result) => {
              if (err) {
                console.error(`Erro ao aplicar auto-resposta para atividade ${atividade.id}:`, err);
              } else {
                console.log(`Auto-resposta aplicada para ${result.affectedRows} alunos na atividade ${atividade.titulo}`);
              }
            }
          );
        } catch (parseErr) {
          console.error(`Erro ao processar questões da atividade ${atividade.id}:`, parseErr);
        }
      });
    }
  );
}

// Executar verificação
checkExpiredActivities();

// Executar a cada 5 minutos
setInterval(checkExpiredActivities, 5 * 60 * 1000);

module.exports = { checkExpiredActivities };
