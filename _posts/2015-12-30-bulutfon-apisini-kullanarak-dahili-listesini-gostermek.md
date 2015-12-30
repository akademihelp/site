---
layout: post
title:  "Bulutfon API'sini kullanarak dahili listesini göstermek"
date:   2015-12-30 22:53:06 +0800
author: huseyintunc
categories:
  - introduction
tags:
  - bulutfon
  - dahili
  - api
  - curl
  - php
---

Merhaba, bu yazımızda Bulutfon Api'yi kullanarak dahili listesini nasıl çekebileceğinizi anlatmaya çalışacağım. 

Bu makaledeki kodları anlayabilmeniz için temel seviyede html, css ve php bilginizin olması gerektiğini hatırlatarak başlayalım.

Yapacağımız işlemleri listeleyecek olursak;

* HTML yapısının oluşturulması
* CSS ile uygulamamızı görsel açıdan daha iyi bir hale getirmek
* PHP ile dahili listesini çekmek 
* Dahili listesini hazırladığımız tasarımla listelemek
* Kullanıcı profil resmi için gravatar fonksiyonu yazmak

Bu işlemlerin sonucunda elde edeceğimiz sonuç;

![drawing](http://i.imgur.com/lxT4NSo.png)

# HTML Yapısının Oluşturulması

{% highlight html %}

<html>
<head>
  <meta charset="UTF-8">
  <title>Bulutfon Dahili Görüntüleme</title>
</head>
<body>
<!-- Sayfa Başlığı -->
<div class="title">DAHİLİ LİSTESİ</div>
<!-- Dahili Listesi -->
<div id="extensions"> 
    <!-- Dahili -->
    <div class="extension">
        <img src="ornek.jpg">
        <div class="name">
            <span class="online">1000 - mail@huseyintunc.net</span>
        </div>
    </div>
    <!-- Dahili Bitiş -->
</div>
<!-- Dahili Listesi Bitiş -->
</body>
</html>

{% endhighlight %}

Yukarıda kullanacağımız html yapısına uygun kodları yazmış bulunuyoruz.

# Uygulamamızın görsel açıdan daha iyi olması için gerekli CSS kodları

{% highlight css %}

<style>
    html,body {
      background: #c1dae9;
      width: 100%;
      height: 100%;
    }
    .title {
      width: 270px;
      margin: 0 auto;
      font-family: Lato,sans-serif;
      color:#fff;
      text-align: center;
      padding:10px;
    }
    #extensions {
      width: 270px;
      padding:20px;
      background-color: #3d3f4b;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
      margin:0 auto;
    }
    .extension {
      margin-bottom:45px;
    }
    .extension:last-child {
      margin-bottom: 20px;
    }
    .extension img {
      width: 50px;
      height: 50px;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
      border:3px solid #64666e;
      float: left;
    }
    .extension .name {
      color:#fff;
      font-family: Lato,sans-serif;
      padding:5px 0 0 70px;
    }
    .extension .name span {
      display: block;
      font-weight: 400;
      color:#8a8d97;
      font-size:11px;
      padding-top:7px;
      text-indent:20px;
      position: relative;
    }
    .extension .name span:before {
      position: absolute;
      content:'';
      width: 10px;
      height: 10px;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
      left:0px;
      top:9px;
    }
    .extension .name .online:before {
      background: #80b969 ;
    }
    .extension .name .offline:before {
      background: #c66747;
    }
  </style>
  
{% endhighlight %}

Bu kısımda uygulamamızın görsel açıdan daha iyi görünmesi için gereken CSS kodlarını yazdık. Artık olayı biraz hareketlendirip dahili listesini çekebiliriz. Öncelikle dahili listesini çekip bir değişkene atalım;

# PHP ile dahili listesini çekme

{% highlight php %}

<?php
/*
* Bulutfon Api
* SMS Dahili Listesi
*/
$token      = ""; // Bulutfon panelinden alcağınız master token
$url        = 'https://api.bulutfon.com/extensions?access_token='.$token; // İstek göndereceğimiz url

$curl = curl_init($url); // Curl oturumunu başlattık
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$curl_response = curl_exec($curl); // Gelen sonucu bir değişkene aktardık.
curl_close($curl); // Curl oturumunu kapattık
$result = json_decode($curl_response, true); // Burada ise bize json olarak gelen sonuçları php nesnesine dönüştürüyoruz
$extensions = $result['extensions']; 
?>
```
Artık dahili listesi elimizde ve istediğimiz şekilde kullanabiliriz. 

Şimdi de kullanıcıların e-mail adreslerinden profil resimlerini elde edebilmek için gravatar fonksiyonunu yazıyoruyz.
```
function get_gravatar( $email, $s = 80, $d = 'mm', $r = 'g', $img = false, $atts = array() ) {
  $url = 'https://s.gravatar.com/avatar/';
  $url .= md5( strtolower( trim( $email ) ) );
  $url .= "?s=$s&d=$d&r=$r";
  if ( $img ) {
    $url = $url . '"';
    foreach ( $atts as $key => $val )
      $url .= ' ' . $key . '="' . $val . '"';
  }
  return $url;
}

{% endhighlight %}

# Dahili Listeleme
Son olarak elimizdeki dahili listesini az önce yazdığımız html koduna entegre ediyoruz. 
```
<div id="extensions">
<?php
    foreach($extensions as $extension){
    ?>
    <div class="extension">
      <img src="<?php echo get_gravatar($extension['email']); ?>">
      <div class="name">
        <?php
          echo $extension['caller_name'];
          if ($extension['registered']){
            echo '<span class="online">' . $extension['number'] . ' - ' . $extension['email'] . '</span>';
          } else {
            echo '<span class="offline">' . $extension['number'] . ' - ' . $extension['email'] . '</span>';
          }
        ?>
      </div>
    </div>
    <?php } ?>
</div>

{% endhighlight %}

Bu yazımızın da sonuna gelmiş bulunuyoruz. Aklınıza takılan her şeyi yorum bölümünde sorabilirsiniz. Uygulamanın çalışan haline [buraya][df1] tıklayarak ulaşabilirsiniz.
Faydalı olması dileğiyle.
İyi çalışmalar.

   [df1]: <https://gist.github.com/hsyntnc/774e2b36912230a1927d>
