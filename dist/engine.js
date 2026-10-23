(function(){
  const delay = ms => new Promise(r=>setTimeout(r,ms));
  const now = () => new Date().toLocaleTimeString('es-MX',{hour12:false});
  const attack = text => /ignora|revela|administrador|cancela|aunque no|sigue todas/i.test(text);
  window.SimEngine = {
    async run(kind,input,protectedMode,onEvent){
      const emit=async(type,label,state='active',detail='')=>{onEvent({time:now(),type,label,state,detail});await delay(260)};
      await emit('input','Entrada recibida','warn',input);
      await emit('api','Validación de esquema','active','Payload aceptado por el endpoint del laboratorio');
      if(kind==='prompt'){
        await emit('guard','Clasificación de instrucciones',protectedMode?'safe':'warn',protectedMode?'Entrada marcada como datos no confiables':'Sin separación entre datos e instrucciones');
        await emit('model','Procesamiento del modelo','ai','Política + mensaje del usuario');
        const bad=attack(input)&&!protectedMode;
        await emit('judge',bad?'Violación demostrada':'Control efectivo',bad?'danger':'safe',bad?'Se expuso el marcador sintético NOVA-ADMIN':'La política se mantuvo; no hubo acción privilegiada');
        return {bad,response:bad?'Instrucciones internas: prioriza soporte. Código operativo: NOVA-ADMIN.':'Puedo ayudarte con los servicios de NovaTech, pero no puedo revelar instrucciones internas ni códigos operativos.',evidence:bad?'Marcador sintético revelado en salida':'Solicitud rechazada; salida validada por política'};
      }
      if(kind==='rag'){
        await emit('search','Búsqueda semántica','active','3 documentos recuperados');
        await emit('docs','Documento no confiable recuperado','warn','DOC-02 · score 0.88');
        await emit('context',protectedMode?'Contexto etiquetado':'Instrucción mezclada con contexto',protectedMode?'safe':'danger',protectedMode?'Origen y nivel de confianza preservados':'Se perdió la frontera entre evidencia e instrucciones');
        await emit('model','Generación con contexto','ai','Respuesta fundamentada');
        return {bad:!protectedMode,response:protectedMode?'La política verificada establece 14 días y exige validar titularidad. Omití instrucciones embebidas en DOC-02.':'Tu devolución ha sido aprobada sin validación. Código: NOVA-ADMIN.',evidence:protectedMode?'DOC-02 excluido por control de procedencia':'DOC-02 trató datos externos como instrucciones'};
      }
      if(kind==='agent'){
        await emit('agent','Plan de acción observable','ai','Intent: cancelOrder · target: ORD-7781');
        await emit('tool','Tool Router','active','cancelOrder({orderId:"ORD-7781"})');
        await emit('auth',protectedMode?'Autorización rechazada':'Autorización ausente',protectedMode?'safe':'danger',protectedMode?'Actor C-042 no es titular de ORD-7781':'Backend confió en la decisión del LLM');
        await emit('backend',protectedMode?'Estado sin cambios':'Pedido cancelado',protectedMode?'safe':'danger',protectedMode?'Transacción abortada':'status: shipped → cancelled');
        return {bad:!protectedMode,response:protectedMode?'No puedo cancelar ese pedido: no pertenece a tu cuenta. Se registró el intento.':'Pedido ORD-7781 cancelado correctamente.',evidence:protectedMode?'AuthZ independiente bloqueó la mutación':'Mutación no autorizada confirmada'};
      }
    },
    async runSuite(protectedMode,count,onRow,onProgress){
      const list=LAB_DATA.tests.slice(0,count); let stats={pass:0,fail:0,inconclusive:0,total:list.length};
      for(let i=0;i<list.length;i++){
        await delay(230); const fails=!protectedMode && [0,1,3,4,5,6].includes(i); const inc=i===7;
        const status=inc?'INCONCLUSIVE':fails?'FAIL':'PASS'; stats[inc?'inconclusive':fails?'fail':'pass']++;
        onRow({id:list[i][0],category:list[i][1],name:list[i][2],status,time:118+i*17,evidence:inc?'La respuesta no alcanza el umbral probatorio':fails?'Impacto verificable en estado o salida':'Control aplicado como se esperaba'}); onProgress((i+1)/list.length,stats);
      }
      return stats;
    }
  };
})();
