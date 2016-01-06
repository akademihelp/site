---
layout: post
title:  "Php, Curl, Bulutfon Apiyi Kullanarak Fax Gönderme İşlemi"
date:   2016-01-04 22:53:06 +0800
author: huseyintunc
categories:
  - introduction
tags:
  - bulutfon
  - fax
  - api
  - curl
  - fax gönderme
  - post
---

Merhaba arkadaşlar, gelen faxları listeleme işleminden sonra bir sonraki konumuz olan fax gönderme işlemini ile tekrar beraberiz. Bu yazımızda yapacağımız işlem daha önce birlikte yapmış olduğumuz sms gönderme uygulamasına benzeyen bir işlem. Kullanıcıdan bazı parametreler isteyip bunları Bulutfon Api'ye curl yardımı ile post methoduyla göndereceğiz. 

Yapacağımız işlemler başta biraz karışık görünebilir ama olayın özünü anladığınızda hiç zor olmadığını göreceksiniz. Lafı fazla uzatmadan uygulamamıza geçelim. 

Yapacağımız uygulamanın bitmiş halinden bir ekran görüntüsüyle başlayalım;
![Bulutfon Fax Gönderme](/images/bulutfon-fax-gonderme.png)
 
Bu makalede yapacağımız işlemler;

* HTML yapısının oluşturulması
* PHP ile formdan gelen verilerin işlenmesi
* Sunucuya dosya yükleme işlemi
* Curl ile fax gönderme işlemi


# HTML Yapısının Oluşturulması

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fax Gönder</title>
    <!-- Google Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,900,700,600,300,200&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <!-- Main CSS -->
    <link href="css/main.css" rel="stylesheet">
    <!-- Font CSS -->
    <link href="css/fonts.css" rel="stylesheet">
</head>
<body>
<div class="title">Bulutfon Api Fax Gönderme</div>
<!-- Container -->
<div id="container">
    <form action="#" method="post" enctype="multipart/form-data">
        <input type="text" name="title" placeholder="Fax Başlığı">
        <small>Gönderilecek faxın başlığı.</small>

        <input type="text" name="did" placeholder="Gönderilecek Numara">
        <small>Faxın gönderileceği numara.</small>

        <input type="text" name="receivers" placeholder="Alıcılar">
        <small>Virgül (,) ile ayrılarak birden fazla alıcı girilebilir.</small>

        <input type="file" name="file">
        <small>Göndermek istediğiniz dosyayı seçin.</small>

        <button type="submit">Gönder <i class="flaticon-arrow487"></i></button>
    </form>
</div>
<!-- Container Bitiş -->
</body>
</html>
```

İhtiyacımız olan formu oluşturuyoruz. Başlık alanı, alıcı listesi ve gönderilecek numara alanları için input html elementinin text türünü kullanıyoruz. Yükelenecek olan dosya için ise type parametresini file olarak belirtiyoruz. Ayrıca burada dikkat etmemiz gereken diğer bir konu da forma eklediğimiz enctype parametresi. Bu parametre sayesinde form ile dosya göndereceğimizi belirmiş oluyoruz.  

# PHP ile Formdan Gelen Verilerin İşlenmesi

Formdan gelen verileri alarak birer değişkene atıp dosya yükleme işlemini yapıyoruz. Burada dikkat etmemiz gereken bir konu daha var. Bulutfona fax gönderebilmemiz için dosyamızın base64 kodlama şemasını kullanıyor olması gerekiyor. Bu işlem için de yardımcı bir fonksiyon kullanıyoruz. 

```php
<?php
/*
 * Bulutfon Api
 * Fax Gönderme
 */
$token              = ""; // Bulutfon panelinden aldığımız master token

// Base64 dönüşümünü yapacak olan yardımcı fonksiyonumuz.
function prepareFaxAttachment($path) {
    $type = mime_content_type($path);
    $basename = basename($path, pathinfo($path, PATHINFO_EXTENSION));
    $data = file_get_contents($path);
    $base64 = 'data:'. $type . ';name:'. $basename .';base64:' . base64_encode($data);
    return $base64;
}

if(isset($_POST)){ // Post işlemi sonrası verileri işlemeye başlıyoruz
    $title          = $_POST['title']; // Formdan gelen fax başlığı
    $receivers      = $_POST['receivers']; // Formdan gelen alıcı listesi
    $did            = $_POST['did']; // Formdan gelen gönderilen numara
    
    $dir            = 'files/'; // Dosyamızın kopyalanacağı dizin. Bu dizinin izinleri 777 olacak şekilde ayarlanmalıdır. 
    $file           = $dir.basename($_FILES['file']['name']); // Kopyalama işlemi öncesi gelen dosyanın nereye hangi isimle kayıt olacağını belirliyoruz.
    if (move_uploaded_file($_FILES['file']['tmp_name'],$file)){ // Kopyalam işlemi
        $file       = prepareFaxAttachment($file); // Base64 dönüşümü
    } else {
        die("Dosya aktarımı sırasında hata oluştu.");
    }
    
    /*
    * CURL işlemleri buraya gelecek
    */
}
?>
```
Fax gönderme işlemi için gerekli parametreler; fax başlığı, gönderilecek numara, alıcı listesi ve dosyadır. Yukarıdaki kodlar sayesinde artık ihtiyacımız olan tüm parametrelere sahibiz. Şimdi bu parametreleri curl ile apideki endpointe post ederek fax gönderme işlemini gerçekleştirebiliriz.

# Curl ile Fax Gönderme
Yukarıda değişkenlere atadığımız verileri kullanacağımız alan da burası. 
```php
$url            = 'https://api.bulutfon.com/outgoing-faxes?access_token='.$token; // Fax gönderme işlemini yapacağımız servis
// Elimizdeki verileri bir dizi değişkene aktararak post etmeye hazır hale getiriyoruz.
$data           = array("title" => $title, "receivers" => $receivers, "did" => $did, "attachment" => $file);
$data_string    = json_encode($data); // Bu dataları JSON formatına çeviriyoruz.
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);                                                                  
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);                                                                   
curl_setopt($curl, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data_string))                                                                       
);
$curl_response  = curl_exec($curl);
curl_close($curl);
$result         = json_decode($curl_response, true);
var_dump($result);
die();
```
Fax gönderme işlemini de bu şekilde tamamlamış bulunuyoruz. Örnek kodları [buraya][df1] tıklayarak inceleyebilirsiniz. 

Faydalı olması dileğiyle.
İyi çalışmalar.

   [df1]: <https://github.com/hsyntnc/BulutfonSampleApps/tree/master/sendFax>
