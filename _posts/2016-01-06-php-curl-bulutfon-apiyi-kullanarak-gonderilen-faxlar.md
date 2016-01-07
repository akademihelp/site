---
layout: post
title:  "Php, Curl, Bulutfon Apiyi Kullanarak Gönderilen Faxların Listelenmesi"
date:   2016-01-06 22:53:06 +0800
author: huseyintunc
categories:
  - introduction
tags:
  - bulutfon
  - fax
  - api
  - curl
  - giden faxlar
  - post
---

Merhaba arkadaşlar. Yine yepyeni bir yazıyla daha birlikteyiz. Bu yazımda gönderlen faxların listelenmesi ve gönderilen bir faxın alıcılara ulaşıp olaşmadığının kontrol edilebileceği bir uygulama yazacağız. Bu uygulamamızda faxları listeleyeceğimiz index.php ve gelen faxın detay bilgilerini görüntüleyeceğimiz detay.php olmak üzere iki dosya ile çalışacağız.

Aynı zamanda gelen faxlar uygulamamızda kullandığımız list.js, font icon ve google fonts araçlarını bu uygulamamızda da kullanacağız fakat önceki yazımda bahsettiğim için detaya girmeyeceğim. Eğer ki aklınıza takılan bir konu olursa yorum yazarak hiç çekinmeden sorabilirsiniz.

Gelenek haline getirdiğimiz ekran görüntüsüyle başlayalım yazımıza;
# Listeleme Sayfası
![Giden Faxlar](/images/bulutfon-giden-faxlar.png)
# Detay Sayfası
![Giden Fax Detay](/images/bulutfon-giden-fax-detay.png)

Bu makalede yapacağımız işlemler;

* HTML yapısının oluşturulması (listeleme)
* PHP ile gönderilen faxların çekilmesi
* Gönderilen faxların listelenmesi
* Detay sayfası HTML oluşturulması
* Fax detaylarının çekilmesi


# HTML Yapısının Oluşturulması

```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Gönderilen Faxlar</title>
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
        <div class="sender">Alıcı</div>
        <div class="sender">Tarih</div>
        <div class="sender">İşlem</div>
    </div>
    <!-- Liste Başlangıç -->
    <ul class="list">
        <!-- Bu alanda foreach ile listeleme yapılacak -->
        <li>
            <div class="sender">0232 274 6419</div>
            <div class="receiver">1</div>
            <div class="time">22/05/1992 - 19:44</div>
            <div class="details">
                <a class="button" href="#"></a>
            </div>
        </li>
        <!-- Listeleme bitişi burası olacak. -->
    </ul>
    <!-- Liste Bitiş -->
  </div>
  <!-- Container Bitiş -->
  </body>
  </html>
```

Listeleme yapacağımız sayfanın html yapısını oluşturmuş bulunuyoruz. Bir sonraki aşamada curl ile verileri çekip listeleme yapabiliriz artık.

# PHP ile Gönderilen Faxların Çekilmesi

Formdan gelen verileri alarak birer değişkene atıp dosya yükleme işlemini yapıyoruz. Burada dikkat etmemiz gereken bir konu daha var. Bulutfona fax gönderebilmemiz için dosyamızın base64 kodlama şemasını kullanıyor olması gerekiyor. Bu işlem için de yardımcı bir fonksiyon kullanıyoruz.

```php
  <?php
  /*
   * Bulutfon Api
   * Fax Gönderme
   */
  $token              = ""; // Bulutfon panelinden aldığımız master token

  $url                = 'https://api.bulutfon.com/outgoing-faxes?access_token='.$token;
  $curl               = curl_init($url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
  $curl_response = curl_exec($curl);
  curl_close($curl);
  $result             = json_decode($curl_response, true);
  $faxes              = $result['faxes'];
  ?>
```
Bu bölümde ise gelen faxları api üzerinden çekip $faxes değişkenine atıyoruz. Daha sorna foreach kullanarak listeleme işlemini yapabileceğiz.

# Gönderilen Faxların Listelenmesi
Çektiğimiz faxları foreach fonksiyonu ile listeliyoruz.

```php
  <?php
  foreach($faxes as $fax){
  ?>
  <li>
      <div class="sender"><?php echo $fax['did']; ?></div>
      <div class="receiver"><?php echo $fax['recipient_count']; ?></div>
      <div class="time">
          <?php
          $yeni   = strtotime($fax['created_at']); // Bu alanda Bulutfon'dan datetime formatında gelen tarih bilgisini yeniden formatlıyoruz
          $son    = date('Y-m-d H:i:s', $yeni);
          echo $son;
          ?>
      </div>
      <div class="details">
          <!-- Detayları göstereceğimiz sayfaya link veriyoruz -->
          <a class="button" href="detay.php?id=<?php echo $fax['id']; ?>"></a>
      </div>
  </li>
  <?php } ?>
```

# Detay Sayfası HTML Oluşturulması
Gelen faxları listeledikten sonra detay.php adında yeni bir sayfa oluşturup fax detaylarını görüntüleyeceğimiz bir yapı hazırlıyoruz.

```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Gönderilen Faxlar</title>
      <!-- Google Fonts -->
      <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900,700,600,300,200&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
      <!-- Main CSS -->
      <link href="css/main.css" rel="stylesheet">
      <!-- Font CSS -->
      <link href="css/fonts.css" rel="stylesheet">
  </head>
  <body>
  <!-- Container -->
  <div id="detail">
      <h3>DENEME BAŞLIK</h3>
      <small>90534534543 üzerinden 25/45/4534 tarihinde gönderildi</small>
      <div>Alıcı <span>Durum</span></div>
      <ul>
          <li>902322746419 <span class="sent">GÖNDERİLDİ</span></li>
          <li>902322746419 <span class="error">GÖNDERİLEMEDİ</span></li>
      </ul>
  </div>
  </body>
  </html>
```

```php
  <?php
  /*
   * Bulutfon Api
   * Gelen Faxlar
   */
  $token          = ""; // Bulutfon panelinden aldığımız master token
  // URL'de GET methodu ile gönderdiğimiz id değerini burada kullanarak fax detaylarını çekiyoruz
  $url            = 'https://api.bulutfon.com/outgoing-faxes/'.$_GET['id'].'?access_token='.$token;
  $curl           = curl_init($url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
  $curl_response  = curl_exec($curl);
  curl_close($curl);
  $result         = json_decode($curl_response, true);
  $fax            = $result['fax'];
  ?>
```

Artık son işlem olarak fax detaylarını görüntülemek kaldı.

```php
  <!-- Container -->
  <div id="detail">
    <h3><?php echo $fax['title']; ?></h3>
    <small>
      <?php
      $yeni   = strtotime($fax['created_at']);
      $son    = date('Y-m-d H:i:s', $yeni);
      echo 'Fax '.$fax['did'].' üzerinden '.$son.' tarihinde gönderildi.';
      ?>
    </small>
    <div>Alıcı <span>Durum</span></div>
    <ul>
        <?php
        foreach ($fax['recipients'] as $rec) {
          if ($rec['state']=="SENT")
            echo '<li>'.$rec['number'].' <span class="sent">GÖNDERİLDİ</span></li>';
          else
            echo '<li>'.$rec['number'].' <span class="error">GÖNDERİLEMEDİ</span></li>';
        }
        ?>
    </ul>
  </div>
```

Bu uygulamamızın da sonuna gelmiş bulunuyoruz.  Örnek kodları [buraya][df1] tıklayarak inceleyebilirsiniz.
Uygulamanın çalışan hali içinse [buraya][df2] tıklayabilirsiniz.

Faydalı olması dileğiyle.
İyi çalışmalar.

   [df1]: <https://github.com/hsyntnc/BulutfonSampleApps/tree/master/outgoingFaxes>
   [df2]: <http://tunc.tk/Bulutfon/outgoingFaxes/>
