---
layout: post
title:  "Php, Curl kullanılarak Bulutfon'la SMS gönderme uygulaması"
date:   2015-12-29 22:53:06 +0800
author: huseyintunc
categories:
  - introduction
tags:
  - bulutfon
  - sms
  - api
  - curl
---

Bir çok arkadaşın Bulutfon Api'yi kullanırken problem yaşadığını görüyorum. Yeni başlayan arkadaşlar için fazla programlama bilgisi gerektirmeden apiyi en faydalı şekilde kullanma kılavuzu olabilecek bir yazı dizisine başlamak istedim. 

İlk makalemi de [buradaki][df1] arkadaşın problemi üzerinden yola çıkarak Bulutfon Api'yi kullanarak SMS gönderme üzerine yazmaya karar verdim. 

Öncelikle yapacağımız işlemlerden kısaca bahsedelim;
* SMS detaylarını gireceğimiz formun oluşturulması.
* Sabit değişkenlerin tanımlanması
* Formdan gelen verilerin çekilmesi
* Curl kullanarak Bulutfon üzerinden sms gönderimi

# Formun Oluşturulması

{% highlight html %}
<html>
<head>
  <meta charset="UTF-8">
  <title>Bulutfon SMS Gönderme</title>
</head>
<body>
  <!-- Form -->
  <form action="#" method="post">
    <table>
      <tr>
        <td valign="top" width="150">Alıcı Listesi</td>
        <td>
          <input type="text" name="receivers"><br>
          <small>Birden fazla alıcı girmek için araya virgül (,) işareti koyunuz. Lütfen numaraları ülke kodu ile birlikte giriniz ör: 905326203322</small>
        </td>
      </tr>
      <tr>
        <td valign="top">Mesaj</td>
        <td>
          <textarea name="message"></textarea>
        </td>
      </tr>
      <tr>
        <td></td>
        <td><button type="submit">Gönder</button></td>
      </tr>
    </table>
  </form>
</body>
</html>
{% endhighlight %}

Numaraların girileceği bir textbox alanı ve mesaj için textarena kullanarak sms gönderim formumuzu oluşturuyoruz. Uygulamamızdaki tüm kodlar en basit haliyle yer almaktadır. Dilerseniz css kullanarak görsel açıdan daha iyi bir form oluşturabilirsiniz. 
Formumuzu oluşturduktan sonra olayın arkaplanına geçip php kodlarımızı yazmaya başlayabiliriz. 

# Sabit Değişkenlerin Tanımlanması

{% highlight php %}
<?php 
	/*
	* Bulutfon Api
	* SMS Gönderme
	*/
	$token    = ""; // Bulutfon panelinden alcağınız master token
	$title    = ""; // Bulutfon üzerinden onaylattığınız sms başlığı
{% endhighlight %}

Başlangıç olarak kullanacağımız sabit değişkenleri tanımlıyoruz. Buradaki '$token' değişkeni Bulutfon'dan alacağımız master token değeridir.  '$title' ise Bulutfon tarafından onaylanmış sms başlığımızdır.

# Formdan Gelen Verilerin Çekilmesi

{% highlight php %}
if (@$_POST){ // Formun post edilip edilmediğinin kontrolü
  $receivers    = $_POST['receivers']; // Formdan gelen alıcı listesi
  $message      = $_POST['message']; // Formdan gelen mesaj alanı
  if ($receivers == "" || $message == ""){ // Formdan gelen verilerin boş olup olmadığını kontrol ediyoruz.
    echo "Lütfen tüm alanları doldurunuz.";
  } else {
    // Curl işlemleri yapılacak.
  }
}
{% endhighlight %}

Yukarıda ilk olarak '@$_POST' ifadesi ile formun post edilip edilmediğini kontrol ediyoruz. Daha sonra formdan gönderilen verileri alıp değişkenlere atadık ve boş olup olmadıklarını kontrol ediyoruz. 

# Curl İşlemleri

{% highlight php %}
$ch = curl_init();  // Curl oturumunu başlattık 
curl_setopt($ch,CURLOPT_URL,'https://api.bulutfon.com/messages'); // SMS gönderimi için kullanacağımız api adresi
curl_setopt($ch,CURLOPT_POST, 1); // Burada curl post kullanacagımızı belirttik 1 yerine  true de denebilir
curl_setopt($ch,CURLOPT_POSTFIELDS,'title='.$title.'&access_token='.$token.'&receivers='.$receivers.'&content='.$message); //  Burada ise göndereceğimiz parametreleri belirtiyoruz.
curl_exec($ch); // Curl calıştır.
curl_close($ch); // Curl oturumunu kapat
{% endhighlight %}

Son olarak curl ile verileri Bulutfon api adresine post methodu ile gönderiyoruz. 
Uygulamanın tam kodlarına [buraya][df2] tıklayarak ulaşabilirsiniz.
Faydalı olması dileğiyle. 

   [df1]: <http://devforums.bulutfon.com/t/php-sms-gonderim-kodum-calismiyor/122/4>
   [df2]: <https://gist.github.com/hsyntnc/4a9334feb1da3030b0f2>
