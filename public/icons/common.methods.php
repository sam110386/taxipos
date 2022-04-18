<?php 
function getSiteConfig(){
	$db = new DbCon;
	$db->table = 'admins';
	$db->condition['id'] = 1;
	$config = $db->result();
	if(!empty($config)){
		$config = $config[0];
		unset($config['username']);
		unset($config['password']);
		unset($config['last_login']);	
	}
	return ['status' => 1,'result' => $config];
}


function getEditorTableRow($id){
	$db = new DbCon;
	$db->table = 'editor_rows';
	$db->condition['id'] = $id;
	return $db->result();
}

function getVideoTestimonials($request=[]){
	$db = new DbCon;
	$db->table = 'media';
	$db->condition= ['type'=> 0,'show_on_home' => 1] ;
	$db->order = 'DESC';
	$db->orderby = 'id';
	if(isset($request['limit'])) $db->limit=$request['limit'];
	$video= $db->result();


	$result = getEditorTableRow(8);
	if(!empty($result)) $result = $result[0];
	$result['videos'] = $video; 
	return ['status' => 1,'result' => $result];		
}
/* List Articles And Single Article */
function getNewsArticles($request=[]){
	$whereCheck = false;
	$whereConditions = [];
	$limit = "";
	$offset = "";
	$db = new DbCon;
	$db->table = 'news_articles';
	$db->data = ['art.*','cat.category_name'];

		// CHECK IF SLUG PROVIDED TO GET ARTICLE(BASICALLY FOR ARTICLE DETAILS PAGE )
	if(isset($request['slug']) && $request['slug'] != null && $request['slug'] != "" && trim($request['slug']) != ""){
		$whereCheck = true;
		$whereConditions[] = ' art.slug LIKE "'.$request['slug']. '" ';
	}

		// CHECK IF CATEGORY ID HAS BEEN PROVIDED TO GET ARTICLE(BASICALLY FOR ARTICLE CATEGORY PAGE OR FOR SIMILAR ARTICLES)
	if(isset($request['category']) && $request['category'] != null && $request['category'] != "" && trim($request['category']) != "") {
		$whereCheck = true;
		$whereConditions[] = ' art.category_id = '.$request['category'];

	}

		// CHECK IF REVIEW ID HAS BEEN PROVIDED TO GET EXCLUDE REVIEW(BASICALLY FOR REVIEW CATEGORY PAGE OR FOR SIMILAR REVIEWS)
	if(isset($request['exclude_id']) && $request['exclude_id'] != null && $request['exclude_id'] != "" && trim($request['exclude_id']) != "") {
		$whereCheck = true;
		$whereConditions[] = ' art.id != '.$request['exclude_id'];

	}

		// Check if requested from blog search page
	if(isset($request['text']) && $request['text'] != null && $request['text'] != "" && trim($request['text']) != ""){
		$whereCheck = true;
		// $whereConditions[] = '( art.slug LIKE "%' .$request['text']. '%" OR art.title LIKE "%' .$request['text']. '%" OR art.content LIKE "%' .$request['text']. '%" )';
		$whereConditions[] = '( art.title LIKE "%' .$request['text']. '%" )';
	}

		// ARTICLES LIMIT ON LISTING
	if(isset($request['limit']) && is_numeric($request['limit'])) $limit = ' LIMIT '.$request['limit'];


		// Pagination
	if(isset($request['pagination']) && is_numeric($request['pagination']) && isset($request['limit']) && is_numeric($request['limit'])) $offset = ' OFFSET ' . ($request['pagination'] - 1) * $request['limit'] ;



	$where = (count($whereConditions)) ? " WHERE " . implode( " AND ", $whereConditions) : "" ;

	/* Record count */
	if(isset($request['totol_count']) && $request['totol_count']){
		$db->data = ['count(id) as records'];
		$db->query =  " art ".$where;
		$records = $db->result();
		$records = (count($records)) ? $records[0]['records'] : 0 ;
	}else{
		$records = 0;
	}
	
	$db->data = ['art.*','cat.category_name'];
	$db->query = ' art LEFT JOIN news_category cat on art.category_id = cat.id '. $where .' ORDER BY art.id DESC ' . $limit . $offset;

	$result = $db->result();
	$next = "";
	$prev = "";	
	if(isset($request['next']) && $request['next']){
		if(count($result)>0){
			$aid = $result[0]['id'];
			
			$links = new DbCon;
			$links->table = 'news_articles';
			$links->data = ['slug'];
			$links->query = " WHERE id > $aid ORDER BY ID ASC LIMIT 1";
			$link = $links->result();
			$next = (count($link)) ? $link[0]['slug'] : "" ;
			$links->query = " WHERE id < $aid ORDER BY ID DESC LIMIT 1";
			$link = $links->result();
			$prev = (count($link)) ? $link[0]['slug'] : "" ;
		}
	}
	return ['status' => 1,'result' =>  $db->result(),'records' =>$records, 'image_dir' => '/images/articles/', 'next' => $next, 'prev' => $prev];
}


function getNewsArticleCategories($request=[]){
	$db = new DbCon;
	$db->table = 'news_category';
	return ['status' => 1,'result' =>  $db->result()];
}



function sendEmail($to,$subject,$message,$files = []){
	include_once("../../classes/phpmailer/class.phpmailer.php");
	include_once("../../classes/phpmailer/class.smtp.php");	
	try {
		$Correo = new PHPMailer();
		$Correo->IsSMTP();
		$Correo->SMTPAuth = true;
		$Correo->SMTPSecure = "tls";
		$Correo->Host = SMTP_HOST;
		$Correo->Port = SMTP_PORT;
		$Correo->Username = SMTP_USER;
		$Correo->Password = SMTP_PASS;
		$Correo->SetFrom('information@sylc-export.com','Sylc Export');
		$Correo->Fromname = "From";
		$Correo->AddAddress($to);
		// $Correo->AddAddress('sgstest2505@gmail.com');
		$Correo->Subject = $subject;
		$Correo->Body = "<H3>Bienvenido! Esto Funciona!</H3>";
		$Correo->IsHTML (true);
		$Correo->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test
		$Correo->WordWrap   = 80; // set word wrap
		if(count($files)){
			foreach($files as $file){
				// $Correo->addAttachment($file['url'],$file['name']);
				$Correo->addStringAttachment(file_get_contents($file['url']), $file['name']);
			}
		}
	  	$Correo->MsgHTML($message);
		if($Correo->Send()) {
			return true;
		}
		else{
			return false;
		}
	} catch (phpmailerException $e) {
	  return $e->errorMessage(); //Pretty error messages from PHPMailer
	} catch (Exception $e) {
	  return $e->getMessage(); //Boring error messages from anything else!
	}	
}


function getExchange(){
	$db = new DbCon;
	$db->table = 'exchange_rate';
	$db->data=['exchange_rate'];
	$db->condition['id'] = 1;
	$result = $db->result();
	return (count($result)) ? $result[0]['exchange_rate'] : 0;
}

?>