---
layout: post
title:  "Php, Curl, Bulutfon API'yi kullanarak gelen faksların listelenmesi"
date:   2016-01-04 22:53:06 +0800
author: huseyintunc
categories:
  - introduction
tags:
  - bulutfon
  - fax
  - api
  - curl
  - gelen faxlar
  - list.js
---

Bu yazımızda gelen faxları nasıl görüntüleyeceğimiz ve indireceğimizden bahsedeceğiz. Bu yazımda makalenin gereğinden fazla uzamaması için CSS kodlarını açıklamayıp projenin tamamını paylaşacağım. Ayrıca bu uygulamamızda **google fonts** ve download iconu için **iconfont** kullanacağız. 

Font iconlardan biraz bahsedecek olursak, web uygulamalarında kullanılan iconların resim dosyası kullanmak yerine font şeklinde kullanmamıza yarayan bir araç. Avantajları neler diye soracak olursanız da; resim dosyası olmadığı için renk ve büyüklüklerini css ile değiştirebiliyor olmamız bu avantajların başında gelir. Makalemiz font iconlar üzerine olmadığı için yüzeysel bahsedip konuyu burada bitirmek istiyorum. 

Bu makalede yapacağımız işlemler;

* HTML yapısının oluşturulması
* CSS ile şekillendirilmesi (Bu kısımda detaya girmeyeceğim, proje örnek kodlarında inceleyebilirsiniz)
* PHP ile gelen faxların çekilmesi
* Faxların listelenmesi
* Filtreleme için list.js kullanımı
* İndirme işlemi

Uygulamanızı tamamladığımızda ise şu şekilde görünüyor olacak ([demo][df1]);
![](https://camo.githubusercontent.com/bf32e206e99eb453db8044f60c6039848a3cc752/687474703a2f2f692e696d6775722e636f6d2f705730474668732e706e67)

# HTML Yapısının Oluşturulması

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gelen Faxlar</title>
    <!-- Google Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900,700,600,300,200&subset=latin,latin-ext' rel='stylesheet' type='text/css'>

    <!-- Main CSS -->
    <link href="css/main.css" rel="stylesheet">
    <!-- Font CSS -->
    <link href="css/fonts.css" rel="stylesheet">
</head>
<body>
<!-- Container -->
<div id="container">
    <!-- Arama Textbox-->
    <input type="text" class="search" placeholder="Filtrele">
    <!-- Başlıklar -->
    <div id="title">
        <div class="sender">Gönderen</div>
        <div class="sender">Alan</div>
        <div class="sender">Tarih</div>
        <div class="sender">İşlem</div>
    </div>
    <!-- Liste Başlangıç -->
    <ul class="list">
        <li>
            <div class="sender">905068118260</div>
            <div class="receiver">905068118260</div>
            <div class="time">01.01.2016 - 23:30</div>
            <div class="details"><span>DETAY</span></div>
        </li>
    </ul>
    <!-- Liste Bitiş -->
</div>
<!-- Container Bitiş -->
</body>
</html>
```

Uygulamalarımız geliştikçe, yazdığımız kodlar da daha karmaşıklaşıyor. Bu uygulamadan itibaren css ve javascript kodlarını html dosyasında tutmak yerine ayrıdosyalar kullanacağız. Bu sayede uygulamamız daha düzenli bir şekilde geliştirilmiş olacak.

# CSS ile uygılamanın şekillendirilmesi

CSS kodları çok uzun olduğu için burada uzun uzun anlatmak ve paylaşmak yerine proje ile birlikte paylaşma kararı aldım. Ayrıca kodları anlamakta zorluk çekmemeniz için yorum satırlarıyla açıklamaya çalıştım. 

# PHP ile gelen faxların çekilmesi

```php
<?php
/*
 * Bulutfon Api
 * Gelen Faxlar
 */
$token      = ""; // Bulutfon panelinden aldığımız master token
$url        = 'https://api.bulutfon.com/incoming-faxes?access_token='.$token;
$curl       = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
$curl_response = curl_exec($curl);
curl_close($curl);
$result     = json_decode($curl_response, true); // JSON olarak gelen verileri PHP dizisine çeviriyoruz.
$faxes      = $result['incoming_faxes']; // Gelen faxları değişkene atıyoruz.
?>
```
Bulutfon Api'deki gelen faxlar servisine tokenımızı post ederek gelen faxları çekiyoruz. 

# Gelen faxların listelenmesi

Sıra gelen faxlarımızı hazırladığımız html yapısında listelemede. HTML kodumuzdaki `<ul>` (yani liste) alanına aşağıdaki kodlarımızı yazıyoruz.

```html
<ul class="list">
    <?php
    foreach($faxes as $fax){
    ?>
    <li>
        <div class="sender"><?php echo $fax['sender']; ?></div> <!-- Gönderen -->
        <div class="receiver"><?php echo $fax['receiver']; ?></div> <!-- Alıcı -->
        <div class="time">
            <?php
            $yeni   = strtotime($fax['created_at']);
            $son    = date('Y-m-d H:i:s', $yeni); // Burada bulutfondan datetime formatında gelen tarih bilgisini yeniden formatlıyoruz.
            echo $son;
            ?>
        </div>
        <div class="details">
            <!-- İndirme Linki -->
            <a class="button" href="?download=<?php echo $fax['uuid']; ?>"></a>
        </div>
    </li>
    <?php } ?>
</ul>
```

Birazdan yapacağımız indirme işlemi için link veriyoruz. Ama öncesinde filtreleme işlemi için kullanacağımız list.js kütüphanesinden bahsederek kısa bir ara verelim. 
List.js basit uygulamalar için kullanılabilecek kullanışlı bir filtreleme kütüphanesidir. Bu kütüphane ile filtrelenmesini istediğiniz alanların sınıflarını girerek filtreleme işlemi yapabilirsiniz. List.js kütüphanesini indirip uygulamamıza dahil ettikten sonra uygulamamıza entegre ediyoruz.

```html
<script type="text/javascript" src="js/list.js"></script>
<script type="text/javascript">
    var options = {
        valueNames: [ 'receiver', 'sender', 'time' ] // Filtrelenmesini istediğimiz alanlar
    };
    var faxlar = new List('container', options); // Buradaki container kapsayıcı div'in id'sidir.
</script>
```

# İndirme işlemi

İndirme işlemi için download linkimizden gelen fax idsini alarak bulutfon api indirme servisine post ediyoruz. Ayrıca güvenlik açısından tokenımızı url'ye eklemek yerine hader ile gönderiyoruz. 

```php
if (isset($_GET['download'])){
    $url    = 'https://api.bulutfon.com/incoming-faxes/'.$_GET['download'].'?';
    header('Location: '.$url . http_build_query(array(
            'access_token' => $token,
        )));
}
```

Uygulamamızın sonuna gelmiş bulunuyoruz. Örnek kodları [buraya][df2] tıklayarak inceleyebilirsiniz. Çalışan halini görüntülemek için de [buraya][df1] tıklayabilirsiniz.

Faydalı olması dileğiyle.
İyi çalışmalar.

   [df1]: <http://tunc.tk/Bulutfon/incomingFaxes/index.php>
   [df2]: <https://github.com/hsyntnc/BulutfonSampleApps/tree/master/incomingFaxes>
