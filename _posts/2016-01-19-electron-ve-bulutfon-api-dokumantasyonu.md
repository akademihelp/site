---
layout: post
title: 'Electron ve Bulutfon Api Dokumantosyonu'
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

Electron; javascript, HTML ve CSS Kullanarak cross platform desktop app yazilmasina imkan saglayan bir framework. Adinda anlasilacagi uzere [Atom](https://atom.io/) icin yazilmis bir framework ve open source.

Electron `Node.js` ve `Chromium` uzerine bina edildigi icin `webkit` nimetlerinden yararlanarak cok efektif projeler yaratilabilir.

(Ben burada hemen bir parantez acmak istiyorum, yillar once Mozilla camiasinin onculugu ile baslayan IE'ye karsi alternative bir browser olusturma girisimine saygi duyarak, sadece `webkit` i ustun kilip diger yapilari yok sayarak bir seyler yapmak, interneti IE olmasada, IE'nin yerine bir baska yapinin tekeline birakmaktir diye dusunuyorum ve bu bana cok da dogru gelmiyor. Elbette Electron'da benzer bir durum soz konusu degil, ama ortaya cikartilan projelerde internetin gelecegi adina bu gibi konular es gecilmemelidir. Eger okumak isterseniz [soyle](http://www.nukeador.com/23/01/2015/we-have-to-fight-again-for-the-web/) bir yazida mevcut.)

## Electron Icin Hazirlik

Node.js uzerine bina edildigi icin oncelikle [Node.js'in](https://nodejs.org/) kurulu olmasi gerekiyor.

#### Nereden Baslamaliyim?

Iste burda bir secim yapmaniz gerekiyor. Electron ile calismak icin ya native [documentation'i](http://electron.atom.io/docs/v0.36.4/) takip edeceksiniz ya da bir boilerplate ile yolunuza devam edeceksiniz.

Boilerplate size hizli bir sekilde sonuc almaniza yardimci olacaktir. Ama documentation'ni da kesinlikle okumanizi tavsiye ederim. Zira ilerde karsilacaginiz her turlu issue'nun cevabini orada bulabilirsiniz.

Electron'un open source boilerplate'lerine [buradan](https://github.com/sindresorhus/awesome-electron#boilerplates) ulasabilirsiniz.

Bizler [Bulutfon Api Dokumantosyonu](https://github.com/bulutfon/bulutfon-api-electron) icin [electron-boilerplate'i](https://github.com/szwacz/electron-boilerplate) kullandik.

#### Neden electron-boilerplate Sectik?

* Diger boilerplate'ler release'leri raw seklinde veriyor. Yani installer olmadan release yapiyor. Bu da son kullanici tarafinda memnuniyetesizlik dogurabilir.
* [Gulp](http://gulpjs.com/) kullandigi icin HAML, Sass, Less, Coffee Script gibi powerful tool'lar ile calismaya imkan sagliyor.
* Kolayca installer banner, desktop icon, docker icon eklemeyip installer window'u customize edebilirsiniz.
* ES6 kullanimina olanak sagliyor. Yani yazdiginiz bir javascript module ES6 ile Kolayca import yapabilirsiniz.
* Development, production ve test environment 'larina sahip.
* [Jasmine](http://jasmine.github.io/2.0/introduction.html) ile test yapabilirsiniz.
* Star, watch, fork gibi rakamlari fena degil ve repo owner pull-request leri es gecmiyor. Bence bu reponun gelismesi icin gerekli olan en buyuk etken, zira sizlerde reponun gelismesine katki saglayabilirsiniz. Ornegin [soyle.](https://github.com/szwacz/electron-boilerplate/commit/ad88e089d7f1f4232ab85ae8c34ea4e923eba23b)

## Bulutfon Api Dokumantasyonu

Electron, [Android](http://developer.android.com/reference/android/webkit/WebView.html) ve [.NET](https://msdn.microsoft.com/library/windows/apps/windows.ui.xaml.controls.webview.aspx) developer' larin asina oldugu [webview](http://electron.atom.io/docs/v0.36.4/api/web-view-tag/) ozelligine sahip.

Bizler [bulutfon api dokumantasyonu](https://github.com/bulutfon/bulutfon-api-electron) icin bu ozellikten yararlandik.

Kisaca bulutfon api dokumantasyonu reposuna goz atacak olursak;

```
git clone https://github.com/bulutfon/bulutfon-api-electron.git
cd bulutfon-api-electron
npm install
```
ve

```
npm start
```

ile Bulutfon Api Dokumantasyonu'na merhaba diyebilirsiniz.

#### Development Environment
Ilk screen'de eminimki Devtools dikkatinizi cekmistir. Zira Electron basic olarak [Devtools extension'a](http://electron.atom.io/docs/v0.36.4/tutorial/devtools-extension/) sahip ve bu da hata ayiklamada buyuk bir avantaj sagliyor.

#### Project Folders

##### app
`app` icinde uygulamanizin kodlari bulunuyor.
`app/package.json` de application'a ait kimlik bilgileri ve yine application'a ait dependencies'leri bulabilirsiniz.
`app/background.js` de application'a ait electron base tanimlamalari mevcut. Ornegin, [surada](https://github.com/bulutfon/bulutfon-api-electron/blob/master/app/background.js#L17) application'a ait screen size degerleri mevcut. Bir diger code block'da Devtools'a ait. Bazen development environment ile production environment'da Devtools kullanma ihtiyaci dogabiliyor. Onun icin [suradan](https://github.com/bulutfon/bulutfon-api-electron/blob/master/app/background.js#L41) ilgili degisikligi yapabilirsiniz.

##### config
`config` folder icinde uc environment'a ait json dosyalari var. Burada environment'lara ait specific atamalar yapilabilir.

##### resources
`resources` icinde installer banner, desktop icon, docker icon gibi image'lar mevcut. Orginal size ve format' lara sadik kalarak burada istediginiz degisikligi yapabilirsiniz.

##### task
`task` icinde build ve environment icin kullanilan kodlar mevcut. Burada onemli bir husus var. Eger `app` folder icinde herhangi bir folder/file structure' da bir degisiklik yapmis iseniz bunu [build.js](https://github.com/bulutfon/bulutfon-api-electron/blob/master/tasks/build.js#L17) icinde tanimlamayi unutmayin. Zira daha oncede bahsettigim gibi proje Gulp ile entegre ve `npm start` dediginizde Gulp projeyi build.js icindeki tanimalara gore build edecektir.

Eger herhangi bir npm package eklemek isterseniz ise asagidaki yolu kullanabilirsiniz.

* `cd/app`
* `npm install name_of_npm_module --save`

#### Production Environment
Release almak istediginiz operation system'e sahip olmak zorundasiniz. Yani MAC icin OSX, Linux icin Ubuntu ya da bir digeri, Windows icin Windows 7'in hali hazirda kurulu olmasi gerekiyor.

Bunun icin [Vagrant](https://www.vagrantup.com/) ya da [Virtual Box](https://www.virtualbox.org/wiki/Downloads) kullanabilirsiniz. Ayrica Microsoft'un developer icin hazirladigi [soyle](https://dev.windows.com/en-us/microsoft-edge/tools/vms/mac/) bir sayfadan da yararlanabilirsiniz.

##### Linux

`npm run release`

##### Windows

* Oncelikle [NSIS](http://nsis.sourceforge.net/) indirip kurmamiz gerekiyor. NSIS v3.0b3 kurmanizi tavsiye ederim, zira daha onceki surumler turkce karakterlerde sorun yaratabiliyor.

* Kurulum tamamladiktan sonra NSIS icin windows icinde `environment variables` set etmeniz gerekiyor. Sanirim [suradaki](http://www.computerhope.com/issues/ch000549.htm) tutorial yardimci olacaktir.

* [Node.js](https://nodejs.org/en/) ve [git](https://git-scm.com/download/win) install edin.

* Terminal olarak git ile beraber gelen `git bash` kullanabilirsiniz.

* `npm run release`

## Son Olarak

Genel hatlariyla Electron'u "Bulutfon Api Dokumantasyonu" uzerinden anlatmaya calistim.
Bulutfon Api Dokumantasyonu basic bir yapiya sahip yani herhangi bir third party framework ya da library kullanmiyor.

Ama ilerleyen zaman icin Bulutfon icin gelistirdigimiz MVP'yi (yangying) duyuracagiz ve bu application icin de AngularJS gibi bazi framework ve library'leri kullandik. Bu baglamda "yangying" (Bulutfon MVP) electron icin cok daha gelismis bir ornek olacaktir. Yine akademi.help altinda konuyu etraflica ele alan bir yazi yazmayi dusunuyorum. Takipte kalin.

Karsilastiginiz sorun ya da kafaniza takilan sorulari yorum yazarak bizlere aktarabilirsiniz.
