# Akademi Help Nedir?

[Bulutfon](https://www.bulutfon.com/), [Lab2023](http://lab2023.com/) ve [Netinternet](https://www.netinternet.com.tr/) geliştiricilerinin düzenli paylaşımlarıdır.

# Hizli Baslagic

### Download

* Repo clone code `git clone https://github.com/akademihelp/site.git`
* Development branch `develop`
* Production branch `gh-pages`

### Development

* `bundle install` ile jekyll ve diger gem'leri yukleyin.
* `jekyll serve` ile localhost'da goruntuleme yapabilirsiniz.
* `jekyll build` ile `_site` dizinine jekyll'yi build edebilirsiniz.
* Biz daha hizli ve efektif bir development icin jeklly'yi grunt ile entegre ettik.
* `npm install` ile npm paketlerini yukleyin
* `grunt serve` ile localhost'da goruntuleme yapabilirsiniz

#### Production
* Ornek bir post'a bakip
(ornegin [sunun](https://github.com/akademihelp/site/blob/develop/_posts/2015-12-25-akademide-ilk-gun.md) gibi) post taki baslangic tag larini gorebilirsiniz.
* Gorsel eklemek icin `root/images` dizini kullanilabilir.
Ornek kod `![Gorselin aciklamasi](/images/bulutfon-gelen-fakslarin-goruntulenmesi.png)`
* Code highlight icin `redcarpet` kullanabilirsiniz
