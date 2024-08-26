//1 requires 
const express = require('express');
const mysql = require('mysql2');
const cors = require ('cors');

const mysql_config = require('./inc/mysql_config');
const functions = require('./inc/functions');

//2 criação de duaas constantes para definnição da disponiilidade da
//api e da versão da api

 const API_AVAIABILITY = true;
 const API_VERSION = '1.0.0';
 
 //3 iniciar o server 
 const app = express();
 app.listen(3000, ()=>{
    console.log("API está executando")
 })

 //4 checar  se API está disponível
 app.use((req, res, next)=>{
    if (API_AVAIABILITY){
        next();
    } else{
        res.json(functions.response('atenção', 'API está em manutenção. Sinto muito ',0,null))
    }
 }) 
 
 //5 mysql connection
 const conncetion = mysql.createConnection(mysql_config)
 
 //6 cors 
 app.use(cors());

 //7 rotas
 //rota inicial que vai dizer  que a API está disponível
 app.get('/', (req,res)=>{
    req.json(functions.response('sucesso', 'API está rodando',0,null))
 })

 //9 rota para pegar todas as tarefas
 app.get('/tasks',(req,res)=>{
    conncetion.query('SELECT * FROM tasks',(err, rows))
 })
 //8 midleware para caso alguma rota não seja encontrada
 app.use((req,res)=>{
    res.json(functions.response('atenção', 'Rota não encontrada', 0,null))
 })