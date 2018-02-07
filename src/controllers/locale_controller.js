import { Controller } from "stimulus"
import { localize, i18n } from '../i18n/config'

export default class extends Controller {
  static targets = [ "changer" ]

  initialize() {
    i18n.on('loaded', (loaded) => {
      let languages = [
        {title: 'English', code: 'en'},
        {title: 'Русский', code: 'ru'}
      ]
      this.element.innerHTML = languages.map((lang) => {
        return `<li data-action="click->locale#changeLang"
        data-target="locale.changer" data-lang="${lang.code}">${lang.title}</li>`
      }).join('')

      this.currentLang = i18n.language
    })
  }

  highlightCurrentLang() {
    this.changerTargets.forEach((el, i) => {
      el.classList.toggle("current", this.currentLang === el.getAttribute("data-lang"))
    })
  }

  changeLang(e) {
    this.currentLang = e.target.getAttribute("data-lang")
  }

  set currentLang(lang) {
    if(i18n.language !== lang) {
      i18n.changeLanguage(lang)
      window.history.pushState(null, null, `?lang=${lang}`)
    }

    if(this.currentLang !== lang) {
      this.data.set("currentLang", lang)
      localize("body");
      this.highlightCurrentLang()
    }
  }

  get currentLang() {
    return this.data.get("currentLang")
  }
}
