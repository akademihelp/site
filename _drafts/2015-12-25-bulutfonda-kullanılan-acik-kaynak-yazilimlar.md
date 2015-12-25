---
layout: post
title:  "Bulutfon'da kullanılan açık kaynak yazılımlar"
date:   2015-12-25 21:53:06 +0800
author: onurozgurozkan
categories:
  - introduction
tags:
  - bulutfon
  - açık kaynak

---

Bir çok geliştiriciden Bulutfon'un alt yapısıyla ilgili detaylı sorular alıyoruz. Genel olarak alt yapıyı ve kullandığımız yazılımları merak ediyorlar. Hem onların sorularını cevaplamak, hem staj ve iş başvurusunda bulunacak arkadaşlar için genel olarak bu soruya cevap vermeye çalışacağım.

# Programlama Dilleri

Bulutfon'da ağırlıklı olarak Ruby programlama dili kullanılıyor diyebilirim.

* Ruby
* Javascript; Server site tarafında kullanmıyoruz.
* Python; Bazı workerları Ruby yerine Python ile yazmayı tercih ettik.
* C; Freeswitch'e modul yazmak için kullanılıyor.
* Lua; Nginx ve Freeswitch LUA script çalıştırabiliyor.
* PHP; Sadece composer paketi için kullanılıyor.
* C#; Sadece nuget paketi için kullanılıyor.

# Geliştirme Çatıları

* Ruby'de Ruby on Rails
* Javascript'de Angular (Yeni başladık)
* CSS ve JS'de Bootstrap

Not: Admin temamız lab2023.com tarafından yapılan açık kaynaklı [Hierapolis](http://github.com/lab2023/hierapolis) temasıdır.

# Veritabanları

**İlişkisel**

* PostgreSQL

**NoSQL**

* Redis
* MongoDB
* CouchDB

# MQ

* RabbitMQ
* SideKiq

# Medya Sunucusu

* Freeswitch

# Sip

* Opensips

# HTTP Server

* Nginx
* Unicorn

Not: lab2023.com firmasında Unicorn yerine PUMA kullanılmaya başlandı. Çok överlerse taşınabiliriz.

# İşletim Sistemi

* Ubuntu

Not: CTO'muz Volkan genellikle Centos tercih etmesine rağmen Bulutfon'un sunucularının büyük kısmı Ubuntu'da çalışıyor diye biliyorum.

# Diğer

* Wireshark
* Monit
* Git
* Xen
* Wordpress - [Bilgi bankası](http://bulutfon.com/cms/) için kullanıldı.
* Discourse - [Geliştirici Topluluğu](devforums.bulutfon.com) için kullanıldı.

İlerleyen dönemlerde yeni araçlar eklendikte bu listeyi güncelleyeceğim. Her türlü sorunuzu yorumlar kısmına sorabilirsiniz.