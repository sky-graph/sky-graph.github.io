//*******************************************
// 初期
//*******************************************
function tenki_m_mkurl_init(){
	select_map();
	select_gms();
}



//*******************************************
// 時刻
//*******************************************
var $time	=new Date();
var $yyyy	=$time.getFullYear();
var $mm		=$time.getMonth();
var $dd		=$time.getDate();
var $hr		=$time.getHours();
var $mi		=$time.getMinutes();


// 天気図(3、6、9、12、15、18、21時+2h10min)
var $mytime	=$time;
var $myhr;
if( $hr+$mm/60<5+2/6 ){
	$mytime.setDate($mytime.getDate() -1);
	$myhr	=21;
}else{
	$myhr	=("0" +Math.floor(($hr+$mi/60-2-2/6)/3)*3).slice(-2);
}
var $url_map	="http://www.jma.go.jp/jp/g3/images/jp_c/" +String($mytime.getFullYear()).slice(-2) +("0" + ($mytime.getMonth()+1)).slice(-2) +("0" + $mytime.getDate()).slice(-2) +$myhr +".png";


// 衛星画像時刻(20分前)
var $mytime	=$time;
$mytime.setDate($mytime.getDate() -20/(24*60));
var $url_gms_post	="/1/" +($mytime.getFullYear()) +("0" + ($mytime.getMonth()+1)).slice(-2) +("0" + $mytime.getDate()).slice(-2) +("0" + $mytime.getHours()).slice(-2) +("0" + $mytime.getMinutes()).slice(-2).substr(0,1) +"0-00.png";


// レーダーURL作成（10分前）
var $mytime	=$time;
$mytime.setDate($mytime.getDate() -10/(24*60));
var $url_rad	="http://www.jma.go.jp/jp/radnowc/imgs/radar/000/" +($mytime.getFullYear()) +("0" + ($mytime.getMonth()+1)).slice(-2) +("0" + $mytime.getDate()).slice(-2) +("0" + $mytime.getHours()).slice(-2) +("0" + $mytime.getMinutes()).slice(-2).substr(0,1) +"0-00.png";



//*******************************************
// 変数の設定
//*******************************************
var $cnt_map	=-1;
var $cnt_gms	=-1;



//*******************************************
// map画像セレクト
//*******************************************
function select_map(){
	
	$cnt_map	=$cnt_map + 1;
	if( $cnt_map > 2 ){ $cnt_map	=0; }
	
	if( $cnt_map == 0 ){
		document.img_map.src	=$url_map;
		document.getElementById("link_map").href	="http://www.jma.go.jp/jp/g3/";
		document.getElementById("linkfont_map").innerHTML	="天気図";
	}else if( $cnt_map == 1 ){
		document.img_map.src	=$url_rad;
		document.getElementById("link_map").href	="http://www.jma.go.jp/jp/highresorad/";
		document.getElementById("linkfont_map").innerHTML	="ナウキャスト";
	}else{
		document.img_map.src	="http://www.jma.go.jp/jp/warn/imgs/000/99.png";
		document.getElementById("link_map").href	="http://www.jma.go.jp/jp/warn/";
		document.getElementById("linkfont_map").innerHTML	="警報・注意報";
	}
}



//*******************************************
// 衛星画像セレクト
//*******************************************
function select_gms(){
	
	$cnt_gms	=$cnt_gms+1;
	if( $cnt_gms > 2 ){ $cnt_gms	=0; }
	
	// 夜間は可視画像を除外
	if( $hr < 6 || 19 < $hr ){
		if( $cnt_gms == 1 ){ $cnt_gms	=2; }
	}
	
	// リンク先
	document.getElementById("link_gms").href	="http://www.jma.go.jp/jp/gms/largec.html?area=0&element=" +$cnt_gms;
	
	var $kind;
	if( $cnt_gms == 0 ){
		$kind	="infrared";
		document.getElementById("linkfont_gms").innerHTML	="赤外";
	}else if( $cnt_gms == 1 ){
		$kind	="visible";
		document.getElementById("linkfont_gms").innerHTML	="可視";
	}else{
		$kind	="watervapor";
		document.getElementById("linkfont_gms").innerHTML	="水蒸気";
	}
	
	document.img_gms.src	="http://www.jma.go.jp/jp/gms/imgs_c/0/" +$kind +$url_gms_post;
}



