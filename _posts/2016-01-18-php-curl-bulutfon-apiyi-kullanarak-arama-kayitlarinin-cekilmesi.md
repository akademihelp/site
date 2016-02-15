---
layout: post
title:  "PHP, Curl, Bulutfon Apiyi Kullanarak Arama Kayıtlarının Çekilmesi"
date:   2016-01-18 22:53:06 +0800
author: huseyintunc
categories:
  - introduction
tags:
  - bulutfon
  - cdr
  - api
  - curl
  - arama kayıtları
  - post
---

Merhaba arkadaşlar,
Yazı dizimize bugün arama kayıtları ile devam edeceğiz. Bulutfon Apiyi kullanarak arama kayıtlarını çekip, listelemesini yapacağız. 

Eğer önceki yazıları okuduysanız az çok neler yapacağımızı tahmin ediyorsunuzdur. İlk olarak uygulamanın html yapısını oluşturacağız. Ardından Curl ile arama kayıtlarını çekip listeleme yapacağız. Artık gereksiz kod kalabalağı yapmamak için CSS kodlarını makaleye eklemiyorum. Basit haliyle anlatıp ihtiyaç duyanlar için kodları paylaşıyorum ki uygulamanın çalışan halini ve kodlarını inceleyebilesiniz. 
# Uygulamamızın Ekran Görüntüsü
![Uygulamanın ekran görüntüsü](/images/gelen-aramalar-ekran-goruntusu.png)

Html yapısını oluşturarak kodları yazmaya başlayalım.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bulutfon Api CDR</title>
    <!-- Main CSS -->
    <link href="css/main.css" rel="stylesheet">
</head>
<body>
<div id="container">
    <table>
        <tr>
            <th>Arayan</th>
            <th>Aranan</th>
            <th>Yönü</th>
            <th>Arama Tipi</th>
            <th>Tarih</th>
            <th>Ses Kaydı</th>
            <th>Kapanma</th>
        </tr>
        <!-- Örnek Kayıt -->
        <!-- Daha sonra bu alana arama kayıtlarını çekeceğiz. -->
        <tr>
            <td>905068118260</td>
            <td>905068118260</td>
            <td>Gelen</td>
            <td>Arama Tipi</td> <!-- Aramanın sesli arama mı veya fax mı olduğunu göstereceğimiz alan -->
            <td>15-01-2016 19:59:00</td>
            <td>Yok</td>
            <td>Kapanma Sebebi</td>
        </tr>
        <!-- Örnek Kayıt Bitiş -->
    </table>
    <!-- Gelen verilere göre sayfalama yapacağımız alan. -->
    <div class="pagination">
        <a href="#" class="current">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
    </div>
    <!-- Sayfalama bitiş -->
</div>
</body>
</html>
```

# Curl ile Arama Kayıtlarının Çekilmesi
Arama kayıtlarını çekerken dikkat etmemiz gereken birkaç önemli nokta var. Bunlardan ilki sayfa numarası, ikincisi ise limit değeri.  Sayfa numarası çekeceğimiz verilerden kaçıncı sayfayı çekmek istediğimizi gösteriyor. Limit ise her sayfada kaç veri olacağını belirtiyor. 
Örneğin toplamda 23 kaydımız varsa limit değeri olarak 5 yazdığımızda, 5 sayfalık veri dönecektir. Lafı fazla uzatmadan php kısmına geçelim.

```php
<?php
$token          = ""; // Bulutfon panelinden aldığımız master token
$page           = 1; // Başlangıç değeri olarak sayfa numarasını 1 yapıyoruz.
$limit          = 4; // Her sayfada kaç veri gösterileceğini belirliyoruz.
// Bu alanda eğer kullanıcı bir sayfa numarasına tıklamışsa sayfa değerini değiştirerek kullanıcının girdiği sayfanın verilerini çekiyoruz.
if (isset($_GET['page'])){
    $page       = $_GET['page']; // Başka bir sayfaya tıklandıysa 1. sayfa yerine o sayfayı çektireceğiz.
}
// Burada ise arama kayıtlarını çekeceğimiz bulutfon tarafındaki servise gönderilecek parametreleri belirliyoruz.
$url            = 'https://api.bulutfon.com/cdrs?limit='.$limit.'&page='.$page.'&access_token='.$token;
$curl           = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
$curl_response  = curl_exec($curl);
curl_close($curl);
$result         = json_decode($curl_response, true);
$cdrs           = $result['cdrs']; // Arama kayıtlarını değişkene atıyoruz.
$pages          = $result['pagination']; // Sayfalama ve diğer bilgileri pages değişkenine atıyoruz.
?>
```

Bulutfon'dan verileri çektiğimizde bize 2 tipte  veri dönüyor. Birincisi arama kayıtları, diğeri ise sayfalama ve diğer istatistiki bilgiler. Daha sonra bu sayfalama bilgilerini aşağıda sayfalama işlemi yaparken kullanacağız. 

# Gelen Verilerin Listelenmesi
Artık html sayfamız hazır, veriler elimizde. Geriye bu verileri listelemek kalıyor. Oluşturduğumuz tablodaki örnek kaydı aşağıdaki kodlarla değiştiriyoruz. 

```php
<?php
// Gelen verileri foreach döngüsüyle tek tek alıyoruz.
foreach($cdrs as $cdr){
?>
<tr>
    <td><?php echo $cdr['caller']; ?></td>
    <td><?php echo $cdr['callee']; ?></td>
    <?php
    if ($cdr['direction'] == "IN")
        echo '<td class="in">Gelen</td>';
    else
        echo '<td class="out">Giden</td>';
    ?>
    <td><?php echo $cdr['bf_calltype']; ?></td>
    <td><?php echo $cdr['call_time']; ?></td>
    <td>
        <?php
        if ($cdr['call_record']=="Var")
            echo '<a target="_blank" href="?download='.$cdr['uuid'].'">İndir</a>';
        else
            echo 'Yok';
        ?>
    </td>
    <td><?php echo $cdr['hangup_cause']; ?></td>
</tr>
<?php } ?>
```

Kullanıcıya tüm verileri tek sayfada göstermek yerine sayfalama işlemi yapıyoruz.  Sayfa sayısını ise bize gelen pagination verilerine göre belirliyoruz. 

```
<!-- Gelen verilere göre sayfalama yapıyoruz. -->
<div class="pagination">
    <?php
    for ($i=1;$i<=$pages['total_pages'];$i++){
        if ($i==$page)
            echo '<a class="current">'.$i.'</a>';
        else
            echo '<a href="?page='.$i.'">'.$i.'</a>';
    }
    ?>
</div>
```

Son olarak ses kaydı olan aramalar için ses dosyasını dinleme işlemini gerçekleştiriyoruz. 

```php
// Ses Dosyasını Dinleme İşlemi
if(isset($_GET['download'])){
    $url    = 'https://api.bulutfon.com/call-records/'.$_GET['download'].'/stream';
    header('Location: '.$url . http_build_query(array(
            'access_token' => $token,
        )));
}
```

Daha fazla veriye ihtiyaç duyanlar için Bulutfon'dan gelen verilerin tam listesi;
![](/images/veriler-tam-liste.png)

Soru ve isteklerinizi yorum olarak belirtebilirsiniz.  
Örnek kodları [buraya][df1] tıklayarak inceleyebilir, uygulamanın çalışan hali içinse [buraya][df2] tıklayabilirsiniz.

Faydalı olması dileğiyle.
İyi çalışmalar.

   [df1]: <https://github.com/hsyntnc/BulutfonSampleApps/tree/master/CDR>
   [df2]: <http://tunc.tk/Bulutfon/CDR/>
