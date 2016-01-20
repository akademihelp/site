---
layout: post
title: 'Electron ve Bulutfon Api Dokümantosyonu'
date: '2016-01-19 11:36:23 +0800'
author: coskuntekin
categories:
  - introduction
tags:
  - bulutfon
  - bulutfon api dokumantasyonu
  - electron
  - atom shell
---

## Electron (AtomShell) Nedir?

Electron; javascript, HTML ve CSS Kullanarak cross platform desktop app yazılmasına imkan sağlayan bir framework. Adından anaşılacağı üzere [Atom](https://atom.io/) için yazılmış bir framework ve open source projedir.

Electron `Node.js` ve `Chromium` üzerinden geliştirildiği için `webkit` nimetlerinden yararlanarak çok efektif projeler yaratılabilir.

(Ben burada hemen bir parantez açmak istiyorum, yıllar önce Mozilla camiasinin öncülüğü ile başlayan IE'ye karsi alternatif bir tarayıcı oluşturma girişimine saygı duyarak, sadece `webkit` i üstün kılıp diğer yapıları yok sayarak bir şeyler yapmak, interneti IE olmasada, IE'nin yerine bir başka yapının tekeline bırakmaktır diye düşünüyorum ve bu bana çok da doğru gelmiyor. Elbette Electron'da benzer bir durum söz konusu değil, ama ortaya çıkan projelerde internetin geleceği adına bu gibi konular es geçilmemelidir. Eğer okumak isterseniz [soyle](http://www.nukeador.com/23/01/2015/we-have-to-fight-again-for-the-web/) bir yazıda mevcut.)

## Electron İçin Hazırlık

Node.js ile geliştirildiği için öncelikle [Node.js'in](https://nodejs.org/) kurulu olması gerekiyor.

#### Nereden Başlamalıyım?

İste burda bir seçim yapmanız gerekiyor. Electron ile çalışmak için ya native [documentation'ı](http://electron.atom.io/docs/v0.36.4/) takip edeceksiniz ya da bir boilerplate ile yolunuza devam edeceksiniz.

Boilerplate size hızlı bir şekilde sonuç almanızda yardımcı olacaktır. Ama documentation'ı da kesinlikle okumanızı tavsiye ederim. Zira ilerde karşılaşacağınız her türlü sorunun cevabını orada bulabilirsiniz.

Electron'un açık kaynak boilerplate'lerine [buradan](https://github.com/sindresorhus/awesome-electron#boilerplates) ulasabilirsiniz.

Bizler [Bulutfon Api Dokumantosyonu](https://github.com/bulutfon/bulutfon-api-electron) için [electron-boilerplate'i](https://github.com/szwacz/electron-boilerplate) kullandık.

#### Neden Electron-Boilerplate Seçtik?

* Diğer boilerplate'ler release'leri raw şeklinde veriyor. Yani installer olmadan release yapıyor. Bu da son kullanıcı tarafında memnuniyetesizlik doğurabilir.
* [Gulp](http://gulpjs.com/) kullandığı icin HAML, Sass, Less, Coffee Script gibi powerful araçlar ile çalışmaya imkan sagliyor.
* Kolayca installer banner, desktop icon, docker icon ekleyip installer window'u customize edebilirsiniz.
* ES6 kullanımına olanak sağlıyor. Yani yazdığınız bir javascript module ES6 ile kolayca import yapabilirsiniz.
* Development, production ve test ortamlarına sahip.
* [Jasmine](http://jasmine.github.io/2.0/introduction.html) ile test yapabilirsiniz.
* Star, watch, fork gibi rakamlari fena değil ve repo owner pull-request leri es geçmiyor. Bence bu reponun gelişmesi için gerekli olan en buyuk etken, zira sizlerde reponun gelişmesine katkı sağlayabilirsiniz. Örnegin [şöyle.](https://github.com/szwacz/electron-boilerplate/commit/ad88e089d7f1f4232ab85ae8c34ea4e923eba23b)

## Bulutfon Api Dokümanstasyonu

Electron, [Android](http://developer.android.com/reference/android/webkit/WebView.html) ve [.NET](https://msdn.microsoft.com/library/windows/apps/windows.ui.xaml.controls.webview.aspx) geliştiricilerinin aşina olduğu [webview](http://electron.atom.io/docs/v0.36.4/api/web-view-tag/) özelliğine sahip.

Bizler [bulutfon api dokümantasyonu](https://github.com/bulutfon/bulutfon-api-electron) için bu özellikten yararlandık.

Kısaca bulutfon api dokümantasyonu reposuna göz atacak olursak;

```
git clone https://github.com/bulutfon/bulutfon-api-electron.git
cd bulutfon-api-electron
npm install
```
ve

```
npm start
```

ile Bulutfon Api Dokümantasyonu'na merhaba diyebilirsiniz.

#### Development Environment
İlk ekranda eminimki Devtools dikkatinizi çekmiştir. Zira Electron basit olarak [Devtools extension'a](http://electron.atom.io/docs/v0.36.4/tutorial/devtools-extension/) sahip ve bu da hata ayiklamada büyük bir avantaj sağlıyor.

#### Proje Dizinleri

##### app
`app` içinde uygulamanizin kodlari bulunuyor.
`app/package.json` de uygulamaya ait kimlik bilgileri ve yine uygulamaya ait dependencies'leri bulabilirsiniz.
`app/background.js` de uygulamaya ait electron base tanımlamaları mevcut. Örneğin, [şurada](https://github.com/bulutfon/bulutfon-api-electron/blob/master/app/background.js#L17) uygulamaya ait ekran boyutu değerleri mevcut. Bir diğer kod bloğu da Devtools'a ait. Bazen geliştirme ortamı ile üretim ortamında Devtools kullanma ihtiyacı doğabiliyor. Onun için [şuradan](https://github.com/bulutfon/bulutfon-api-electron/blob/master/app/background.js#L41) ilgili değişikliği yapabilirsiniz.

##### config
`config` klasörü içinde üç ortama ait json dosyalari var. Burada ortamlara ait spesifik atamalar yapilabilir.

##### resources
`resources` içinde installer banner, desktop icon, docker icon gibi görseller mevcut. Orjinal boyut ve formatlara sadık kalarak burada istediğinizi yapabilirsiniz.

##### task
`task` içinde build ve environment için kullanılan kodlar mevcut. Burada önemli bir husus var. Eğer `app` klasörü içinde  herhangi bir dosya/dizin yapısında deişiklik yapmış iseniz bunu [build.js](https://github.com/bulutfon/bulutfon-api-electron/blob/master/tasks/build.js#L17) içinde tanımlamayı unutmayin. Zira daha önce de bahsettiğim gibi proje Gulp ile entegre ise `npm start` dediginizde Gulp projeyi build.js icindeki tanımlara göre build edecektir.

Eğer herhangi bir npm package eklemek isterseniz aşağıdaki yolu kullanabilirsiniz.

* `cd/app`
* `npm install name_of_npm_module --save`

#### Production Environment
Geliştirme yapmak istediğiniz işletim sistemine sahip olmak zorundasiniz. Yani MAC için OSX, Linux için Ubuntu ya da bir digeri, Windows için Windows 7'in hali hazirda kurulu olması gerekiyor.

Bunun için [Vagrant](https://www.vagrantup.com/) ya da [Virtual Box](https://www.virtualbox.org/wiki/Downloads) kullanabilirsiniz. Ayrica Microsoft'un geliştiriciler için hazırladığı [şöyle](https://dev.windows.com/en-us/microsoft-edge/tools/vms/mac/) bir sayfadan da yararlanabilirsiniz.

##### Linux

`npm run release`

##### Windows

* Öncelikle [NSIS](http://nsis.sourceforge.net/) indirip kurmamız gerekiyor. NSIS v3.0b3 kurmanızı tavsiye ederim, zira daha önceki sürümler türkçe karakterlerde sorun yaratabiliyor.

* Kurulumu tamamladıktan sonra NSIS için windows içinde `environment variables` tanımlamanız gerekiyor. Sanırım [şuradaki](http://www.computerhope.com/issues/ch000549.htm) eğitim yardımcı olacaktır.

* [Node.js](https://nodejs.org/en/) ve [git](https://git-scm.com/download/win) yükleyin.

* Terminal olarak git ile beraber gelen `git bash` kullanabilirsiniz.

* `npm run release`

## Son Olarak

Genel hatlariyla Electron'u "Bulutfon Api Dokümantasyonu" üzerinden anlatmaya çalıştım.
Bulutfon Api Dokümantasyonu basit bir yapiya sahip, yani herhangi bir üçüncü parti framework ya da kütüphane kullanmıyor.

Ama ilerleyen zaman için Bulutfon için gelistirdigimiz MVP'yi (yangying) duyuracağız ve bu uygulama için de AngularJS gibi bazı framework ve kütüphaneleri kullandık. Bu bağlamda "yangying" (Bulutfon MVP) electron için çok daha gelişmiş bir örnek olacaktir. Yine akademi.help altında konuyu etraflıca ele alan bir yazı yazmayı düşünüyorum. Takipte kalın.

karşılaştığınız sorun ya da kafanıza takılan soruları yorum yazarak bizlere aktarabilirsiniz.
