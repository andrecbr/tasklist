<?php

require 'vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$db['conn'] 	= null;

$db['host']   = "179.188.17.121";
$db['user']   = "siteperf_cliente";
$db['pass']   = "CL13nt3$$$";
$db['dbname'] = "siteperf_clientes";

$app = new \Slim\Slim($config);

$corsOptions = array(
	"origin" => "*",
	"exposeHeaders" => array("Content-Type", "X-Requested-With", "X-authentication", "X-client"),
	"maxAge" => 1728000,
	"allowCredentials" => true,
	"allowMethods" => array("GET, POST, PUT, DELETE, OPTIONS"),
	"allowHeaders" => array("Content-Type, X-PINGOTHER")
);

$app->add(new \CorsSlim\CorsSlim($corsOptions));


function getConn(){
	global $db;
	
	if (!empty($db['conn'])){
		return $db['conn'];
	}
	
	$pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
		$db['user'], $db['pass']);
	$pdo->exec("set names utf8");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$pdo->setAttribute(PDO::ATTR_PERSISTENT, true);
	$db['conn'] = $pdo;
	return $db['conn'];
}

$app->get('/', function ()  use ($app){
  echo '';
});

$app->get('/tarefa', function () use ($app) {
	$sth = getConn()->prepare("SELECT * FROM tarefa");
	$sth->execute();
	$tarefas = $sth->fetchAll();
	
	echo json_encode($tarefas, JSON_NUMERIC_CHECK);
});

$app->get('/tarefa/:id', function ($id) use ($app) {
	$sth = getConn()->prepare("SELECT * FROM tarefa WHERE id = :id");
	$sth->bindParam("id", $id);
	$sth->execute();
  $tarefa = $sth->fetchObject();

	echo json_encode($tarefa, JSON_NUMERIC_CHECK);
});

$app->post('/tarefa', function () use ($app) {
	$request = $app->request();
	$input = json_decode($request->getBody());

	$sql = "INSERT INTO tarefa (titulo, descricao, status) VALUES (:titulo, :descricao, :status)";
	$sth = getConn()->prepare($sql);
	$sth->bindParam("titulo", $input->titulo);
	$sth->bindParam("descricao", $input->descricao);
	$sth->bindParam("status", $input->status);
	$sth->execute();
	
	$input->id = getConn()->lastInsertId();

	echo json_encode($input, JSON_NUMERIC_CHECK);
});

$app->post('/tarefa/:id', function ($id) use ($app) {
	$request = $app->request();
	$input = json_decode($request->getBody());

	$sql = "UPDATE tarefa SET titulo=:titulo, descricao=:descricao,datacriacao=datacriacao,dataedicao=now(),dataconclusao=now(),status=:status WHERE id=:id";
	if (!$input->status){
		$sql = "UPDATE tarefa SET titulo=:titulo, descricao=:descricao,datacriacao=datacriacao,dataedicao=now(),status=:status WHERE id=:id";
	}
	$sth = getConn()->prepare($sql);
	$sth->bindParam("id", $id);
	$sth->bindParam("titulo", $input->titulo);
	$sth->bindParam("descricao", $input->descricao);
	$sth->bindParam("status", $input->status);
	$sth->execute();
	$input->id = $id;

	echo json_encode($input, JSON_NUMERIC_CHECK);
});

$app->delete('/tarefa/:id', function ($id) use ($app) {
	$sth = getConn()->prepare("DELETE FROM tarefa WHERE id=:id");
	$sth->bindParam("id", $id);
	$sth->execute();
	
	$count = $sth->rowCount();
	
	echo json_encode(["count" => $count], JSON_NUMERIC_CHECK);
});


$app->run();