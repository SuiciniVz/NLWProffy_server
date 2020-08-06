import express from 'express';
import db from './database/connection';

import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

// GET: Busca ou atualiza uma informação
// POST: Cria alguma informação
// PUT: Atualiza uma informação ja existente
// DELETE: Deleta uma informação ja existente

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post('/classes', async (req, res) => {

  console.log("> Entrou na rota /classes")

  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = req.body

  const trx = await db.transaction();

  try {
    console.log("> Criando conexão com db e inserindo dados do user")
    const insertedUsersIds =  await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });
    
    const user_id = insertedUsersIds[0];

    console.log("> Criando conexão com db e inserindo dados da aula")
    const insertedClassesIds = await trx('classes').insert({
      subject,
      cost,
      user_id
    });

    const class_id = insertedClassesIds[0];

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
        class_id
      }
    });

    console.log("> Criando conexão com db e inserindo dados do horário")
    await trx('class_schedule').insert(classSchedule)


    trx.commit();
    
    return res.status(201).send()

  } catch (erro) {

    trx.rollback()

    return res.status(400).json({
      error: 'Unexpected erro while creating new class'
    })
    
  }
});

export default routes;